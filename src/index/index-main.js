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
const channel_define_1 = require("../channel-define");
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
        electron_1.ipcMain.on(channel_define_1.ChannelDefine.onInitializeIndexR2M, (event) => {
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
        electron_1.ipcMain.on(channel_define_1.ChannelDefine.addSlackColumnR2M, (event, arg) => {
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
        electron_1.ipcMain.on(channel_define_1.ChannelDefine.removeSlackColumnR2M, (event, arg) => {
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
        electron_1.ipcMain.on(channel_define_1.ChannelDefine.onAddedSlackColumnR2M, (ipcMainEvent, url) => {
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
        electron_1.ipcMain.on(channel_define_1.ChannelDefine.updateSlackColumnPositionR2M, (event, xPosList, yPosList, widthList, heightList) => {
            console.log(this.workspaceModel.getColumnNum());
            this.workspaceModel.getColumns().forEach((column, i) => {
                column.setSize(xPosList[i], yPosList[i], widthList[i], heightList[i]);
            });
        });
        electron_1.ipcMain.on(channel_define_1.ChannelDefine.reloadAppR2M, (event) => {
            // todo: renderer側の再構築
            const workspaceConfig = this.getCurrentWorkspaceConfig();
            if (workspaceConfig == null) {
                return;
            }
            this.reloadWorkspaceReplyByWorkspaceConfig(event, workspaceConfig);
        });
        electron_1.ipcMain.on(channel_define_1.ChannelDefine.onClickedWorkspaceIconR2M, (event, arg) => {
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
        event.sender.send(channel_define_1.ChannelDefine.addSlackColumnM2R, JSON.stringify(requests));
    }
    updateSlackColumnPositionRequest() {
        this.rootWindow.webContents.send(channel_define_1.ChannelDefine.updateSlackColumnPositionM2R);
    }
    reloadWorkspaceReply(event, requests) {
        event.sender.send(channel_define_1.ChannelDefine.reloadAppM2R, JSON.stringify(requests));
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
        event.sender.send(channel_define_1.ChannelDefine.addWorkspaceIconM2R, JSON.stringify(requests));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LW1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQXlFO0FBQ3pFLHlEQUEwRjtBQUMxRiwwREFBcUQ7QUFDckQsMEVBQWtFO0FBQ2xFLCtFQUF3RTtBQUN4RSxvRkFBNkU7QUFDN0UsMkVBQW9FO0FBQ3BFLHlFQUFrRTtBQUNsRSxtRkFBMkU7QUFDM0UsOEVBQXNFO0FBQ3RFLHNEQUFnRDtBQUNoRCxNQUFNLGlCQUFpQixHQUFHLGdCQUFnQixDQUFBO0FBRTFDLE1BQWEsZ0JBQWdCO0lBTTVCLFlBQVksVUFBd0I7UUFKcEMsd0JBQW1CLEdBQXdCLEVBQUUsQ0FBQTtRQUU3Qyx1QkFBa0IsR0FBSSxFQUFFLENBQUE7UUFHdkIsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLDJDQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDOUUsSUFBRyxDQUFDLE9BQU8sRUFBQztZQUNYLElBQUksMkNBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUcsc0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUNyRTthQUFJO1lBQ0osSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQTtTQUN4RDtRQUdELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO1FBQzVCLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtRQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO1FBRUYs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