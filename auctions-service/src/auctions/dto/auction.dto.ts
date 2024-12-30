import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { FreightHandlingDto, FreightHandlingItem } from './freight-handling.dto';
import { FilterableField, FilterableUnPagedRelation, IDField, UnPagedRelation } from '@nestjs-query/query-graphql';
import { BidDto } from './bid.dto';

@InputType('CreateAuctionInput')
export class AuctionDto {
    @Field()
    title: string;
    @Field()
    description: string;
    @Field()
    startDate: Date;
    @Field()
    endDate: Date;
    @Field()
    startingPrice: number;
    @Field(() => [FreightHandlingDto])
    loadings: FreightHandlingDto[];
    @Field(() => [FreightHandlingDto])
    unloadings: FreightHandlingDto[];
    @Field()
    createdBy: string;
}

@UnPagedRelation('bids', () => BidDto, { disableRemove: true })
@FilterableUnPagedRelation('loadings', () => FreightHandlingItem, { disableRemove: true })
@FilterableUnPagedRelation('unloadings', () => FreightHandlingItem, { disableRemove: true })
@ObjectType("AuctionItemDto")
export class AuctionItemDto {
    @IDField(() => ID)
    id!: string;
    @FilterableField()
    title!: string;
    @FilterableField()
    description!: string;
    @FilterableField()
    startDate!: Date;
    @FilterableField()
    endDate!: Date;
    @FilterableField()
    startingPrice!: number;
    @FilterableField()
    createdBy!: string;
    @FilterableField()
    status!: string;
    @FilterableField()
    createdAt!: Date;
    // @Field(() => [BidDto])
    // bids!: BidDto[];
    // @Field(() => [FreightHandlingItem])
    // loadings!: FreightHandlingItem[];
    // @Field(() => [FreightHandlingItem])
    // unloadings!: FreightHandlingItem[];
    // @Field(() => BidDto, { nullable: true })
    // highestBid?: BidDto;
    // @Field(() => BidDto, { nullable: true })
    // winningBid?: BidDto;
}