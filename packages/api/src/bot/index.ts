import Log from "@frasermcc/log";
import { Client } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

let connected = false;

export const connectToDiscord = async () => {
    if (connected) return;
    return new Promise<void>(async (resolve, reject) => {
        client.once("ready", async () => {
            Log.info(`Bot logged in as ${client.user?.tag}`, "Bot");
            connected = true;
            resolve();
        });

        try {
            await client.login(process.env.DISCORD_TOKEN);
        } catch (e) {
            Log.critical("Bot failed to log in.", "Bot", e);
            reject();
        }
    });
};

const client = new Client();

export default client;
