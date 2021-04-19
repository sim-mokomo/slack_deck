"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_2 = require("electron");
const electron_3 = require("electron");
const config_1 = require("./config");
const slack_service_1 = require("./slack-service");
function createWindow() {
    const appConfig = config_1.AppConfig.load();
    const existConfig = appConfig.workspaces.length > 0;
    if (existConfig) {
        const window = new electron_1.BrowserWindow({
            autoHideMenuBar: true
        });
        const webView = new electron_3.BrowserView();
        window.addBrowserView(webView);
        webView.setBounds({ x: 0, y: 0, width: window.getBounds().width, height: window.getBounds().height });
        webView.setAutoResize({ width: false, height: false, horizontal: true, vertical: true });
        webView.webContents.on('will-navigate', (event, url) => {
            console.log(`will navigate ${url}`);
            // NOTE: 各種URLメモ
            // 別窓が開く:  https://<team_id>.slack.com/?redir=%2Fgantry%2Fclient
            // 別窓が開かない : https://<team_id>.slack.com/?redir=/gantry/auth?app=client&return_to=%2Fclient%2F<workspace_id>&teams=
            const clientAppRegex = /https:\/\/.+\.slack\.com\/\?redir=%2Fgantry%2Fclient/;
            if (clientAppRegex.exec(url) != null) {
                console.log("this is client app");
                event.preventDefault();
                void webView.webContents.loadURL("https://app.slack.com/workspace-signin?redir=/gantry/auth?app=client&return_to=%2Fclient&teams=");
            }
        });
        webView.webContents.on('did-navigate', (event, url) => {
            console.log(`did navigate ${url}`);
            if (url == "https://app.slack.com/client") {
                console.log("in deck");
            }
        });
        void webView.webContents.loadURL(slack_service_1.SlackService.getWorkspaceUrl());
        return window;
    }
}
electron_2.app.whenReady().then(() => {
    createWindow();
    electron_2.app.on('window-all-closed', () => {
        electron_2.app.quit();
    });
});
