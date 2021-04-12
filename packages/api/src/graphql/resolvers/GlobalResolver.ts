import { Args, ArgsType, Field, Mutation, Query, Resolver } from "type-graphql";
import { GlobalCollection } from "../../models/global/global.model";
import { GlobalType } from "../typings/GlobalType";

@ArgsType()
class FetchModulesArgs {
    @Field((type) => [String])
    modules!: string[];

    @Field((type) => [String])
    descriptions!: string[];
}

@Resolver(GlobalType)
export default class GlobalResolver {
    @Mutation((returns) => GlobalType)
    async updateModules(
        @Args() { modules, descriptions }: FetchModulesArgs
    ): Promise<GlobalType> {
        const bot = await GlobalCollection.findOneOrCreate();
        await bot.syncModules({ modules, descriptions });
        return {
            commandDescriptions: [...bot.commandGroups!.values()],
            commandGroups: [...bot.commandGroups!.keys()],
            dateOfEntry: bot.dateOfEntry,
            lastUpdated: bot.lastUpdated,
        };
    }

    @Query((returns) => GlobalType)
    async fetchModules(): Promise<GlobalType> {
        const bot = await GlobalCollection.findOneOrCreate();
        return {
            commandDescriptions: [...bot.commandGroups!.values()],
            commandGroups: [...bot.commandGroups!.keys()],
            dateOfEntry: bot.dateOfEntry,
            lastUpdated: bot.lastUpdated,
        };
    }
}
