import { BrowserWindow } from "electron"
import { app } from "electron"
import { BrowserView } from 'electron'
import {AppConfig, WorkSpaceConfig} from "./config";
import {SlackService} from "./slack-service";

function createWindow() {
    const appConfig = AppConfig.load()
    const existConfig = appConfig.workspaces.length > 0
    if(existConfig){
        const window = new BrowserWindow({
            autoHideMenuBar : true
        })
        const webView = new BrowserView()
        window.addBrowserView(webView)
        webView.setBounds({x:0, y:0, width: window.getBounds().width, height: window.getBounds().height})
        webView.setAutoResize({width: false, height: false, horizontal: true, vertical:true})
        webView.webContents.on('will-navigate', (event:Event ,url:string)=>{
            console.log(`will navigate ${url}`)

            // NOTE: 各種URLメモ
            // 別窓が開く:  https://<team_id>.slack.com/?redir=%2Fgantry%2Fclient
            // 別窓が開かない : https://<team_id>.slack.com/?redir=/gantry/auth?app=client&return_to=%2Fclient%2F<workspace_id>&teams=

            const clientAppRegex = /https:\/\/.+\.slack\.com\/\?redir=%2Fgantry%2Fclient/
            if(clientAppRegex.exec(url) != null){
                console.log("this is client app")
                event.preventDefault()
                void webView.webContents.loadURL("https://app.slack.com/workspace-signin?redir=/gantry/auth?app=client&return_to=%2Fclient&teams=")
            }
        })

        webView.webContents.on('did-navigate',(event:Event, url:string) => {
            console.log(`did navigate ${url}`)
            if(url == "https://app.slack.com/client"){
                console.log("in deck")
            }
        })
        void webView.webContents.loadURL(SlackService.getWorkspaceUrl())
        return window
    }
}

app.whenReady().then(()=>{
    createWindow()
    app.on('window-all-closed', () => {
        app.quit()
    })
})

