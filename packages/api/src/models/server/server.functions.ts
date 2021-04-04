import { ServerDocument } from "./server.model";

async function setLastUpdated(this: ServerDocument): Promise<void> {
    const now = new Date();
    if (!this.lastUpdated || this.lastUpdated < now) {
        this.lastUpdated = now;
        await this.save();
    }
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

export default { setLastUpdated, merge };
