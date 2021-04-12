import { Field, ID, ObjectType } from "type-graphql";
import { ServerProps } from "../../models/server/server.model";

@ObjectType({ description: "Provides settings for each server" })
export class ServerType implements ServerProps {
    @Field((type) => String)
    guildId!: string;

    @Field((type) => String, { nullable: true })
    memberCounter!: string | undefined;

    @Field((type) => String, { nullable: true })
    prefix?: string | undefined;

    @Field((type) => Date, { nullable: true })
    dateOfEntry?: Date;

    @Field((type) => Date, { nullable: true })
    lastUpdated?: Date;

    @Field((typed) => [String])
    disabledGroups!: string[];
}

@ObjectType({ description: "Provides startup settings of a guild" })
export class SimpleServerType {
    @Field((type) => String)
    guildId!: string;

    @Field((type) => String, { nullable: true })
    prefix?: string | undefined;

    @Field((type) => [String], { nullable: false })
    disabledGroups!: string[];
}
