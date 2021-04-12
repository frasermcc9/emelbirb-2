import { model, Model, Document } from "mongoose";
import ServerSettingsSchema from "./server.schema";

export const ServerCollection = model<ServerDocument>(
    "serverSettings",
    ServerSettingsSchema
) as ServerModel;

export interface ServerProps {
    guildId: string;
    memberCounter?: string;
    prefix?: string;
    dateOfEntry?: Date;
    lastUpdated?: Date;
    disabledGroups: string[];
    logs?: [{ [K: string]: any }];
}
export interface ServerDocument extends ServerProps, Document {
    setLastUpdated(this: ServerDocument): Promise<void>;
    setMemberCountChannel(
        this: ServerDocument,
        { channelId }: { channelId: string }
    ): Promise<void>;
    getMemberCountChannel(this: ServerDocument): string | undefined;
    merge(
        this: ServerDocument,
        updates: { [K in keyof ServerDocument]?: ServerDocument[K] }
    ): Promise<void>;
    toggleBlocked(
        this: ServerDocument,
        { blocked }: { blocked: string }
    ): Promise<boolean>;
    addLog: (
        this: ServerDocument,
        logDetails: { [K: string]: any }
    ) => Promise<void>;
    fetchLogs: (
        this: ServerDocument,
        { offset }: { offset?: number }
    ) => Promise<any>;
}
export interface ServerModel extends Model<ServerDocument> {
    findOneOrCreate(
        this: ServerModel,
        { guildId }: { guildId: string }
    ): Promise<ServerDocument>;
    removeGuild(
        this: ServerModel,
        { guildId }: { guildId: string }
    ): Promise<void>;
}
