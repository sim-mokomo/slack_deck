"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    InitIndex: () => electron_1.ipcRenderer.send("init-index"),
    AddSlackColumnReply: (listener) => {
        electron_1.ipcRenderer.on("add-slack-column-reply", (event, arg) => {
            const responses = [];
            Object.assign(responses, JSON.parse(arg));
            for (const response of responses) {
                listener(response.url, response.id);
            }
        });
    },
    AddSlackColumnRequest: (url) => {
        electron_1.ipcRenderer.send("add-column-main-request", url);
    },
    RemoveSlackColumnRequest: (id) => {
        electron_1.ipcRenderer.send("remove-slack-column", id);
    },
    OpenBrowser: (url) => {
        void electron_1.shell.openExternal(url);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtcHJlbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC1wcmVsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXNGO0FBR3RGLHdCQUFhLENBQUMsaUJBQWlCLENBQzNCLEtBQUssRUFBRTtJQUNILFNBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDOUMsbUJBQW1CLEVBQUUsQ0FBQyxRQUF5QyxFQUFHLEVBQUU7UUFDaEUsc0JBQVcsQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDcEQsTUFBTSxTQUFTLEdBQThCLEVBQUUsQ0FBQTtZQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFFekMsS0FBSSxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUM7Z0JBQzVCLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUN0QztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELHFCQUFxQixFQUFFLENBQUMsR0FBWSxFQUFDLEVBQUU7UUFDbkMsc0JBQVcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUNELHdCQUF3QixFQUFFLENBQUMsRUFBUyxFQUFDLEVBQUU7UUFDbkMsc0JBQVcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUNELFdBQVcsRUFBRyxDQUFDLEdBQVUsRUFBRSxFQUFFO1FBQ3pCLEtBQUssZ0JBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDaEMsQ0FBQztDQUNKLENBQ0osQ0FBQSJ9