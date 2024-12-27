import { Field, InputType } from "@nestjs/graphql";

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