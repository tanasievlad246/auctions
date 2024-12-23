import { AuctionsService } from './auctions.service';
import { AuctionDto } from './dto/auction.dto';
import { FreightHandlingDto } from './dto/freight-handling.dto';
import { Auction } from './entities/auction.entity';
import { GetAuctionsFilter } from './dto/get-auctions-filter.dto';
import { Resolver, Query } from '@nestjs/graphql';

interface IAuctionsController {
    createAuction(auction: AuctionDto, loadings: FreightHandlingDto[], unloadings: FreightHandlingDto[]): Promise<Auction>;
    getAuctionById(id: string): Promise<Auction>;
    getAuctions(filter?: GetAuctionsFilter): Promise<Auction[]>;
    pickAuctionWinner(auctionId: string, winningBidId: string): Promise<Auction>;
}

@Resolver('auctions')
export class AuctionsController {
    constructor(
        private readonly auctionsService: AuctionsService,
    ) {}

    @Query(() => [Auction], { name: 'AuctionsListQuery' })
    async getAuctions(filter?: GetAuctionsFilter): Promise<Auction[]> {
        throw new Error('Method not implemented.');
    }
}
