import { FilterableField, Relation } from "@nestjs-query/query-graphql";
import { Directive, Field, ID, InputType, ObjectType } from "@nestjs/graphql";

@InputType('CreateBidInput')
export class CreateBidDto {
    @Field()
    bidder: string;

    @Field()
    amount: number;

    @Field()
    startDate: Date;

    @Field()
    endDate: Date;

    @Field()
    auctionId: string;
}

// You may also want a response DTO for bids
@ObjectType('BidDto')
@Directive('@key(fields: "id")')
@Directive('@shareable')
export class BidDto {
    @FilterableField(() => ID)
    id: string;

    @FilterableField()
    bidder: string;

    @FilterableField()
    amount: number;

    @FilterableField()
    startDate: Date;

    @FilterableField()
    endDate: Date;

    @FilterableField()
    createdAt: Date;
}