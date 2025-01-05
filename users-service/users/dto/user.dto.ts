import { FilterableField } from "@nestjs-query/query-graphql";
import { Directive, ID, ObjectType } from "@nestjs/graphql";
import { createPaginatedType } from "common/offset-page-info";

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@shareable')
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

@ObjectType('PaginatedUsers')
@Directive('@shareable')
export class PaginatedUsersResponse extends createPaginatedType(UserDto) {}
