import { Resolver, Args, Mutation, ArgsType, Query } from '@nestjs/graphql';
import { AuctionDto, AuctionItemDto } from './dto/auction.dto';
import { Auction } from './entities/auction.entity';
import { AuctionsService } from './auctions.service';
import { Inject } from '@nestjs/common';
import { QueryArgsType } from '@ptc-org/nestjs-query-graphql';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { Bid } from './entities/bid.entity';
import { CreateBidDto } from './dto/bid.dto';

@ArgsType()
export class AuctionItemQuery extends QueryArgsType(AuctionItemDto) {}
export const AuctionItemConnection = AuctionItemQuery.ConnectionType;

@Resolver(() => Auction)
export class AuctionsResolver {
  constructor(
    @Inject(AuctionsService) readonly service: AuctionsService,
    @InjectQueryService(Auction) readonly queryService: QueryService<Auction>,
  ) {}

  @Mutation(() => AuctionItemDto)
  async createAuction(
    @Args('input') input: AuctionDto,
  ): Promise<Auction> {
    const { loadings, unloadings } = input;
    return this.service.createAuction(input, loadings, unloadings);
  }

  @Mutation(() => AuctionItemDto)
  async bidOnAuction(
    @Args('input') input: CreateBidDto,
  ): Promise<Bid> {
    return this.service.bidOnAuction(input);
  }
}