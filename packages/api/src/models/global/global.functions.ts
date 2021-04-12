import { GlobalDocument } from "./global.model";

export default {
    setLastUpdated: async function (this: GlobalDocument): Promise<void> {
        const now = new Date();
        if (!this.lastUpdated || this.lastUpdated < now) {
            this.lastUpdated = now;
            await this.save();
        }
    },
    syncModules: async function (
        this: GlobalDocument,
        { modules, descriptions }: { modules: string[]; descriptions: string[] }
    ): Promise<void> {
        const map = new Map<string, string>();
        for (let i = 0; i < modules.length; i++) {
            map.set(modules[i], descriptions[i]);
        }
        this.commandGroups = map;
        await this.setLastUpdated();
    },
};
