import {ipcMain, shell, BrowserWindow, IpcMainEvent} from "electron"
import {AppConfig, WorkspaceColumnConfig} from "./app-config"
import { SlackService } from "./slack-service"
import {AddSlackColumnRequest} from "./add-slack-column-request";
import {AppConfigRepository} from "./app-config-repository";
import {SlackWorkspaceModel} from "./slack-workspace-model";

const AppConfigFileName = "appconfig.json"

export class IndexMainProcess {
	workspaceModel = new SlackWorkspaceModel()
	rootWindow : BrowserWindow
	appConfig : AppConfig = new AppConfig()

	constructor(rootWindow:BrowserWindow) {
		this.rootWindow = rootWindow

		this.rootWindow.on("resized", () => {
			this.onChangedWindow()
		})
		this.rootWindow.on("maximize", () =>{
			this.onChangedWindow()
		})
	}

	init(): void {
		ipcMain.on("init-index", (event) => {
			this.appConfig = new AppConfigRepository().load(AppConfigFileName)
			const workspaceConfig = this.appConfig.getWorkspaceConfigHead()
			if(workspaceConfig == null){
				return
			}

			const requests = workspaceConfig.columns.map(
				(x, index) =>
					new AddSlackColumnRequest(
						SlackService.getWebViewURL(workspaceConfig.workspace_id, x.channel_id, x.thread_ts),
						index
					),
			)
			this.addSlackColumnReply(event, requests)
		})

		ipcMain.on("add-slack-column-request", (event, arg) => {
			const workSpaceConfig = this.appConfig.getWorkspaceConfigHead()
			if(workSpaceConfig == null){
				return
			}

			const url: string = <string>arg
			const [channelId, threadTs] = SlackService.parseUrl(url)
			const request: AddSlackColumnRequest = {
				url: SlackService.getWebViewURL(
					workSpaceConfig.workspace_id,
					channelId,
					threadTs,
				),
				id: workSpaceConfig.columns.length,
			}

			this.appConfig.addWorkspaceColumnConfig(
				workSpaceConfig.workspace_id,
				new WorkspaceColumnConfig(
					workSpaceConfig.columns.length,
					channelId,
					threadTs,
				),
			)

			new AppConfigRepository().save(AppConfigFileName,this.appConfig)
			this.addSlackColumnReply(event, [request])
		})

		ipcMain.on("remove-slack-column-request", (event, arg) => {
			const id = <number>arg
			this.workspaceModel.removeColumn(id)

			const appConfigRepository = new AppConfigRepository()
			const appConfig = appConfigRepository.load(AppConfigFileName)
			const workspaceConfig = appConfig.getWorkspaceConfigHead()
			if(workspaceConfig == null){
				return
			}

			appConfig.removeWorkspaceColumnConfig(workspaceConfig.workspace_id, id)
			appConfigRepository.save(AppConfigFileName, appConfig)
		})

		ipcMain.on("on-added-slack-column", (ipcMainEvent, url) => {
			this.workspaceModel.addColumn(this.workspaceModel.createSlackColumn(this.rootWindow,url))
			this.onChangedSlackColumn()
		})

		ipcMain.on("update-slack-column-position-reply", (event, xPosList: number[], yPosList: number[], widthList:number[], heightList:number[]) => {
			this.workspaceModel.getColumns().forEach((column, i) => {
				// todo: domから取得する
				const columnHeaderHeight = 26
				column.setSize(
					xPosList[i],
					yPosList[i] + columnHeaderHeight,
					heightList[i] - columnHeaderHeight)
			})
		})
	}

	onChangedWindow():void{
		this.updateSlackColumnPositionRequest()
	}

	onChangedSlackColumn():void{
		this.updateSlackColumnPositionRequest()
	}

	addSlackColumnReply(event: IpcMainEvent, requests: AddSlackColumnRequest[],): void {
		event.sender.send("add-slack-column-reply", JSON.stringify(requests))
	}
	updateSlackColumnPositionRequest() : void {
		this.rootWindow.webContents.send("update-slack-column-position-request")
	}
}