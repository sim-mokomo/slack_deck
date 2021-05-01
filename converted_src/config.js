"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkSpaceColumnConfig = exports.WorkSpaceConfig = exports.AppConfig = void 0;
const fs_1 = __importDefault(require("fs"));
class AppConfig {
    constructor() {
        this.workspaces = [];
    }
    static load() {
        if (!fs_1.default.existsSync(this.fileName)) {
            return this.save(this.getEmpty());
        }
        const config = JSON.parse(fs_1.default.readFileSync(this.fileName, 'utf-8'));
        const ret = new AppConfig();
        Object.assign(ret, config);
        return ret;
    }
    static save(config) {
        fs_1.default.writeFileSync(this.fileName, JSON.stringify(config));
        return config;
    }
    static getEmpty() {
        const config = new AppConfig();
        config.workspaces.push(new WorkSpaceConfig());
        return config;
    }
    addWorkSpaceConfig(workspaceConfig) {
        this.workspaces.push(workspaceConfig);
    }
    addWorkSpaceColumnConfig(workspaceId, workspaceColumnConfig) {
        const index = this.workspaces.findIndex(x => x.workspace_id == workspaceId);
        this.workspaces[index].columns.push(workspaceColumnConfig);
    }
    removeWorkSpaceColumnConfig(workspaceId, columnId) {
        const index = this.workspaces.findIndex(x => x.workspace_id == workspaceId);
        const columnIndex = this.workspaces[index].columns.findIndex(x => x.id == columnId);
        this.workspaces[index].columns.splice(columnIndex, 1);
    }
}
exports.AppConfig = AppConfig;
AppConfig.fileName = "appconfig.json";
class WorkSpaceConfig {
    constructor() {
        this.workspace_id = '';
        this.columns = [];
        this.columns.push(WorkSpaceColumnConfig.getEmpty());
    }
}
exports.WorkSpaceConfig = WorkSpaceConfig;
class WorkSpaceColumnConfig {
    constructor(id, channelId, threadTs) {
        this.id = 0;
        this.channel_id = "";
        this.thread_ts = "";
        this.channel_id = channelId;
        this.thread_ts = threadTs;
    }
    static getEmpty() {
        return new WorkSpaceColumnConfig(0, "", "");
    }
}
exports.WorkSpaceColumnConfig = WorkSpaceColumnConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBb0I7QUFFcEIsTUFBYSxTQUFTO0lBQXRCO1FBQ0ksZUFBVSxHQUF1QixFQUFFLENBQUE7SUFzQ3ZDLENBQUM7SUFuQ0csTUFBTSxDQUFDLElBQUk7UUFDUCxJQUFHLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1NBQ3BDO1FBQ0QsTUFBTSxNQUFNLEdBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUUsQ0FBQTtRQUMvRSxNQUFNLEdBQUcsR0FBZSxJQUFJLFNBQVMsRUFBRSxDQUFBO1FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzFCLE9BQU8sR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBa0I7UUFDMUIsWUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUN0RCxPQUFPLE1BQU0sQ0FBQTtJQUNqQixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFBO1FBQzlCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQTtRQUM3QyxPQUFPLE1BQU0sQ0FBQTtJQUNqQixDQUFDO0lBRUQsa0JBQWtCLENBQUMsZUFBZ0M7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUVELHdCQUF3QixDQUFDLFdBQWtCLEVBQUMscUJBQTJDO1FBQ25GLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxXQUFXLENBQUMsQ0FBQTtRQUMzRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBRUQsMkJBQTJCLENBQUMsV0FBa0IsRUFBRSxRQUFlO1FBQzNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxXQUFXLENBQUMsQ0FBQTtRQUMzRSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLFFBQVEsQ0FBQyxDQUFBO1FBQ25GLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDekQsQ0FBQzs7QUF0Q0wsOEJBdUNDO0FBckNtQixrQkFBUSxHQUFHLGdCQUFnQixDQUFBO0FBdUMvQyxNQUFhLGVBQWU7SUFJeEI7UUFIQSxpQkFBWSxHQUFHLEVBQUUsQ0FBQTtRQUNqQixZQUFPLEdBQTZCLEVBQUUsQ0FBQTtRQUdsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZELENBQUM7Q0FDSjtBQVBELDBDQU9DO0FBRUQsTUFBYSxxQkFBcUI7SUFLOUIsWUFBWSxFQUFTLEVBQUUsU0FBaUIsRUFBRSxRQUFlO1FBSnpELE9BQUUsR0FBRyxDQUFDLENBQUE7UUFDTixlQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ2YsY0FBUyxHQUFHLEVBQUUsQ0FBQTtRQUdWLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO0lBQzdCLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUTtRQUNYLE9BQU8sSUFBSSxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQy9DLENBQUM7Q0FDSjtBQWJELHNEQWFDIn0=