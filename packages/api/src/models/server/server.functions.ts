import { ServerDocument } from "./server.model";

async function setLastUpdated(this: ServerDocument): Promise<void> {
    const now = new Date();
    if (!this.lastUpdated || this.lastUpdated < now) {
        this.lastUpdated = now;
        await this.save();
    }
}

async function toggleBlocked(
    this: ServerDocument,
    { blocked }: { blocked: string }
): Promise<boolean> {
    const index = this.disabledGroups.indexOf(blocked);
    let wasAdded;
    if (index > -1) {
        this.disabledGroups.splice(index, 1);
        wasAdded = false;
    } else {
        this.disabledGroups.push(blocked);
        wasAdded = true;
    }

    await this.setLastUpdated();
    return wasAdded;
}

async function merge(
    this: ServerDocument,
    updates: { [K in keyof ServerDocument]?: ServerDocument[K] }
): Promise<void> {
    Object.entries(updates).forEach(
        //@ts-ignore
        ([key, value]) => (this[key] = value)
    );
    await this.setLastUpdated();
}

export default {
    setLastUpdated,
    merge,
    toggleBlocked,
    addLog: async function (
        this: ServerDocument,
        logDetails: { [K: string]: any }
    ): Promise<void> {
        this.logs?.push(logDetails);
        await this.setLastUpdated();
    },
    fetchLogs: async function (
        this: ServerDocument,
        { offset = 0 }: { offset?: number }
    ): Promise<any> {
        this.logs?.slice(offset, -10);
    },
};
