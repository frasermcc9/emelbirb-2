import {
  Alias,
  Argument,
  Command,
  MemberType,
  Permit,
} from "@frasermcc/overcord";
import { GuildMember, Message } from "discord.js";

@Alias("kick", "boot")
@Permit("KICK_MEMBERS")
export default class KickCommand extends Command {
  @Argument({ type: new MemberType() })
  private member!: GuildMember;

  async execute(message: Message) {
    await this.member.kick();
  }
}
