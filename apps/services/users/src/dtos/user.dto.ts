import { FilterableField, PagingStrategies, QueryOptions } from "@ptc-org/nestjs-query-graphql";
import { Directive, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
@QueryOptions({ pagingStrategy: PagingStrategies.OFFSET })
export class UserDto {
    @FilterableField(() => ID)
    id: string;
    @FilterableField()
    email: string;
    @FilterableField()
    type: 'TRANSPORTER' | 'CLIENT';
    @FilterableField()
    createdAt: Date;
    @FilterableField()
    firstName: string;
    @FilterableField()
    lastName: string;
    @FilterableField()
    phoneNumber: string;
    @FilterableField()
    isActive: boolean;
    @FilterableField()
    companyName: string;
    @FilterableField()
    companyId: string;
    @FilterableField()
    updatedAt: Date;
}
