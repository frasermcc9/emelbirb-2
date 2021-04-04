import { Alias, Command, Permit } from "@frasermcc/overcord";
import { Message } from "discord.js";

@Alias("test")
@Permit("ADMINISTRATOR")
export default class TestCommand extends Command {
  execute(message: Message) {
    return message.channel.send("Test received!");
  }
}
