import { Guild, User } from "discord.js";
import { Field, ObjectType, ID, Int, Float } from "type-graphql";

@ObjectType({ description: "Discord user parameters" })
export class DiscordUserType {
    @Field((type) => ID)
    id!: string;

    @Field((type) => String)
    username!: string;

    @Field((type) => String, { nullable: true })
    avatar!: string | null;

    @Field((type) => Float)
    createdTimestamp!: number;

    @Field((type) => Boolean)
    bot!: boolean;
}
