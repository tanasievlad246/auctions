import { Resolver, Args, Mutation, ArgsType, Query } from '@nestjs/graphql';
import { AuctionDto, AuctionItemDto } from './dto/auction.dto';
import { Auction } from './entities/auction.entity';
import { AuctionsService } from './auctions.service';
import { Inject } from '@nestjs/common';
import { ConnectionType, QueryArgsType } from '@nestjs-query/query-graphql';
import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core';

@ArgsType()
export class AuctionItemQuery extends QueryArgsType(AuctionItemDto) {}
export const AuctionItemConnection = AuctionItemQuery.ConnectionType;

@Resolver(() => Auction)
export class AuctionResolver {
  constructor(
    @Inject(AuctionsService) readonly service: AuctionsService,
    @InjectQueryService(Auction) readonly queryService: QueryService<Auction>,
  ) {}

  // @Query(() => AuctionItemConnection, { name: 'auctions' })
  // async getAuctions(
  //   @Args() query: AuctionItemQuery,
  // ): Promise<ConnectionType<AuctionItemDto>> {
  //   const filter: Filter<AuctionItemDto> = {
  //     ...query.filter,
  //   }

  //   return AuctionItemConnection.createFromPromise((q) => this.queryService.query(q), { ...query, ...{ filter } });
  // }

  @Mutation(() => AuctionItemDto)
  async createAuction(
    @Args('input') input: AuctionDto,
  ): Promise<Auction> {
    const { loadings, unloadings } = input;
    return this.service.createAuction(input, loadings, unloadings);
  }
}