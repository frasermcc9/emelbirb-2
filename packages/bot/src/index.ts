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
import bot from "./bot";

dotenv.config();

const requiredEnvs: (keyof NodeJS.ProcessEnv)[] = [
  "BOT_NAME",
  "DATABASE_URI",
  "DISCORD_TOKEN",
  "OWNER_ID",
];

let terminate = false;
for (const env of requiredEnvs) {
  if (!process.env[env]) {
    Log.error(`Required environment variable ${env} is missing.`, "index");
    terminate = true;
  }
}
if (terminate) {
  Log.critical(
    "Missing environment variables. Please ensure the .env file has all required envs."
  );
}

export const DatabaseConnection = {
  name: process.env.DATABASE_NAME,
  uri: process.env.DATABASE_URI,
};

process.on("uncaughtException", (error: Error) =>
  handleException(error, "Uncaught Exception")
);
process.on("unhandledRejection", (error: Error) =>
  handleException(error, "Unhandled Promise Rejection")
);

function handleException(
  error: Error,
  type: "Unhandled Promise Rejection" | "Uncaught Exception"
): void {
  Log.error("Base Exception Handler", type + ": " + error.stack);
}

bot.start();
