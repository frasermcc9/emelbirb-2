import { Schema } from "mongoose";
import methods from "./global.functions";
import statics from "./global.statics";

const ServerSettingsSchema = new Schema({
    commandGroups: { type: Map },

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
