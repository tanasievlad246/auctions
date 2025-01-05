import { FilterableField } from "@nestjs-query/query-graphql";
import { Directive, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class UserDto {
    @FilterableField(() => ID)
    id: string;
    @FilterableField()
    email: string;
    @FilterableField()
    role: string;
    @FilterableField()
    createdAt: Date;
    @FilterableField()
    updatedAt: Date;
    @FilterableField()
    firstName: string;
    @FilterableField()
    lastName: string;
    @FilterableField()
    phoneNumber: string;
}