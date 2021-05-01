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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC1tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUF3QztBQUV4QyxxQ0FBMEQ7QUFDMUQsbURBQTZDO0FBRTdDLE1BQWEsZ0JBQWdCO0lBQ3pCLElBQUk7UUFDQSxrQkFBTyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFNBQVMsR0FBRyxrQkFBUyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ2xDLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDL0MsSUFBRyxlQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7Z0JBQ3hDLE9BQU07YUFDVDtZQUVELE1BQU0sUUFBUSxHQUNWLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxzQkFBc0IsQ0FDL0QsNEJBQVksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFDbkYsS0FBSyxDQUNSLENBQUMsQ0FBQTtZQUNOLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDaEQsQ0FBQyxDQUFDLENBQUE7UUFFRixrQkFBTyxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNqRCxNQUFNLEdBQUcsR0FBcUIsR0FBSSxDQUFBO1lBQ2xDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEdBQUcsNEJBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7WUFFeEQsTUFBTSxTQUFTLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUNsQyxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQy9DLE1BQU0sU0FBUyxHQUFHLElBQUksOEJBQXFCLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQy9GLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQzNFLGtCQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBRXpCLE1BQU0sT0FBTyxHQUE0QjtnQkFDckMsR0FBRyxFQUFFLDRCQUFZLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztnQkFDbEYsRUFBRSxFQUFFLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTTthQUNyQyxDQUFBO1lBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDakQsQ0FBQyxDQUFDLENBQUE7UUFFRixrQkFBTyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsRUFBRTtZQUM1QyxNQUFNLEVBQUUsR0FBWSxHQUFJLENBQUE7WUFDeEIsTUFBTSxTQUFTLEdBQUcsa0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUNsQyxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQy9DLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBQ3ZFLGtCQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzdCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHNCQUFzQixDQUFDLEtBQW1CLEVBQUUsUUFBa0M7UUFDMUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7Q0FDSjtBQTlDRCw0Q0E4Q0M7QUFFRCxNQUFhLHNCQUFzQjtJQUkvQixZQUFZLEdBQVUsRUFBRSxFQUFTO1FBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1FBQ2QsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDaEIsQ0FBQztDQUNKO0FBUkQsd0RBUUMifQ==