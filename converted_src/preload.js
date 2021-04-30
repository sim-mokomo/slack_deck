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
    OpenBrowser: (url) => {
        void electron_1.shell.openExternal(url);
    }
});
//# sourceMappingURL=preload.js.map