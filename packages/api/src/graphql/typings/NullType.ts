import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class NullType {
    @Field((type) => Boolean, { nullable: true })
    never?: boolean[];
}
