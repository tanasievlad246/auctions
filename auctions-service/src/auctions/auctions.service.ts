import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FreightHandling } from './entities/freight-handling.entity';
import { Auction } from './entities/auction.entity';
import { Bid } from './entities/bid.entity';
import { AuctionDto } from './dto/auction.dto';
import { FreightHandlingDto } from './dto/freight-handling.dto';
import { BidDto } from './dto/bid.dto';

@Injectable()
export class AuctionsService {
    constructor(
        @InjectRepository(Auction) private auctionRepository: Repository<Auction>,
        @InjectRepository(Bid) private bidRepository: Repository<Bid>,
        @InjectRepository(FreightHandling) private freightHandlingRepository: Repository<FreightHandling>,
        private readonly dataSource: DataSource
    ) {}

    public async getAuctions(): Promise<Auction[]> {
        return this.auctionRepository.find({
            relations: ['bids', 'freightHandling'],
        });
    }

    public async getAuctionById(id: string): Promise<Auction> {
        return this.auctionRepository.findOneBy({ id });
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

            const newAuction = await manager.findOneBy(Auction, { id: createdAuction.id });
            return newAuction;
        });
    }

    public async bidOnAuction(auctionId: string, bidDto: BidDto): Promise<Bid> {
        return await this.dataSource.transaction(async (manager) => {
            const auction = await manager.findOneBy(Auction, { id: auctionId });
            const bid = new Bid(bidDto);
            bid.auction = auction;
            const createdBid = await manager.save(Bid, bid);
            auction.bids.push(createdBid);
            await manager.save(auction);
            return createdBid;
        });
    }

    public async getBidsForAuction(auctionId: string): Promise<Bid[]> {
        return this.bidRepository.findBy({
            auction: {
                id: auctionId,
            },
        });
    }
}
