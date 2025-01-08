import { FilterableField } from "@ptc-org/nestjs-query-graphql";
import { Directive, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {
    @FilterableField()
    email: string;
    @FilterableField()
    role: string;
    @FilterableField()
    firstName: string;
    @FilterableField()
    lastName: string;
    @FilterableField()
    phoneNumber: string;
}