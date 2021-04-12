import { Alias, Client, Command } from "@frasermcc/overcord";
import { Message } from "discord.js";

@Alias("groups", "commandgroups")
export default class GroupsCommand extends Command {
  async execute(message: Message, client: Client): Promise<any> {
    const cmdMap = client.registry.commandMap;
    const groups = new Set<string>();

    [...cmdMap.values()].forEach((v) => groups.add(v.group));

    const enabledGroups = Array.from(groups).map((group) => {
      let symbol;
      if (
        !message.guild ||
        client.guildSettingsManager.groupIsEnabled(message.guild.id, group)
      ) {
        symbol = "✅";
      } else {
        symbol = "❌";
      }
      return `${symbol} - ${group}`;
    });

    return this.printArrayChunks(enabledGroups);
  }
}
