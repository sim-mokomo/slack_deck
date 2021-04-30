"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_2 = require("electron");
const index_main_1 = require("./index-main");
const path = require("path");
const indexMainProcess = new index_main_1.IndexMainProcess();
indexMainProcess.init();
void electron_2.app.whenReady().then(() => {
    const rootWindow = new electron_1.BrowserWindow({
        autoHideMenuBar: true,
        webPreferences: {
            webviewTag: true,
            preload: path.join(__dirname, "index-preload.js")
        }
    });
    void rootWindow.loadFile("src/index.html");
    electron_2.app.on('window-all-closed', () => {
        electron_2.app.quit();
    });
});
//# sourceMappingURL=main.js.map