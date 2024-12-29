import { FilterableField } from "@nestjs-query/query-graphql";
import { ObjectType } from "@nestjs/graphql";

@ObjectType('BidDto')
export class BidDto {
    @FilterableField()
    bidder: string;
    @FilterableField()
    amount: number;
    @FilterableField()
    startDate: Date;
    @FilterableField()
    endDate: Date;
}