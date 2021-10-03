import {ipcMain, shell, BrowserWindow, IpcMainEvent, app} from "electron"
import {AppConfig, WorkspaceColumnConfig, WorkspaceConfig} from "./app-config/app-config"
import { SlackService } from "./slack/slack-service"
import {AddSlackColumnRequest} from "./add-slack-column-request";
import {AppConfigRepository} from "./app-config/app-config-repository";
import {SlackWorkspaceModel} from "./slack/workspace/slack-workspace-model";
import {SlackColumnModel} from "./slack/column/slack-column-model";
import {SlackColumnView} from "./slack/column/slack-column-view";
import {SlackColumnViewInfo} from "./slack/column/slack-column-view-info";
const AppConfigFileName = "appconfig.json"

export class IndexMainProcess {
	workspaceModel : SlackWorkspaceModel
	slackColumnViewList :  SlackColumnView[] = []
	rootWindow : BrowserWindow

	constructor(rootWindow:BrowserWindow) {
		this.rootWindow = rootWindow
		// todo: ワークスペースを対象にしたカラムのリロードを行えるように
		this.rootWindow.on("resized", () => {
			this.onChangedWindow()
		})
		this.rootWindow.on("maximize", () =>{
			this.onChangedWindow()
		})

		this.workspaceModel = new SlackWorkspaceModel();
		this.workspaceModel.onDelete = (columnId : number) => {
			const slackColumnView = this.slackColumnViewList.find(x => x.viewInfo.id == columnId)
			slackColumnView?.delete()
			this.slackColumnViewList = this.slackColumnViewList.filter(x => x.viewInfo.id != columnId)
		}
	}

	init(): void {
		ipcMain.on("init-index", (event) => {
			// todo: ワークスペースの切り替えを行えるように
			const appConfigRepository = new AppConfigRepository()
			const [appConfig, success] : [AppConfig, boolean] = appConfigRepository.load(AppConfigFileName)
			if(!success){
				appConfigRepository.save(AppConfigFileName,  AppConfig.default)
			}
			const workspaceConfig = appConfig.getWorkspaceConfigHead()
			if(workspaceConfig == null){
				return
			}

			const requests = workspaceConfig.columns.map(
				x =>
					new AddSlackColumnRequest(
						SlackService.getWebViewURL(workspaceConfig.workspace_id, x.channel_id, x.thread_ts),
						x.id
					),
			)
			this.addSlackColumnReply(event, requests)
		})

		ipcMain.on("add-column-request", (event, arg) => {
			const workSpaceConfig = new AppConfigRepository().load(AppConfigFileName)[0].getWorkspaceConfigHead()
			if(workSpaceConfig == null){
				return
			}

			const url: string = <string>arg
			const [channelId, threadTs] = SlackService.parseUrl(url)
			const columnId = workSpaceConfig.columns.length
			const request: AddSlackColumnRequest = {
				url: SlackService.getWebViewURL(
					workSpaceConfig.workspace_id,
					channelId,
					threadTs,
				),
				id: columnId,
			}

			const [appConfig,] : [AppConfig, boolean] = new AppConfigRepository().load(AppConfigFileName)
			appConfig.addWorkspaceColumnConfig(
				workSpaceConfig.workspace_id,
				new WorkspaceColumnConfig(
					columnId,
					channelId,
					threadTs,
				),
			)

			new AppConfigRepository().save(AppConfigFileName, appConfig)
			this.addSlackColumnReply(event, [request])
		})

		ipcMain.on("remove-column-request", (event, arg) => {
			const id = <number>arg
			this.workspaceModel.removeColumn(id)

			const appConfigRepository = new AppConfigRepository()
			const [appConfig,] : [AppConfig, boolean] = appConfigRepository.load(AppConfigFileName)
			const workspaceConfig = appConfig.getWorkspaceConfigHead()
			if(workspaceConfig == null){
				return
			}

			appConfig.removeWorkspaceColumnConfig(workspaceConfig.workspace_id, id)
			appConfigRepository.save(AppConfigFileName, appConfig)
		})

		ipcMain.on("on-added-column", (ipcMainEvent, url) => {
			const columnId = this.workspaceModel.getColumnNum()
			const columnViewInfo = new SlackColumnViewInfo(
					columnId,
					url
			)
			const slackColumnView = new SlackColumnView(columnViewInfo, this.rootWindow)
			const slackColumnModel = new SlackColumnModel(columnId)
			slackColumnModel.onChangedSize = (x,y,width, height) => {
				slackColumnView.setSize(x, y, width, height)
			}
			this.workspaceModel.addColumn(slackColumnModel)
			this.slackColumnViewList.push(slackColumnView);
			this.onChangedSlackColumn()
		})

		ipcMain.on("update-column-position-reply", (event, xPosList: number[], yPosList: number[], widthList:number[], heightList:number[]) => {
			console.log(this.workspaceModel.getColumnNum())
			this.workspaceModel.getColumns().forEach((column, i) => {
				column.setSize(
					xPosList[i],
					yPosList[i],
					widthList[i],
					heightList[i])
			})
		})

		ipcMain.on("reload-workspace-request", (event) => {
			// note: ModelとBrowserViewの解放
			this.workspaceModel.removeAll()

			// todo: renderer側の再構築
			const appConfigRepository = new AppConfigRepository()
			const [appConfig,] : [AppConfig,boolean] = appConfigRepository.load(AppConfigFileName)
			const workspaceConfig = appConfig.getWorkspaceConfigHead()
			if(workspaceConfig == null){
				return
			}

			const addSlackColumnRequests = workspaceConfig.columns.map((x) => {
				return new AddSlackColumnRequest(
					SlackService.getWebViewURL(workspaceConfig.workspace_id, x.channel_id, x.thread_ts),
					x.id
				)
			})
			this.reloadWorkspaceReply(event, addSlackColumnRequests)
		})
	}

	onChangedWindow():void{
		this.updateSlackColumnPositionRequest()
	}

	onChangedSlackColumn():void{
		this.updateSlackColumnPositionRequest()
	}

	addSlackColumnReply(event: IpcMainEvent, requests: AddSlackColumnRequest[],): void {
		event.sender.send("add-column-reply", JSON.stringify(requests))
	}
	updateSlackColumnPositionRequest() : void {
		this.rootWindow.webContents.send("update-column-position-request")
	}
	reloadWorkspaceReply(event: IpcMainEvent, requests : AddSlackColumnRequest[]) :void {
		event.sender.send("reload-workspace-reply", JSON.stringify(requests))
	}
}