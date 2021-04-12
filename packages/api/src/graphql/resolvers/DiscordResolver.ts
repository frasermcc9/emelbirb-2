import { ApolloError } from "apollo-server-express";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import client from "../../bot";
import { ServerCollection } from "../../models/server/server.model";
import { DiscordGuildType } from "../typings/DiscordGuildType";
import { SimpleServerType } from "../typings/ServerType";

@Resolver(SimpleServerType)
export default class MassResolver {
    @Query((returns) => DiscordGuildType)
    async getDiscordGuild(@Arg("id") id: string): Promise<DiscordGuildType> {
        try {
            const guild = await client.guilds.fetch(id);

            const ownerId = guild.ownerID;
            const owner = await guild.members.fetch(ownerId);

            if (guild.owner) {
                return {
                    ...guild,
                    textChannelCount: guild.channels.cache.filter(
                        (c) => c.type === "text"
                    ).size,
                    voiceChannelCount: guild.channels.cache.filter(
                        (c) => c.type === "voice"
                    ).size,
                    roleCount: guild.roles.cache.size,
                    icon: guild.iconURL(),
                    owner: {
                        avatar: owner.user.avatarURL(),
                        bot: owner.user.bot,
                        createdTimestamp: owner.user.createdTimestamp,
                        id: owner.id,
                        username: owner.user.username,
                    },
                    createdTimestamp: guild.createdTimestamp,
                };
            }

            return {
                ...guild,
                textChannelCount: guild.channels.cache.filter(
                    (c) => c.type === "text"
                ).size,
                voiceChannelCount: guild.channels.cache.filter(
                    (c) => c.type === "voice"
                ).size,
                roleCount: guild.roles.cache.size,
                icon: guild.iconURL(),
                owner: null,
                createdTimestamp: guild.createdTimestamp,
            };
        } catch {
            throw new ApolloError("I cannot see a guild with this ID.");
        }
    }
}
