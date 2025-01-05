import { Directive, Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Auction } from "../entities/auction.entity";
import { FilterableField, Relation } from "@nestjs-query/query-graphql";

@InputType('FreightHandlingInput')
export class FreightHandlingDto {
    @Field()
    startDate: Date;
    @Field()
    endDate: Date;
    @Field()
    country: string;
    @Field()
    city: string;
    @Field()
    zipCode: string;
    @Field()
    address: string;
    @Field()
    contactPerson: string;
    @Field()
    contactPhone: string;
    @Field()
    contactEmail: string;
}

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@shareable')
export class FreightHandlingItem {
    @FilterableField(type => ID)
    id: string;
    @FilterableField()
    startDate: Date;
    @FilterableField()
    endDate: Date;
    @FilterableField()
    country: string;
    @FilterableField()
    city: string;
    @FilterableField()
    zipCode: string;
    @FilterableField()
    address: string;
    @FilterableField()
    contactPerson: string;
    @FilterableField()
    contactPhone: string;
    @FilterableField()
    contactEmail: string;
    @FilterableField()
    createdAt: Date;
}