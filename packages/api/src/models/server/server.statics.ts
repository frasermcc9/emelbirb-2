import { ServerDocument, ServerModel } from "./server.model";

async function findOneOrCreate(
    this: ServerModel,
    { guildId }: { guildId: string }
): Promise<ServerDocument> {
    let record: ServerDocument | null = await this.findOne({ guildId });
    if (record == null) {
        record = await this.create({
            guildId,
            disabledGroups: [],
        });
    } else {
        //await record.syncWithSchema();
    }
    return record;
}

export default { findOneOrCreate };
