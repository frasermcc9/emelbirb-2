import { model, Model, Document } from "mongoose";
import ServerSettingsSchema from "./global.schema";

export const GlobalCollection = model<GlobalDocument>(
    "globalSettings",
    ServerSettingsSchema
) as GlobalModel;

export interface GlobalProps {
    commandGroups?: Map<string, string>;
    dateOfEntry?: Date;
    lastUpdated?: Date;
}
export interface GlobalDocument extends GlobalProps, Document {
    setLastUpdated: (this: GlobalDocument) => Promise<void>;
    syncModules: (
        this: GlobalDocument,
        { modules, descriptions }: { modules: string[]; descriptions: string[] }
    ) => Promise<void>;
}
export interface GlobalModel extends Model<GlobalDocument> {
    findOneOrCreate(this: GlobalModel): Promise<GlobalDocument>;
}
