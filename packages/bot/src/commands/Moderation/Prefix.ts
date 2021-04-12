import {
  Alias,
  Argument,
  Client,
  Command,
  StringType,
} from "@frasermcc/overcord";
import { Message } from "discord.js";
import GraphClient from "../../apollo";
import { MUTATE_GUILD, QUERY_GUILD } from "../../graphql/functions/Server";
import {
  ModifyServer,
  ModifyServerVariables,
} from "../../graphql/typings/ModifyServer";

@Alias("prefix")
export default class PrefixCommand extends Command {
  @Argument({
    type: new StringType(),
    optional: true,
    description: "The new prefix to set, if desired.",
    validate: (s) => s.length > 0 && s.length < 3,
  })
  prefix?: string;

  async execute(message: Message, client: Client): Promise<any> {
    if (!message.guild) {
      return this.error(
        message,
        "Cannot use this command outside of a server."
      );
    }

    if (this.prefix) {
      if (!message.member?.hasPermission("MANAGE_GUILD")) {
        return this.error(
          message,
          "You need the permission to be able to manage the guild to modify the prefix."
        );
      }
      const newPrefix = await this.modifyPrefixOnDb(
        message.guild.id,
        this.prefix
      );
      if (newPrefix) {
        client.guildSettingsManager.setPrefixForGuild(
          message.guild.id,
          newPrefix
        );
        return this.say(`The guild prefix has been updated to ${newPrefix}!`);
      }
      return this.error(
        message,
        "Something went wrong when trying to update the prefix."
      );
    }

    const prefix = client.guildSettingsManager.getPrefixForGuild(
      message.guild.id
    );
    if (!prefix)
      return this.say(
        `This guilds prefix is ${client.guildSettingsManager.prefix}`
      );
    return this.say(`This guilds prefix is ${prefix}`);
  }

  async modifyPrefixOnDb(id: string, prefix: string) {
    const { data } = await GraphClient.mutate<
      ModifyServer,
      ModifyServerVariables
    >({
      mutation: MUTATE_GUILD,
      variables: {
        id,
        prefix,
      },
      refetchQueries: [{ query: QUERY_GUILD, variables: { id } }],
    });

    return data?.modifyServer.prefix;
  }
}
