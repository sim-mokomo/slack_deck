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
        return JSON.parse(fs_1.default.readFileSync(this.fileName, 'utf-8'));
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
    constructor(channelId, threadTs) {
        this.channel_id = "";
        this.thread_ts = "";
        this.channel_id = channelId;
        this.thread_ts = threadTs;
    }
    static getEmpty() {
        return new WorkSpaceColumnConfig("", "");
    }
}
exports.WorkSpaceColumnConfig = WorkSpaceColumnConfig;
