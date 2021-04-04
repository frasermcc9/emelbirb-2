// Copyright 2021 Fraser
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Log from "@frasermcc/log";
import dotenv from "dotenv";
import { Client } from "@frasermcc/overcord";
import GraphClient from "./apollo";
import { QUERY_ALL_PREFIXES } from "./graphql/functions/Mass";
import { GetAllPrefixes } from "./graphql/typings/GetAllPrefixes";

dotenv.config();

class BotImpl extends Client implements Bot {
  constructor() {
    Log.logo(process.env.BOT_NAME);
    Log.trace("Starting up bot", "Bot");

    super({
      defaultCommandPrefix: "^",
      owners: [process.env.OWNER_ID],
      disableMentions: "everyone",
    });
  }

  async start() {
    await Promise.all([
      this.registry.recursivelyRegisterCommands(__dirname + "/commands"),
      this.registry.recursivelyRegisterEvents(__dirname + "/events"),
      this.activatePrefixes(),
    ]);

    return new Promise<void>(async (resolve, reject) => {
      this.once("ready", async () => {
        Log.info(`Bot logged in as ${this.user?.tag}`, "Bot");
        resolve();
      });

      try {
        await this.login(process.env.DISCORD_TOKEN);
      } catch (e) {
        Log.critical("Bot failed to log in.", "Bot", e);
        reject();
      }
    });
  }

  async activatePrefixes() {
    const { data } = await GraphClient.query<GetAllPrefixes>({
      query: QUERY_ALL_PREFIXES,
    });

    for (const { guildId, prefix } of data.getAllPrefixes) {
      this.guildSettingsManager.setPrefixForGuild(
        guildId,
        prefix ?? this.guildSettingsManager.prefix
      );
    }

    return;
  }
}

const bot: Bot = new BotImpl();
export default bot;

export declare interface Bot extends Client {
  start(): Promise<void>;
}
