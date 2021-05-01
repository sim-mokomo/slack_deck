import {ipcMain} from "electron";
import {IpcMainEvent} from "electron"
import {AppConfig, WorkSpaceColumnConfig} from "./config";
import {SlackService} from "./slack-service";

export class IndexMainProcess{
    init() : void{
        ipcMain.on("init-index", (event) => {
            const appConfig = AppConfig.load()
            const workspaceConfig = appConfig.workspaces[0]
            if(workspaceConfig.workspace_id.length <= 0){
                return
            }

            const requests : AddSlackColumnResponse[] =
                workspaceConfig.columns.map((x,index) => new AddSlackColumnResponse(
                    SlackService.getWebViewURL(workspaceConfig.workspace_id, x.channel_id, x.thread_ts),
                    index
                ))
            this.addSlackColumnResponse(event, requests)
        })

        ipcMain.on('add-column-main-request', (event, arg) => {
            const url : string = (<string>arg)
            const [channelId, threadTs] = SlackService.parseUrl(url)

            const appConfig = AppConfig.load()
            const workSpaceConfig = appConfig.workspaces[0]
            const newColumn = new WorkSpaceColumnConfig(workSpaceConfig.columns.length,channelId, threadTs)
            appConfig.addWorkSpaceColumnConfig(workSpaceConfig.workspace_id, newColumn)
            AppConfig.save(appConfig)

            const request : AddSlackColumnResponse = {
                url: SlackService.getWebViewURL(workSpaceConfig.workspace_id, channelId, threadTs),
                id: workSpaceConfig.columns.length
            }
            this.addSlackColumnResponse(event, [request])
        })

        ipcMain.on("remove-slack-column", (event,arg) => {
            const id = (<number>arg)
            const appConfig = AppConfig.load()
            const workspaceConfig = appConfig.workspaces[0]
            appConfig.removeWorkSpaceColumnConfig(workspaceConfig.workspace_id, id)
            AppConfig.save(appConfig)
        })
    }

    addSlackColumnResponse(event: IpcMainEvent, requests: AddSlackColumnResponse[]) : void {
        event.sender.send('add-slack-column-reply', JSON.stringify(requests))
    }
}

export class AddSlackColumnResponse {
    url : string
    id: number

    constructor(url:string, id:number) {
        this.url = url
        this.id = id
    }
}