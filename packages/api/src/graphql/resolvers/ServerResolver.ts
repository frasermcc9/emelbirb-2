import {
    Arg,
    Args,
    ArgsType,
    Field,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import { ServerCollection } from "../../models/server/server.model";
import { ServerType } from "../typings/ServerType";
import fetch from "node-fetch";
import dotenv from "dotenv";
import NullType from "../typings/NullType";
dotenv.config();

@ArgsType()
@ObjectType()
class LogArgs {
    @Field((type) => String, { nullable: true })
    invokingUser?: string;

    @Field((type) => String, { nullable: true })
    reason?: string;

    @Field((type) => String, { nullable: true })
    message?: string;

    @Field((type) => [String], { nullable: true })
    affectedUsers?: string[];

    @Field((type) => Date, { nullable: true })
    time?: Date;

    @Field((type) => String, { nullable: false })
    guild!: string;

    @Field((type) => String, { nullable: true })
    command?: string;

    @Field((type) => Int, { nullable: true })
    importance?: number;
}

@Resolver(ServerType)
export default class ServerResolver {
    @Query((returns) => ServerType)
    async getServer(@Arg("id") id: string) {
        const guild = await ServerCollection.findOneOrCreate({ guildId: id });
        return guild;
    }

    @Mutation((returns) => ServerType)
    async modifyServer(
        @Arg("id", { nullable: false }) id: string,
        @Arg("prefix", { nullable: true }) prefix: string
    ) {
        const guild = await ServerCollection.findOneOrCreate({ guildId: id });
        await guild.merge({ prefix: prefix });
        await alertServer(id);
        return guild;
    }

    @Mutation((returns) => ServerType)
    async toggleBlocked(
        @Arg("id") id: string,
        @Arg("toggleBlocked") toggleBlocked: string
    ) {
        const guild = await ServerCollection.findOneOrCreate({ guildId: id });
        await guild.toggleBlocked({ blocked: toggleBlocked.toLowerCase() });
        await alertServer(id);
        return guild;
    }

    @Mutation((returns) => NullType)
    async log(@Args() args: LogArgs) {
        const guild = await ServerCollection.findOneOrCreate({
            guildId: args.guild,
        });
        await guild.addLog(args);
        return {};
    }

    @Query((returns) => LogArgs, { nullable: true })
    async fetchLogs(
        @Arg("id") id: string,
        @Arg("offset", { nullable: true }) offset: number = 0
    ) {
        const guild = await ServerCollection.findOneOrCreate({ guildId: id });
        const logs = await guild.fetchLogs({ offset });
        return logs;
    }
}

const alertServer = async (toGuild: string) => {
    await fetch("http://" + process.env.BOT_URI + "/" + toGuild, {
        method: "post",
    });
};
