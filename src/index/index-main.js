"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexMainProcess = void 0;
const electron_1 = require("electron");
const app_config_1 = require("../app-config/app-config");
const slack_service_1 = require("../slack/slack-service");
const add_slack_column_request_1 = require("../add-slack-column-request");
const app_config_repository_1 = require("../app-config/app-config-repository");
const slack_workspace_model_1 = require("../slack/workspace/slack-workspace-model");
const slack_column_model_1 = require("../slack/column/slack-column-model");
const slack_column_view_1 = require("../slack/column/slack-column-view");
const slack_column_view_info_1 = require("../slack/column/slack-column-view-info");
const add_workspace_icon_request_1 = require("../add-workspace-icon-request");
const AppConfigFileName = "appconfig.json";
class IndexMainProcess {
    constructor(rootWindow) {
        this.slackColumnViewList = [];
        this.currentWorkspaceId = "";
        const [appConfig, success] = new app_config_repository_1.AppConfigRepository().load(AppConfigFileName);
        if (!success) {
            new app_config_repository_1.AppConfigRepository().save(AppConfigFileName, app_config_1.AppConfig.default);
        }
        else {
            this.currentWorkspaceId = appConfig.current_workspace_id;
        }
        this.rootWindow = rootWindow;
        // todo: ワークスペースを対象にしたカラムのリロードを行えるように
        this.rootWindow.on("resized", () => {
            this.onChangedWindow();
        });
        this.rootWindow.on("maximize", () => {
            this.onChangedWindow();
        });
        this.workspaceModel = new slack_workspace_model_1.SlackWorkspaceModel();
        this.workspaceModel.onDelete = (columnId) => {
            const slackColumnView = this.slackColumnViewList.find(x => x.viewInfo.id == columnId);
            slackColumnView === null || slackColumnView === void 0 ? void 0 : slackColumnView.delete();
            this.slackColumnViewList = this.slackColumnViewList.filter(x => x.viewInfo.id != columnId);
        };
    }
    init() {
        electron_1.ipcMain.on("init-index", (event) => {
            {
                // ワークスペースアイコン追加
                const [appConfig,] = new app_config_repository_1.AppConfigRepository().load(AppConfigFileName);
                const requests = appConfig.getWorkspaceConfigs().map(x => {
                    return new add_workspace_icon_request_1.AddWorkspaceIconRequest(x.workspace_id);
                });
                this.addWorkspaceIconsReply(event, requests);
            }
            {
                // カラム表示
                const workspaceConfig = this.getCurrentWorkspaceConfig();
                if (workspaceConfig == null) {
                    return;
                }
                const requests = workspaceConfig.columns.map(x => new add_slack_column_request_1.AddSlackColumnRequest(slack_service_1.SlackService.getWebViewURL(workspaceConfig.workspace_id, x.channel_id, x.thread_ts), x.id));
                this.addSlackColumnReply(event, requests);
            }
        });
        electron_1.ipcMain.on("add-column-request", (event, arg) => {
            const workSpaceConfig = this.getCurrentWorkspaceConfig();
            if (workSpaceConfig == null) {
                return;
            }
            const url = arg;
            const [channelId, threadTs] = slack_service_1.SlackService.parseUrl(url);
            const columnId = workSpaceConfig.columns.length;
            const request = {
                url: slack_service_1.SlackService.getWebViewURL(workSpaceConfig.workspace_id, channelId, threadTs),
                id: columnId,
            };
            const [appConfig,] = new app_config_repository_1.AppConfigRepository().load(AppConfigFileName);
            appConfig.addWorkspaceColumnConfig(workSpaceConfig.workspace_id, new app_config_1.WorkspaceColumnConfig(columnId, channelId, threadTs));
            new app_config_repository_1.AppConfigRepository().save(AppConfigFileName, appConfig);
            this.addSlackColumnReply(event, [request]);
        });
        electron_1.ipcMain.on("remove-column-request", (event, arg) => {
            const id = arg;
            this.workspaceModel.removeColumn(id);
            const appConfigRepository = new app_config_repository_1.AppConfigRepository();
            const [appConfig,] = appConfigRepository.load(AppConfigFileName);
            const workspaceConfig = this.getCurrentWorkspaceConfig();
            if (workspaceConfig == null) {
                return;
            }
            appConfig.removeWorkspaceColumnConfig(workspaceConfig.workspace_id, id);
            appConfigRepository.save(AppConfigFileName, appConfig);
        });
        electron_1.ipcMain.on("on-added-column", (ipcMainEvent, url) => {
            const columnId = this.workspaceModel.getColumnNum();
            const columnViewInfo = new slack_column_view_info_1.SlackColumnViewInfo(columnId, url);
            const slackColumnView = new slack_column_view_1.SlackColumnView(columnViewInfo, this.rootWindow);
            const slackColumnModel = new slack_column_model_1.SlackColumnModel(columnId);
            slackColumnModel.onChangedSize = (x, y, width, height) => {
                slackColumnView.setSize(x, y, width, height);
            };
            this.workspaceModel.addColumn(slackColumnModel);
            this.slackColumnViewList.push(slackColumnView);
            this.onChangedSlackColumn();
        });
        electron_1.ipcMain.on("update-column-position-reply", (event, xPosList, yPosList, widthList, heightList) => {
            console.log(this.workspaceModel.getColumnNum());
            this.workspaceModel.getColumns().forEach((column, i) => {
                column.setSize(xPosList[i], yPosList[i], widthList[i], heightList[i]);
            });
        });
        electron_1.ipcMain.on("reload-workspace-request", (event) => {
            // todo: renderer側の再構築
            const workspaceConfig = this.getCurrentWorkspaceConfig();
            if (workspaceConfig == null) {
                return;
            }
            this.reloadWorkspaceReplyByWorkspaceConfig(event, workspaceConfig);
        });
        electron_1.ipcMain.on("on-clicked-workspace-icon-r2m", (event, arg) => {
            const workspaceId = (arg);
            const appConfigRepository = new app_config_repository_1.AppConfigRepository();
            const [appConfig,] = appConfigRepository.load(AppConfigFileName);
            const workspaceConfig = appConfig.findWorkspaceConfigById(workspaceId);
            if (workspaceConfig != null) {
                this.currentWorkspaceId = workspaceId;
                appConfig.current_workspace_id = this.currentWorkspaceId;
                appConfigRepository.save(AppConfigFileName, appConfig);
                this.reloadWorkspaceReplyByWorkspaceConfig(event, workspaceConfig);
            }
        });
    }
    onChangedWindow() {
        this.updateSlackColumnPositionRequest();
    }
    onChangedSlackColumn() {
        this.updateSlackColumnPositionRequest();
    }
    addSlackColumnReply(event, requests) {
        event.sender.send("add-column-reply", JSON.stringify(requests));
    }
    updateSlackColumnPositionRequest() {
        this.rootWindow.webContents.send("update-column-position-request");
    }
    reloadWorkspaceReply(event, requests) {
        event.sender.send("reload-workspace-reply", JSON.stringify(requests));
    }
    getCurrentWorkspaceConfig() {
        const appConfigRepository = new app_config_repository_1.AppConfigRepository();
        const [appConfig, success] = appConfigRepository.load(AppConfigFileName);
        if (!success) {
            appConfigRepository.save(AppConfigFileName, app_config_1.AppConfig.default);
        }
        const workspaceConfig = appConfig.findWorkspaceConfigById(this.currentWorkspaceId);
        return workspaceConfig;
    }
    addWorkspaceIconsReply(event, requests) {
        event.sender.send("add-workspace-icon-reply", JSON.stringify(requests));
    }
    reloadWorkspaceReplyByWorkspaceConfig(event, workspaceConifg) {
        // note: ModelとBrowserViewの解放
        this.workspaceModel.removeAll();
        const addSlackColumnRequests = workspaceConifg.columns.map((x) => {
            return new add_slack_column_request_1.AddSlackColumnRequest(slack_service_1.SlackService.getWebViewURL(workspaceConifg.workspace_id, x.channel_id, x.thread_ts), x.id);
        });
        this.reloadWorkspaceReply(event, addSlackColumnRequests);
    }
}
exports.IndexMainProcess = IndexMainProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LW1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQXlFO0FBQ3pFLHlEQUEwRjtBQUMxRiwwREFBcUQ7QUFDckQsMEVBQWtFO0FBQ2xFLCtFQUF3RTtBQUN4RSxvRkFBNkU7QUFDN0UsMkVBQW9FO0FBQ3BFLHlFQUFrRTtBQUNsRSxtRkFBMkU7QUFDM0UsOEVBQXNFO0FBQ3RFLE1BQU0saUJBQWlCLEdBQUcsZ0JBQWdCLENBQUE7QUFFMUMsTUFBYSxnQkFBZ0I7SUFNNUIsWUFBWSxVQUF3QjtRQUpwQyx3QkFBbUIsR0FBd0IsRUFBRSxDQUFBO1FBRTdDLHVCQUFrQixHQUFJLEVBQUUsQ0FBQTtRQUd2QixNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksMkNBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUM5RSxJQUFHLENBQUMsT0FBTyxFQUFDO1lBQ1gsSUFBSSwyQ0FBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRyxzQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3JFO2FBQUk7WUFDSixJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLG9CQUFvQixDQUFBO1NBQ3hEO1FBR0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7UUFDNUIscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsY0FB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