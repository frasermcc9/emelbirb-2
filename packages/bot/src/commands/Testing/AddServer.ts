import { gql } from "@apollo/client/core";
import { Alias, Client, Command } from "@frasermcc/overcord";
import { Message } from "discord.js";
import GraphClient from "../../apollo";
import { QUERY_GUILD } from "../../graphql/functions/Server";
import { GetServer, GetServerVariables } from "../../graphql/typings/GetServer";

@Alias("addserver")
export default class AddServerCommand extends Command {
  async execute(message: Message, client: Client): Promise<any> {
    if (!message.guild) {
      return this.error(
        message,
        "You cannot use this command outside of a server."
      );
    }

    const { data } = await GraphClient.query<GetServer, GetServerVariables>({
      query: QUERY_GUILD,
      variables: {
        id: message.guild?.id,
      },
    });

    this.say(`Your guild ID is ${data.getServer.guildId}`);
  }
}
