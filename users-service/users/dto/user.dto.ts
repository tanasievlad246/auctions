import { FilterableField, PagingStrategies, QueryOptions } from "@ptc-org/nestjs-query-graphql";
import { Directive, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
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
