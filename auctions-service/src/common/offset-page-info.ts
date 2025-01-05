import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { Type } from '@nestjs/common';

@ObjectType('PageInfo')
@Directive('@shareable')
export class PageInfo {
    @Field(() => Boolean)
    @Directive('@shareable')
    hasNextPage!: boolean;

    @Field(() => Boolean)
    @Directive('@shareable')
    hasPreviousPage!: boolean;
}

@ObjectType('OffsetPaging')
@Directive('@shareable')
export class OffsetPaging {
    @Field(() => Int, { nullable: true })
    @Directive('@shareable')
    limit?: number;

    @Field(() => Int, { nullable: true })
    @Directive('@shareable')
    offset?: number;
}

export function createPaginatedType<T>(ItemType: Type<T>) {
    @ObjectType({ isAbstract: true })
    @Directive('@shareable')
    abstract class PaginatedResponse {
        @Field(() => [ItemType])
        @Directive('@shareable')
        nodes!: T[];

        @Field(() => PageInfo)
        @Directive('@shareable')
        pageInfo!: PageInfo;

        @Field(() => Int)
        @Directive('@shareable')
        totalCount!: number;
    }
    return PaginatedResponse;
}
