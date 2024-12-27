import { Field, InputType } from '@nestjs/graphql';
import { FreightHandlingDto } from './freight-handling.dto';

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