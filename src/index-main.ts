import {ipcMain, shell, BrowserWindow, IpcMainEvent} from "electron"
import {WorkspaceColumnConfig} from "./app-config"
import { SlackService } from "./slack-service"
import {AddSlackColumnRequest} from "./add-slack-column-request";
import {AppConfigRepository} from "./app-config-repository";
import {SlackWorkspaceModel} from "./slack-workspace-model";

const AppConfigFileName = "appconfig.json"

export class IndexMainProcess {
	workspaceModel = new SlackWorkspaceModel()
	rootWindow : BrowserWindow

	constructor(rootWindow:BrowserWindow) {
		this.rootWindow = rootWindow

		this.rootWindow.on("resized", () => {
			this.updateSlackColumnPositionRequest()
		})
		this.rootWindow.on("maximize", () =>{
			this.updateSlackColumnPositionRequest()
		})
	}

	init(): void {
		ipcMain.on("init-index", (event) => {
			const appConfigRepository = new AppConfigRepository()
			const workspaceConfig =
				appConfigRepository
					.load(AppConfigFileName)
					.getWorkspaceConfigHead()
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
			this.addSlackColumnResponse(event, requests)
		})

		ipcMain.on("add-slack-column-request", (event, arg) => {
			const url: string = <string>arg
			const [channelId, threadTs] = SlackService.parseUrl(url)

			const appConfigRepository = new AppConfigRepository()
			const appConfig = appConfigRepository.load(AppConfigFileName)
			const workSpaceConfig = appConfig.getWorkspaceConfigHead()
			if(workSpaceConfig == null){
				return
			}

			const newColumn = new WorkspaceColumnConfig(
				workSpaceConfig.columns.length,
				channelId,
				threadTs,
			)
			const request: AddSlackColumnRequest = {
				url: SlackService.getWebViewURL(
					workSpaceConfig.workspace_id,
					channelId,
					threadTs,
				),
				id: workSpaceConfig.columns.length,
			}
			appConfig.addWorkspaceColumnConfig(
				workSpaceConfig.workspace_id,
				newColumn,
			)
			appConfigRepository.save(AppConfigFileName,appConfig)
			this.addSlackColumnResponse(event, [request])
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
			this.updateSlackColumnPositionRequest()
		})

		ipcMain.on("update-slack-column-position-reply", (event, xPosList: number[], yPosList: number[], widthList:number[], heightList:number[]) => {
			this.updateSlackColumnPositionReply(xPosList,yPosList,widthList,heightList)
		})
	}

	addSlackColumnResponse(event: IpcMainEvent, requests: AddSlackColumnRequest[],): void {
		event.sender.send("add-slack-column-reply", JSON.stringify(requests))
	}
	updateSlackColumnPositionRequest() : void {
		this.rootWindow.webContents.send("update-slack-column-position-request")
	}
	updateSlackColumnPositionReply(xPosList: number[], yPosList: number[], widthList:number[], heightList:number[]) : void {
		this.workspaceModel.getColumns().forEach((column, i) => {
			// todo: domから取得する
			const columnHeaderHeight = 26
			column.setSize(
				xPosList[i],
				yPosList[i] + columnHeaderHeight,
				heightList[i] - columnHeaderHeight)
		})
	}
}