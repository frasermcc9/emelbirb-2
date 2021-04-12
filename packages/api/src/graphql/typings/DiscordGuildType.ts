import { Guild, Snowflake } from "discord.js";
import { Field, ObjectType, ID, Int, Float } from "type-graphql";
import { DiscordUserType } from "./DiscordUserType";

@ObjectType({ description: "Discord guild parameters" })
export class DiscordGuildType {
    @Field((type) => ID)
    id!: string;

    @Field((type) => String)
    name!: string;

    @Field((type) => Int)
    memberCount!: number;

    @Field((type) => String, { nullable: true })
    icon!: string | null;

    @Field((type) => Int)
    voiceChannelCount!: number;

    @Field((type) => Int)
    textChannelCount!: number;

    @Field((type) => Float, { nullable: true })
    createdTimestamp!: number;

    @Field((type) => String)
    region!: string;

    @Field((type) => Int, { nullable: true })
    premiumSubscriptionCount!: number | null;

    @Field((type) => Int)
    roleCount!: number;

    @Field((type) => DiscordUserType, { nullable: true })
    owner!: DiscordUserType | null;
}
