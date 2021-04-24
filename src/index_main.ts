import {ipcMain} from "electron";
import {AppConfig, WorkSpaceColumnConfig} from "./config";
import {SlackService} from "./slack-service";

export class IndexMainProcess{
    init() {
        ipcMain.on("init-index", (event,...args) => {
            const appConfig = AppConfig.load()
            const workspaceConfig = appConfig.workspaces[0]
            if(workspaceConfig.workspace_id.length <= 0){
                return
            }

            const launcherUrls : string[] = []
            for (const columnConfig of workspaceConfig.columns) {
                const url = columnConfig.thread_ts.length > 0 ?
                    SlackService.getThreadUrl(
                        workspaceConfig.workspace_id,
                        columnConfig.channel_id,
                        columnConfig.thread_ts
                    )
                    :
                    SlackService.getChannelUrl(
                        workspaceConfig.workspace_id,
                        columnConfig.channel_id
                    )
                launcherUrls.push(url)
                console.log(url)
            }

            event.sender.send('add-slack-column-reply',launcherUrls)
        })

        ipcMain.on('add-column-main-request', (event, arg) => {
            const url : string = (<string>arg)
            const [channelId, threadTs] = SlackService.parseUrl(url)

            const newColumn = new WorkSpaceColumnConfig(channelId, threadTs)
            const appConfig = AppConfig.load()
            const workSpaceConfig = appConfig.workspaces[0]
            appConfig.addWorkSpaceColumnConfig(workSpaceConfig.workspace_id, newColumn)
            AppConfig.save(appConfig)

            const columnUrl = SlackService.getWebViewURL(workSpaceConfig.workspace_id, channelId, threadTs)
            event.sender.send('add-slack-column-reply', [columnUrl])
        })
    }
}

