import { Alias, Client, Command } from "@frasermcc/overcord";
import { Message } from "discord.js";
import { writeFileSync } from "fs";

@Alias("jsonserver")
export default class AddServerCommand extends Command {
  async execute(message: Message, client: Client): Promise<any> {
    const data = JSON.stringify(message.guild);
    writeFileSync("./example.json", data);
  }
}
