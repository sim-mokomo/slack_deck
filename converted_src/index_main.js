"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSlackColumnResponse = exports.IndexMainProcess = void 0;
const electron_1 = require("electron");
const config_1 = require("./config");
const slack_service_1 = require("./slack-service");
class IndexMainProcess {
    init() {
        electron_1.ipcMain.on("init-index", (event, ...args) => {
            const appConfig = config_1.AppConfig.load();
            const workspaceConfig = appConfig.workspaces[0];
            if (workspaceConfig.workspace_id.length <= 0) {
                return;
            }
            const requests = workspaceConfig.columns.map((x, index) => new AddSlackColumnResponse(slack_service_1.SlackService.getWebViewURL(workspaceConfig.workspace_id, x.channel_id, x.thread_ts), index));
            this.addSlackColumnResponse(event, requests);
        });
        electron_1.ipcMain.on('add-column-main-request', (event, arg) => {
            const url = arg;
            const [channelId, threadTs] = slack_service_1.SlackService.parseUrl(url);
            const appConfig = config_1.AppConfig.load();
            const workSpaceConfig = appConfig.workspaces[0];
            const newColumn = new config_1.WorkSpaceColumnConfig(workSpaceConfig.columns.length, channelId, threadTs);
            appConfig.addWorkSpaceColumnConfig(workSpaceConfig.workspace_id, newColumn);
            config_1.AppConfig.save(appConfig);
            const request = {
                url: slack_service_1.SlackService.getWebViewURL(workSpaceConfig.workspace_id, channelId, threadTs),
                id: workSpaceConfig.columns.length
            };
            this.addSlackColumnResponse(event, [request]);
        });
        electron_1.ipcMain.on("remove-slack-column", (event, arg) => {
            const id = arg;
            const appConfig = config_1.AppConfig.load();
            const workspaceConfig = appConfig.workspaces[0];
            appConfig.removeWorkSpaceColumnConfig(workspaceConfig.workspace_id, id);
            config_1.AppConfig.save(appConfig);
        });
    }
    addSlackColumnResponse(event, requests) {
        event.sender.send('add-slack-column-reply', JSON.stringify(requests));
    }
}
exports.IndexMainProcess = IndexMainProcess;
class AddSlackColumnResponse {
    constructor(url, id) {
        this.url = url;
        this.id = id;
    }
}
exports.AddSlackColumnResponse = AddSlackColumnResponse;
//# sourceMappingURL=index_main.js.map