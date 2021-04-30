import { BrowserWindow } from "electron"
import { app } from "electron"
import { IndexMainProcess } from "./index_main"
import path = require("path")

const indexMainProcess = new IndexMainProcess()
indexMainProcess.init()

void app.whenReady().then(()=>{
    const rootWindow = new BrowserWindow({
        autoHideMenuBar : true,
        webPreferences :{
            webviewTag : true,
            preload : path.join( __dirname,"preload.js")
        }
    })
    
    void rootWindow.loadFile("src/index.html")

    app.on('window-all-closed', () => {
        app.quit()
    })
})