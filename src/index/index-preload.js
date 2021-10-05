"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    InitIndex: () => electron_1.ipcRenderer.send("init-index"),
    AddSlackColumnReply: (listener) => {
        electron_1.ipcRenderer.on("add-column-reply", (event, arg) => {
            const responses = [];
            Object.assign(responses, JSON.parse(arg));
            for (const response of responses) {
                listener(response.url, response.id);
            }
        });
    },
    AddSlackColumnRequest: (url) => {
        electron_1.ipcRenderer.send("add-column-request", url);
    },
    RemoveSlackColumnRequest: (id) => {
        electron_1.ipcRenderer.send("remove-column-request", id);
    },
    OnAddedSlackColumn: (url) => {
        electron_1.ipcRenderer.send("on-added-column", url);
    },
    UpdateSlackColumnPositionRequest: (listener) => {
        electron_1.ipcRenderer.on("update-column-position-request", () => {
            listener();
        });
    },
    UpdateSlackColumnPositionReply: (xPosList, yPosList, widthList, heightList) => {
        electron_1.ipcRenderer.send("update-column-position-reply", xPosList, yPosList, widthList, heightList);
    },
    ReloadWorkspaceRequest: () => {
        electron_1.ipcRenderer.send("reload-workspace-request");
    },
    ReloadWorkspaceReply: (receiver) => {
        electron_1.ipcRenderer.on("reload-workspace-reply", (event, arg) => {
            const responses = [];
            Object.assign(responses, JSON.parse(arg));
            const urlList = responses.map(x => x.url);
            const idList = responses.map(x => x.id);
            receiver(urlList, idList);
        });
    },
    AddWorkspaceIconRequestM2R: (receiver) => {
        electron_1.ipcRenderer.on("add-workspace-icon-reply", (event, arg) => {
            const responses = [];
            Object.assign(responses, JSON.parse(arg));
            const workspaceIdList = responses.map(x => x.workspaceId);
            receiver(workspaceIdList);
        });
    },
    OnClickedWorkspaceIconR2M: (workspaceId) => {
        electron_1.ipcRenderer.send("on-clicked-workspace-icon-r2m", workspaceId);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtcHJlbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LXByZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBcUQ7QUFJckQsd0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7SUFDdEMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLHNCQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMvQyxtQkFBbUIsRUFBRSxDQUFDLFFBQTJDLEVBQUUsRUFBRTtRQUNwRSxzQkFBVyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNqRCxNQUFNLFNBQVMsR0FBNEIsRUFBRSxDQUFBO1lBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUV6QyxLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVMsRUFBRTtnQkFDakMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2FBQ25DO1FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBQ0QscUJBQXFCLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRTtRQUN0QyxzQkFBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBQ0Qsd0JBQXdCLEVBQUUsQ0FBQyxFQUFVLEVBQUUsRUFBRTtRQUN4QyxzQkFBVyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBQ0Qsa0JBQWtCLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRTtRQUNuQyxzQkFBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBQ0QsZ0NBQWdDLEVBQUUsQ0FBQyxRQUFpQixFQUFFLEVBQUU7UUFDdkQsc0JBQVcsQ0FBQyxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxFQUFFO1lBQ3JELFFBQVEsRUFBRSxDQUFBO1FBQ1gsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBQ0QsOEJBQThCLEVBQUUsQ0FBQyxRQUFpQixFQUFFLFFBQWlCLEVBQUUsU0FBa0IsRUFBRSxVQUFtQixFQUFFLEVBQUU7UUFDakgsc0JBQVcsQ0FBQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsUUFBUSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxDQUFDLENBQUE7SUFDekYsQ0FBQztJQUNELHNCQUFzQixFQUFFLEdBQUcsRUFBRTtRQUM1QixzQkFBVyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDRCxvQkFBb0IsRUFBRSxDQUFDLFFBQXVELEVBQUUsRUFBRTtRQUNqRixzQkFBVyxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN2RCxNQUFNLFNBQVMsR0FBNEIsRUFBRSxDQUFBO1lBQzdDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUV6QyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3pDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDdkMsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFDRCwwQkFBMEIsRUFBRSxDQUFDLFFBQTRDLEVBQUUsRUFBRTtRQUM1RSxzQkFBVyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN6RCxNQUFNLFNBQVMsR0FBK0IsRUFBRSxDQUFBO1lBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUV6QyxNQUFNLGVBQWUsR0FBWSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ2xFLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFDRCx5QkFBeUIsRUFBRSxDQUFDLFdBQWtCLEVBQUUsRUFBRTtRQUNqRCxzQkFBVyxDQUFDLElBQUksQ0FBQywrQkFBK0IsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0NBQ0QsQ0FBQyxDQUFBIn0=