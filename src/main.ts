import { BrowserWindow } from "electron"
import { app } from "electron"
import { IndexMainProcess } from "./index_main"

const indexMainProcess = new IndexMainProcess()
indexMainProcess.init()

void app.whenReady().then(()=>{
    const rootWindow = new BrowserWindow({
        autoHideMenuBar : true,
        webPreferences :{
            webviewTag : true,
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    
    void rootWindow.loadFile("src/index.html")

    app.on('window-all-closed', () => {
        app.quit()
    })
})