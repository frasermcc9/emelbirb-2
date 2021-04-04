import {
  Alias,
  Argument,
  Command,
  Permit,
  RoleType,
  TextChannelType,
} from "@frasermcc/overcord";
import { GuildMember, Message, Role, TextChannel } from "discord.js";

@Alias("channel")
export default class ChannelTestCommand extends Command {
  @Argument({ type: new RoleType() })
  private role!: Role;

  async execute(message: Message) {
    message.channel.send(`This roles name is ${this.role.name}`);
  }
}
