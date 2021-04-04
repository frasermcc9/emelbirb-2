import Mongoose = require("mongoose");
import { DatabaseConnection } from "../index";
import Log from "@frasermcc/log";

let database: Mongoose.Connection;

export const connect = () => {
  const uri = DatabaseConnection.uri;
  const dbName = DatabaseConnection.name;

  if (database) {
    return;
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: dbName,
  });
  database = Mongoose.connection;

  database.once("open", async () => {
    Log.trace("Database", "Connected to database");
  });

  database.on("error", () => {
    Log.error("Database", "Error with database connected");
  });

  return;
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
  Log.info("Database", "Database connection terminated");
};
