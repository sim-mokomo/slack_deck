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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXdDO0FBQ3hDLHVDQUE4QjtBQUM5Qiw2Q0FBK0M7QUFDL0MsNkJBQTZCO0FBRTdCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSw2QkFBZ0IsRUFBRSxDQUFBO0FBQy9DLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFBO0FBRXZCLEtBQUssY0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFFLEVBQUU7SUFDMUIsTUFBTSxVQUFVLEdBQUcsSUFBSSx3QkFBYSxDQUFDO1FBQ2pDLGVBQWUsRUFBRyxJQUFJO1FBQ3RCLGNBQWMsRUFBRTtZQUNaLFVBQVUsRUFBRyxJQUFJO1lBQ2pCLE9BQU8sRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFFLFNBQVMsRUFBQyxrQkFBa0IsQ0FBQztTQUNyRDtLQUNKLENBQUMsQ0FBQTtJQUVGLEtBQUssVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBRTFDLGNBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQzdCLGNBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNkLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==