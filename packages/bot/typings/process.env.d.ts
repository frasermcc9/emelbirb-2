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

declare namespace NodeJS {
  export interface ProcessEnv {
    BOT_NAME: string;
    DISCORD_TOKEN: string;
    DATABASE_NAME: string;
    DATABASE_URI: string;
    OWNER_ID: string;
    WEBHOOK_PORT: string;
  }
}
