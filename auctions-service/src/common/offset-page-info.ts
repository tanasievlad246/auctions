import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType('OffsetPageInfo')
@Directive('@shareable')
export class PageInfo {
    @Field(() => Boolean)
    @Directive('@shareable')
    hasNextPage: boolean;
    @Field(() => Boolean)
    @Directive('@shareable')
    hasPreviousPage: boolean;
}
