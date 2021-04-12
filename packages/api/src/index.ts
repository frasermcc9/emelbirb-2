import "reflect-metadata";
import Log from "@frasermcc/log";
import { connect } from "./models/database";
import { buildSchema } from "type-graphql";
import ServerResolver from "./graphql/resolvers/ServerResolver";
import dotenv from "dotenv";
import { printSchema } from "graphql";
import { writeFileSync } from "fs";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import MassResolver from "./graphql/resolvers/MassResolver";
import client, { connectToDiscord } from "./bot";
import DiscordResolver from "./graphql/resolvers/DiscordResolver";
import cors from "cors";
import GlobalResolver from "./graphql/resolvers/GlobalResolver";
dotenv.config();

export const DatabaseConnection = {
    name: process.env.DATABASE_NAME,
    uri: process.env.DATABASE_URI,
};

(async () => {
    const requiredEnvs: (keyof NodeJS.ProcessEnv)[] = [
        "DATABASE_NAME",
        "DATABASE_URI",
        "DISCORD_TOKEN",
    ];

    let terminate = false;
    for (const env of requiredEnvs) {
        if (!process.env[env]) {
            Log.error(
                `Required environment variable ${env} is missing.`,
                "index"
            );
            terminate = true;
        }
    }
    if (terminate) {
        Log.critical(
            "Missing environment variables. Please ensure the .env file has all required envs."
        );
    }

    await connectToDiscord();

    const schema = await buildSchema({
        resolvers: [
            ServerResolver,
            MassResolver,
            DiscordResolver,
            GlobalResolver,
        ],
    });

    const printedSchema = printSchema(schema);
    writeFileSync("./src/graphql/schema.gql", printedSchema);

    connect();

    const app = express();
    app.use(cors());

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    const port = process.env.PORT || 7300;

    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}/graphql`);
    });
})();
