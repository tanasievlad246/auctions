import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuctionDto } from './dto/auction.dto';
import { Auction } from './entities/auction.entity';

@Resolver(() => AuctionDto)
export class AuctionsResolver extends CRUDResolver(AuctionDto) {
  constructor(
    @InjectQueryService(Auction) readonly service: QueryService<Auction>
  ) {
    super(service);
  }
}