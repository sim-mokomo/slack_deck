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
//# sourceMappingURL=config.js.map