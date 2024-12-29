import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { FreightHandlingDto } from './freight-handling.dto';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';

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
}