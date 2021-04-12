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
import { QUERY_INITIAL_SETTINGS } from "./graphql/functions/Mass";
import { GetInitialSettings } from "./graphql/typings/GetInitialSettings";
import { MUTATE_UPDATE_MODULES } from "./graphql/functions/BotData";
import {
  UpdateModules,
  UpdateModulesVariables,
} from "./graphql/typings/UpdateModules";
import { GetServer, GetServerVariables } from "./graphql/typings/GetServer";
import { QUERY_GUILD } from "./graphql/functions/Server";
import express from "express";
import LoggingMixin from "./util/SiteLogger";

dotenv.config();

class BotImpl extends Client implements Bot {
  constructor() {
    Log.logo(process.env.BOT_NAME);
    Log.trace("Starting up bot", "Bot");

    super({
      defaultCommandPrefix: "^",
      owners: [process.env.OWNER_ID],
      disableMentions: "everyone",
      loggingMixin: new LoggingMixin(),
    });
  }

  async start() {
    await Promise.all([
      this.registry.recursivelyRegisterCommands(__dirname + "/commands"),
      this.registry.recursivelyRegisterEvents(__dirname + "/events"),
      this.activateInitialServerSettings(),
      this.activateWebhookListener(),
    ]);

    const botModules = Array.from(this.registry.commandGroups.keys());
    const moduleDescriptions = Array.from(
      this.registry.commandGroups.values()
    ).map((s) => (!s ? "" : s));
    await GraphClient.mutate<UpdateModules, UpdateModulesVariables>({
      mutation: MUTATE_UPDATE_MODULES,
      variables: {
        modules: botModules,
        descriptions: moduleDescriptions,
      },
    });

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

  async activateInitialServerSettings() {
    const { data } = await GraphClient.query<GetInitialSettings>({
      query: QUERY_INITIAL_SETTINGS,
    });

    for (const { guildId, prefix, disabledGroups } of data.getInitialSettings) {
      this.guildSettingsManager.setPrefixForGuild(
        guildId,
        prefix ?? this.guildSettingsManager.prefix
      );
      for (const group of disabledGroups) {
        this.guildSettingsManager.disableGroupInGuild({
          guild: guildId,
          groupName: group,
          shouldBeDisabled: true,
        });
      }
    }

    return;
  }

  async activateWebhookListener(): Promise<void> {
    const app = express();

    app.post("/:guild", async (req, res) => {
      const guildId = req.params.guild;
      Log.info(
        `Received post request from server. Updating local settings for guild ${guildId}`
      );
      await this.refreshServer(guildId);
      res.sendStatus(200);
    });

    app.listen(process.env.WEBHOOK_PORT);
  }

  async refreshServer(id: string) {
    const {
      data: {
        getServer: { disabledGroups, prefix },
      },
    } = await GraphClient.query<GetServer, GetServerVariables>({
      query: QUERY_GUILD,
      variables: {
        id,
      },
      fetchPolicy: "no-cache",
    });

    for (const group of this.registry.commandGroups.keys()) {
      this.guildSettingsManager.disableGroupInGuild({
        groupName: group,
        guild: id,
        shouldBeDisabled: disabledGroups.includes(group.toLowerCase()),
      });
      if (prefix) {
        this.guildSettingsManager.setPrefixForGuild(id, prefix);
      }
    }
  }
}

const bot: Bot = new BotImpl();
export default bot;

export declare interface Bot extends Client {
  start(): Promise<void>;
}
