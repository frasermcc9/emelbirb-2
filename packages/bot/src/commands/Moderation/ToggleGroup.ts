import {
  Alias,
  Argument,
  Client,
  Command,
  Permit,
  StringType,
} from "@frasermcc/overcord";
import { Message } from "discord.js";
import GraphClient from "../../apollo";
import { TOGGLE_BLOCKED } from "../../graphql/functions/Server";
import {
  ToggleBlocked,
  ToggleBlockedVariables,
} from "../../graphql/typings/ToggleBlocked";

@Alias("togglegroup")
@Permit("ADMINISTRATOR")
export default class ToggleGroupCommand extends Command {
  @Argument({
    type: new StringType(),
    description: "The name of the group to toggle",
  })
  groupToToggle!: string;

  async execute(message: Message, client: Client): Promise<any> {
    if (!message.guild) {
      return this.error(message, "This command is guild only.");
    }

    const result = client.guildSettingsManager.toggleCommandGroupStatus(
      message.guild.id,
      this.groupToToggle
    );

    await GraphClient.mutate<ToggleBlocked, ToggleBlockedVariables>({
      mutation: TOGGLE_BLOCKED,
      variables: {
        id: message.guild.id,
        toggleBlocked: this.groupToToggle.toLowerCase(),
      },
    });

    if (result) {
      return this.say(
        `Group **${this.groupToToggle}** is now enabled in this server!`
      );
    }
    return this.say(
      `Group **${this.groupToToggle}** is now disabled in this server!`
    );
  }
}
