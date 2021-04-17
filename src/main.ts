import { BrowserWindow } from "electron"
import { app } from "electron"
import { BrowserView } from 'electron'
import path from 'path'

function createWindow() {
    const window = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    window.maximize()

    const webView = new BrowserView()
    window.setBrowserView(webView)
    const winodwBounds = window.getBounds()
    webView.setAutoResize({width: true, height: true, horizontal: true, vertical:true})
    webView.setBounds({x: 0, y: 0, width: winodwBounds.width, height: winodwBounds.height})
    webView.webContents.loadURL('https://www.google.com/')
}

app.whenReady().then(()=>{
    createWindow()

    app.on('activate', ()=>{
        if(BrowserWindow.getAllWindows().length == 0){
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})