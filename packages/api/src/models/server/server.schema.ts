import { Schema } from "mongoose";
import methods from "./server.functions";
import statics from "./server.statics";

const ServerSettingsSchema = new Schema({
    guildId: { type: String, unique: true },
    memberCounter: { type: String, required: false },
    prefix: { type: String, required: false },
    disabledGroups: { type: [String], required: true },

    dateOfEntry: {
        type: Date,
        default: new Date(),
    },

    lastUpdated: {
        type: Date,
        default: new Date(),
    },
});

ServerSettingsSchema.statics = {
    ...ServerSettingsSchema.statics,
    ...statics,
};

ServerSettingsSchema.methods = {
    ...ServerSettingsSchema.methods,
    ...methods,
};

export default ServerSettingsSchema;
