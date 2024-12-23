import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, MoreThan, Repository} from 'typeorm';
import {FreightHandling} from './entities/freight-handling.entity';
import {Auction} from './entities/auction.entity';
import {Bid} from './entities/bid.entity';
import {AuctionDto} from './dto/auction.dto';
import {FreightHandlingDto} from './dto/freight-handling.dto';
import {BidDto} from './dto/bid.dto';
import {InjectQueue} from '@nestjs/bullmq';
import {Queue} from 'bullmq';
import {MessageType} from 'src/common/enums/message-type.enum';
import {AuctionStatus} from 'src/common/enums/auction-status.enum';
import {GetAuctionsFilter} from './dto/get-auctions-filter.dto';


@Injectable()
export class AuctionsService {
    constructor(
        @InjectRepository(Auction) private auctionRepository: Repository<Auction>,
        @InjectRepository(Bid) private bidRepository: Repository<Bid>,
        private readonly dataSource: DataSource,
        @InjectQueue('auctions') private readonly auctionsQueue: Queue,
    ) {}

    public async getAuctions(filter?: GetAuctionsFilter): Promise<Auction[]> {
        const hasFilters = Object.keys(filter).length > 0;

        if (!hasFilters) {
            return this.auctionRepository.find({
                relations: ['bids', 'freightHandling'],
            });
        }

        return this.auctionRepository.find({
            relations: ['bids', 'freightHandling'],
            where: {
                startDate: filter?.startDate,
                endDate: filter?.endDate,
                loadings: {
                    city: filter?.fromCity,
                    country: filter?.fromCountry,
                },
                unloadings: {
                    city: filter?.toCity,
                    country: filter?.toCountry,
                }
            }
        });
    }

    public async getAuctionById(id: string): Promise<Auction> {
        const auction= await this.auctionRepository.findOneBy({ id });

        // filter bids that were submitted after auction ended
        if (auction.status === AuctionStatus.CLOSED) {
            auction.bids = auction.bids.filter(bid => bid.createdAt > auction.endDate );
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
            const createdAuction = await manager.save(Auction, auction);

            const startingTransportDate = new Date(Math.min(
                ...loadings.map(loading => new Date(loading.startDate).getTime())
            ));
            const endingTransportDate = new Date(Math.max(
                ...unloadings.map(unloading => new Date(unloading.endDate).getTime())
            ));

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

            const newAuction: Auction = await manager.findOneBy<Auction>(Auction, { id: createdAuction.id });

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

    public async bidOnAuction(auctionId: string, bidDto: BidDto): Promise<Bid> {
        return await this.dataSource.transaction(async (manager) => {
            const auction = await manager.findOneBy<Auction>(Auction, { id: auctionId });

            if (auction.status !== AuctionStatus.OPEN) {
                throw new Error('Auction is not open');
            };

            const bid = new Bid(bidDto);
            bid.auction = auction;
            const createdBid = await manager.save(Bid, bid);
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
            const bid = await manager.findOneBy<Bid>(Bid, { id: bidId });
            auction.status = AuctionStatus.CLOSED;
            auction.winningBid = bid;
            return await manager.save(Auction, auction);
        });
    }

    public async closeAuction(auctionId: string): Promise<Auction> {
        return await this.dataSource.transaction(async (manager) => {
            const auction = await manager.findOneBy<Auction>(Auction, { id: auctionId });
            auction.status = AuctionStatus.CLOSED;
            return await manager.save(Auction, auction);
        });
    }

    public async startAuction(auctionId: string): Promise<Auction> {
        return await this.dataSource.transaction(async (manager) => {
            const auction = await manager.findOneBy<Auction>(Auction, { id: auctionId });
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
