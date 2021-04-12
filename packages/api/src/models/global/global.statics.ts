import { GlobalDocument, GlobalModel } from "./global.model";

async function findOneOrCreate(this: GlobalModel): Promise<GlobalDocument> {
    let record: GlobalDocument | null = await this.findOne();

    if (!record) {
        record = await this.create({
            commandGroups: new Map<string, string>(),
        });
    } else {
        //await record.syncWithSchema();
    }

    return record;
}

export default { findOneOrCreate };
