import { Controller, Get } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionDto } from './dto/auction.dto';
import { FreightHandlingDto } from './dto/freight-handling.dto';
import { Auction } from './entities/auction.entity';
import { GetAuctionsFilter } from './dto/get-auctions-filter.dto';

interface IAuctionsController {
    createAuction(auction: AuctionDto, loadings: FreightHandlingDto[], unloadings: FreightHandlingDto[]): Promise<Auction>;
    getAuctionById(id: string): Promise<Auction>;
    getAuctions(filter?: GetAuctionsFilter): Promise<Auction[]>;
    pickAuctionWinner(auctionId: string, winningBidId: string): Promise<Auction>;
}

@Controller('auctions')
export class AuctionsController implements IAuctionsController {
    constructor(
        private readonly auctionsService: AuctionsService,
    ) {}

    async createAuction(auction: AuctionDto, loadings: FreightHandlingDto[], unloadings: FreightHandlingDto[]): Promise<Auction> {
        throw new Error('Method not implemented.');
    }

    async getAuctionById(id: string): Promise<Auction> {
        throw new Error('Method not implemented.');
    }

    async getAuctions(filter?: GetAuctionsFilter): Promise<Auction[]> {
        throw new Error('Method not implemented.');
    }

    async pickAuctionWinner(auctionId: string, winningBidId: string): Promise<Auction> {
        throw new Error('Method not implemented.');
    }
}
