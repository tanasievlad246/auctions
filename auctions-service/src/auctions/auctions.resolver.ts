import { AuctionsService } from './auctions.service';
import { AuctionDto } from './dto/auction.dto';
import { FreightHandlingDto } from './dto/freight-handling.dto';
import { Auction } from './entities/auction.entity';
import { GetAuctionsFilter } from './dto/get-auctions-filter.dto';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

interface IAuctionsResolver {
    createAuction(auction: AuctionDto, loadings: FreightHandlingDto[], unloadings: FreightHandlingDto[]): Promise<Auction>;
    getAuctionById(id: string): Promise<Auction>;
    getAuctions(filter?: GetAuctionsFilter): Promise<Auction[]>;
    pickAuctionWinner(auctionId: string, winningBidId: string): Promise<Auction>;
}

@Resolver('auctions')
export class AuctionsResolver implements IAuctionsResolver {
    constructor(
        private readonly auctionsService: AuctionsService,
    ) {}

    @Mutation(() => Auction, { name: 'createAuction' })
    async createAuction(
        @Args('input') _createAuctionInput: AuctionDto
    ): Promise<Auction> {
        const { loadings, unloadings } = _createAuctionInput;
        return await this.auctionsService.createAuction(_createAuctionInput, loadings, unloadings);
    }

    @Query(() => Auction, { name: 'auctionById' })
    async getAuctionById(id: string): Promise<Auction> {
        return await this.auctionsService.getAuctionById(id);
    }

    @Mutation(() => Auction, { name: 'pickAuctionWinner' })
    async pickAuctionWinner(auctionId: string, winningBidId: string): Promise<Auction> {
        return await this.auctionsService.setWinnigBidAndCloseAuction(auctionId, winningBidId);
    }

    @Query(() => [Auction], { name: 'auctionsList' })
    async getAuctions(): Promise<Auction[]> {
        return await this.auctionsService.getAuctions();
    }
}
