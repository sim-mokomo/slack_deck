"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_2 = require("electron");
const electron_3 = require("electron");
const path_1 = __importDefault(require("path"));
function createWindow() {
    const window = new electron_1.BrowserWindow({
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js')
        }
    });
    window.maximize();
    const webView = new electron_3.BrowserView();
    window.setBrowserView(webView);
    const winodwBounds = window.getBounds();
    webView.setAutoResize({ width: true, height: true, horizontal: true, vertical: true });
    webView.setBounds({ x: 0, y: 0, width: winodwBounds.width, height: winodwBounds.height });
    webView.webContents.loadURL('https://www.google.com/');
}
electron_2.app.whenReady().then(() => {
    createWindow();
    electron_2.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length == 0) {
            createWindow();
        }
    });
});
electron_2.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_2.app.quit();
    }
});
