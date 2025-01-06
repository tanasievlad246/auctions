import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType('OffsetPageInfo')
@Directive('@external')
export class PageInfo {
    @Field(() => Boolean)
    @Directive('@extendable')
    hasNextPage: boolean;
    @Field(() => Boolean)
    @Directive('@extendable')
    hasPreviousPage: boolean;
}
