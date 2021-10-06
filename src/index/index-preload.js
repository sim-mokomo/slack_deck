"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const channel_define_1 = require("../channel-define");
electron_1.contextBridge.exposeInMainWorld("api", {
    InitIndex: () => electron_1.ipcRenderer.send(channel_define_1.ChannelDefine.onInitializeIndexR2M),
    AddSlackColumnReply: (listener) => {
        electron_1.ipcRenderer.on(channel_define_1.ChannelDefine.addSlackColumnM2R, (event, arg) => {
            const responses = [];
            Object.assign(responses, JSON.parse(arg));
            for (const response of responses) {
                listener(response.url, response.id);
            }
        });
    },
    AddSlackColumnRequest: (url) => {
        electron_1.ipcRenderer.send(channel_define_1.ChannelDefine.addSlackColumnR2M, url);
    },
    RemoveSlackColumnRequest: (id) => {
        electron_1.ipcRenderer.send(channel_define_1.ChannelDefine.removeSlackColumnR2M, id);
    },
    OnAddedSlackColumn: (url) => {
        electron_1.ipcRenderer.send(channel_define_1.ChannelDefine.onAddedSlackColumnR2M, url);
    },
    UpdateSlackColumnPositionRequest: (listener) => {
        electron_1.ipcRenderer.on(channel_define_1.ChannelDefine.updateSlackColumnPositionM2R, () => {
            listener();
        });
    },
    UpdateSlackColumnPositionReply: (xPosList, yPosList, widthList, heightList) => {
        electron_1.ipcRenderer.send(channel_define_1.ChannelDefine.updateSlackColumnPositionR2M, xPosList, yPosList, widthList, heightList);
    },
    ReloadWorkspaceRequest: () => {
        electron_1.ipcRenderer.send(channel_define_1.ChannelDefine.reloadAppR2M);
    },
    ReloadWorkspaceReply: (receiver) => {
        electron_1.ipcRenderer.on(channel_define_1.ChannelDefine.reloadAppM2R, (event, arg) => {
            const responses = [];
            Object.assign(responses, JSON.parse(arg));
            const urlList = responses.map(x => x.url);
            const idList = responses.map(x => x.id);
            receiver(urlList, idList);
        });
    },
    AddWorkspaceIconRequestM2R: (receiver) => {
        electron_1.ipcRenderer.on(channel_define_1.ChannelDefine.addWorkspaceIconM2R, (event, arg) => {
            const responses = [];
            Object.assign(responses, JSON.parse(arg));
            const workspaceIdList = responses.map(x => x.workspaceId);
            receiver(workspaceIdList);
        });
    },
    OnClickedWorkspaceIconR2M: (workspaceId) => {
        electron_1.ipcRenderer.send(channel_define_1.ChannelDefine.onClickedWorkspaceIconR2M, workspaceId);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtcHJlbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LXByZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBcUQ7QUFHckQsc0RBQWdEO0FBRWhELHdCQUFhLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFO0lBQ3RDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxzQkFBVyxDQUFDLElBQUksQ0FBQyw4QkFBYSxDQUFDLG9CQUFvQixDQUFDO0lBQ3JFLG1CQUFtQixFQUFFLENBQUMsUUFBMkMsRUFBRSxFQUFFO1FBQ3BFLHNCQUFXLENBQUMsRUFBRSxDQUFDLDhCQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDOUQsTUFBTSxTQUFTLEdBQTRCLEVBQUUsQ0FBQTtZQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFFekMsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUU7Z0JBQ2pDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUNuQztRQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUNELHFCQUFxQixFQUFFLENBQUMsR0FBVyxFQUFFLEVBQUU7UUFDdEMsc0JBQVcsQ0FBQyxJQUFJLENBQUMsOEJBQWEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBQ0Qsd0JBQXdCLEVBQUUsQ0FBQyxFQUFVLEVBQUUsRUFBRTtRQUN4QyxzQkFBVyxDQUFDLElBQUksQ0FBQyw4QkFBYSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFDRCxrQkFBa0IsRUFBRSxDQUFDLEdBQVcsRUFBRSxFQUFFO1FBQ25DLHNCQUFXLENBQUMsSUFBSSxDQUFDLDhCQUFhLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDM0QsQ0FBQztJQUNELGdDQUFnQyxFQUFFLENBQUMsUUFBaUIsRUFBRSxFQUFFO1FBQ3ZELHNCQUFXLENBQUMsRUFBRSxDQUFDLDhCQUFhLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO1lBQy9ELFFBQVEsRUFBRSxDQUFBO1FBQ1gsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBQ0QsOEJBQThCLEVBQUUsQ0FBQyxRQUFpQixFQUFFLFFBQWlCLEVBQUUsU0FBa0IsRUFBRSxVQUFtQixFQUFFLEVBQUU7UUFDakgsc0JBQVcsQ0FBQyxJQUFJLENBQUMsOEJBQWEsQ0FBQyw0QkFBNEIsRUFBRSxRQUFRLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLENBQUMsQ0FBQTtJQUNyRyxDQUFDO0lBQ0Qsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO1FBQzVCLHNCQUFXLENBQUMsSUFBSSxDQUFDLDhCQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNELG9CQUFvQixFQUFFLENBQUMsUUFBdUQsRUFBRSxFQUFFO1FBQ2pGLHNCQUFXLENBQUMsRUFBRSxDQUFDLDhCQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3pELE1BQU0sU0FBUyxHQUE0QixFQUFFLENBQUE7WUFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBRXpDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDekMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN2QyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzFCLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUNELDBCQUEwQixFQUFFLENBQUMsUUFBNEMsRUFBRSxFQUFFO1FBQzVFLHNCQUFXLENBQUMsRUFBRSxDQUFDLDhCQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDaEUsTUFBTSxTQUFTLEdBQStCLEVBQUUsQ0FBQTtZQUNoRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFFekMsTUFBTSxlQUFlLEdBQVksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUNsRSxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDMUIsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBQ0QseUJBQXlCLEVBQUUsQ0FBQyxXQUFrQixFQUFFLEVBQUU7UUFDakQsc0JBQVcsQ0FBQyxJQUFJLENBQUMsOEJBQWEsQ0FBQyx5QkFBeUIsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUN2RSxDQUFDO0NBQ0QsQ0FBQyxDQUFBIn0=