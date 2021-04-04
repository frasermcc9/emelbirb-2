import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ServerCollection } from "../../models/server/server.model";
import { ServerType } from "../typings/ServerType";

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
        return guild;
    }
}
