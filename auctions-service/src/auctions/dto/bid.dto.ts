import { FilterableField, Relation } from "@nestjs-query/query-graphql";
import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType('BidDto')
// @Relation('auction', () => BidDto, { disableRemove: true })
export class BidDto {
    @FilterableField()
    id: string;
    @FilterableField()
    bidder: string;
    @FilterableField()
    amount: number;
    @FilterableField()
    startDate: Date;
    @FilterableField()
    endDate: Date;
}

@InputType('CreateBidInput')
export class CreateBidDto {
    @Field()
    bidder: string;
    @Field()
    amount: number;
    @Field()
    auctionId: string;
}