import {
  Alias,
  Argument,
  Command,
  FloatType,
  IntegerType,
} from "@frasermcc/overcord";
import { GuildMember, Message } from "discord.js";

@Alias("number")
export default class NumberCommands extends Command {
  @Argument({ type: new FloatType() })
  private num!: number;

  async execute(message: Message) {
    return message.channel.send(this.num);
  }
}
