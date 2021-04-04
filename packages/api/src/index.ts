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
dotenv.config();

export const DatabaseConnection = {
    name: process.env.DATABASE_NAME,
    uri: process.env.DATABASE_URI,
};

(async () => {
    const requiredEnvs: (keyof NodeJS.ProcessEnv)[] = [
        "DATABASE_NAME",
        "DATABASE_URI",
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

    const schema = await buildSchema({
        resolvers: [ServerResolver, MassResolver],
    });

    const printedSchema = printSchema(schema);
    writeFileSync("./src/graphql/schema.gql", printedSchema);

    connect();

    const app = express();

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
