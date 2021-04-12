import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ServerCollection } from "../../models/server/server.model";
import { SimpleServerType } from "../typings/ServerType";

@Resolver(SimpleServerType)
export default class MassResolver {
    @Query((returns) => [SimpleServerType])
    async getInitialSettings() {
        const guilds = await ServerCollection.find();
        return guilds;
    }
}
