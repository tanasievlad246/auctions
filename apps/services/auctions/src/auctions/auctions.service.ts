import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { FreightHandling } from './entities/freight-handling.entity';
import { Auction } from './entities/auction.entity';
import { Bid } from './entities/bid.entity';
import { AuctionDto } from './dto/auction.dto';
import { FreightHandlingDto } from './dto/freight-handling.dto';
import { AuctionStatus } from 'src/common/enums/auction-status.enum';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { QueryService } from '@ptc-org/nestjs-query-core';
import { CreateBidDto } from './dto/bid.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { MessageType } from 'src/common/enums/message-type.enum';

@Injectable()
@QueryService(Auction)
export class AuctionsService extends TypeOrmQueryService<Auction> {
    constructor(
        @InjectRepository(Auction) private auctionRepository: Repository<Auction>,
        @InjectRepository(Bid) private bidRepository: Repository<Bid>,
        private readonly dataSource: DataSource,
        @InjectQueue('auctions') private readonly auctionsQueue: Queue,
    ) {
        super(auctionRepository);
    }

    public async getAuctions(): Promise<Auction[]> {
        return this.auctionRepository.find({
            relations: ['bids', 'loadings', 'unloadings'],
        });
    }

    public async getAuctionById(id: string): Promise<Auction> {
        const auction = await this.auctionRepository.findOneBy({ id });

        if (!auction) {
            throw new HttpException('Auction not found', 404);
        }

        // filter bids that were submitted after auction ended
        if (auction.status === AuctionStatus.CLOSED) {
            auction.bids = auction.bids.filter(bid => bid.createdAt > auction.endDate);
        }

        return auction;
    }

    public async getAuctionsThatNeedToStart(): Promise<Auction[]> {
        return this.auctionRepository.find({
            where: {
                status: AuctionStatus.CLOSED,
                startDate: MoreThan(new Date())
            },
            order: {
                startDate: "ASC"
            }
        })
    }

    public async getAuctionsThatNeedToEnd(): Promise<Auction[]> {
        return await this.auctionRepository.find({
            where: {
                status: AuctionStatus.OPEN
            },
            order: {
                endDate: "DESC"
            }
        });
    }

    public async createAuction(auction: AuctionDto, loadings: FreightHandlingDto[], unloadings: FreightHandlingDto[]): Promise<Auction> {
        return await this.dataSource.transaction(async (manager) => {
            const createdAuction = new Auction();

            createdAuction.title = auction.title;
            createdAuction.description = auction.description;
            createdAuction.startDate = auction.startDate;
            createdAuction.endDate = auction.endDate;
            createdAuction.startingPrice = auction.startingPrice;
            createdAuction.createdBy = auction.createdBy;
            createdAuction.status = AuctionStatus.CLOSED;

            // Get all valid loading start dates
            const loadingDates = loadings
                .map(loading => loading.startDate)
                .filter(date => date !== null && date !== undefined)
                .map(date => typeof date === 'string' ? new Date(date) : date);

            // Get all valid unloading end dates
            const unloadingDates = unloadings
                .map(unloading => unloading.endDate)
                .filter(date => date !== null && date !== undefined)
                .map(date => typeof date === 'string' ? new Date(date) : date);

            // Find the earliest loading date and latest unloading date
            const startingTransportDate = new Date(Math.min(...loadingDates.map(date => date.getTime())));
            const endingTransportDate = new Date(Math.max(...unloadingDates.map(date => date.getTime())));

            createdAuction.startingTransportDate = startingTransportDate;
            createdAuction.endingTransportDate = endingTransportDate;

            const createdLoadings = await Promise.all(loadings.map(async (loading) => {
                return await manager.save(FreightHandling, loading);
            }));
            const createdUnloadings = await Promise.all(unloadings.map(async (unloading) => {
                return await manager.save(FreightHandling, unloading);
            }));

            createdAuction.loadings = createdLoadings;
            createdAuction.unloadings = createdUnloadings;

            const newAuction = await manager.save(Auction, createdAuction);

            /**
             * If the new auction created has no startDate, then it is not a timed auction
             * and MessageType.CloseAuction should be sent to the queue with delay of time between now and
             * auctin's endDate
             *
             * If the new auction created has a startDate, then it is a timed auction
             * and MessageType.StartAuction should be sent to the queue with delay of time between now and
             * auction's startDate and also the MessageType.CloseAuction should be sent to the queue with
             * delay of time between now and auction's endDate
             */
            if (newAuction.startDate) {
                await this.auctionsQueue.add(MessageType.StartAuction, { auctionId: newAuction.id }, {
                    delay: new Date(newAuction.startDate).getTime() - new Date().getTime(),
                });
            }

            await this.auctionsQueue.add(MessageType.CloseAuction, { auctionId: newAuction.id }, {
                delay: new Date(newAuction.endDate).getTime() - new Date().getTime(),
            });

            return newAuction;
        });
    }

    public async bidOnAuction(bidDto: CreateBidDto): Promise<Bid> {
        return await this.dataSource.transaction(async (manager) => {
            const auction = await manager.findOne(Auction, {
                relations: ['bids'],
                where: {
                    id: bidDto.auctionId,
                }
            })

            if (!auction) {
                throw new HttpException('Auction not found', 404);
            }

            if (auction.status !== AuctionStatus.OPEN) {
                throw new Error('Auction is not open');
            };

            const bid = new Bid(bidDto);
            bid.auction = auction;
            const createdBid = await manager.save(Bid, bid);
            console.log('AUCTION', auction);
            auction.bids.push(createdBid);
            await manager.save(auction);
            return createdBid;
        });
    }

    public async getBidsForAuction(auctionId: string): Promise<Bid[]> {
        return this.bidRepository.find({
            where: {
                auction: {
                    id: auctionId,
                }
            },
            order: {
                createdAt: 'DESC',
            },
            relations: ['auction'],
        });
    }

    public setWinnigBidAndCloseAuction(auctionId: string, bidId: string): Promise<Auction> {
        return this.dataSource.transaction(async (manager) => {
            const auction = await manager.findOneBy<Auction>(Auction, { id: auctionId });

            if (!auction) {
                throw new HttpException('Auction not found', 404);
            }

            const bid = await manager.findOneBy<Bid>(Bid, { id: bidId });

            if (!bid) {
                throw new HttpException('Bid not found', 404);
            }

            auction.status = AuctionStatus.CLOSED;
            auction.winningBid = bid;
            return await manager.save(Auction, auction);
        });
    }

    public async closeAuction(auctionId: string): Promise<Auction> {
        return await this.dataSource.transaction(async (manager) => {
            const auction = await manager.findOneBy<Auction>(Auction, { id: auctionId });

            if (!auction) {
                throw new HttpException('Auction not found', 404);
            }

            auction.status = AuctionStatus.CLOSED;
            return await manager.save(Auction, auction);
        });
    }

    public async startAuction(auctionId: string): Promise<Auction> {
        return await this.dataSource.transaction(async (manager) => {
            const auction = await manager.findOneBy<Auction>(Auction, { id: auctionId });

            if (!auction) {
                throw new HttpException('Auction not found', 404);
            }

            auction.status = AuctionStatus.OPEN;
            return await manager.save(Auction, auction);
        });
    }

    public async getUserAuctions(userId: string): Promise<Auction[]> {
        return this.auctionRepository.find({
            where: {
                createdBy: userId,
            },
            relations: ['bids', 'loadings', 'unloadings'],
        });
    }
}
