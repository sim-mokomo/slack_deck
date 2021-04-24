"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexMainProcess = void 0;
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
            const launcherUrls = [];
            for (const columnConfig of workspaceConfig.columns) {
                const url = columnConfig.thread_ts.length > 0 ?
                    slack_service_1.SlackService.getThreadUrl(workspaceConfig.workspace_id, columnConfig.channel_id, columnConfig.thread_ts)
                    :
                        slack_service_1.SlackService.getChannelUrl(workspaceConfig.workspace_id, columnConfig.channel_id);
                launcherUrls.push(url);
                console.log(url);
            }
            event.sender.send('add-slack-column-reply', launcherUrls);
        });
        electron_1.ipcMain.on('add-column-main-request', (event, arg) => {
            const url = arg;
            const splitArray = url.split('/');
            const channelId = splitArray[4];
            let threadTs = "";
            const lastParameter = splitArray[splitArray.length - 1];
            if (lastParameter.length > 0) {
                const parameters = lastParameter.split("?")[1];
                const parameterList = parameters.split("&");
                if (parameterList.length == 2) {
                    threadTs = parameterList[0].split("=")[1];
                }
            }
            const newColumn = new config_1.WorkSpaceColumnConfig(channelId, threadTs);
            const appConfig = config_1.AppConfig.load();
            const workSpaceConfig = appConfig.workspaces[0];
            appConfig.addWorkSpaceColumnConfig(workSpaceConfig.workspace_id, newColumn);
            config_1.AppConfig.save(appConfig);
            const columnUrl = slack_service_1.SlackService.getWebViewURL(workSpaceConfig.workspace_id, channelId, threadTs);
            event.sender.send('add-slack-column-reply', [columnUrl]);
        });
    }
}
exports.IndexMainProcess = IndexMainProcess;
