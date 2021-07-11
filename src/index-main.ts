import {BrowserView, ipcMain, shell, BrowserWindow, IpcMainEvent} from "electron"
import {AppConfig, WorkspaceColumnConfig} from "./app-config"
import { SlackService } from "./slack-service"
import {SlackColumnModel} from "./slack-column-model";
import {AddSlackColumnReply} from "./add-slack-column-reply";

const ColumnWidth = 400

export class IndexMainProcess {
	columnModels : SlackColumnModel[] = []
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
			const appConfig = AppConfig.load()
			const workspaceConfig = appConfig.getWorkspaceConfigHead()
			if(workspaceConfig == null){
				return
			}

			const requests = workspaceConfig.columns.map(
				(x, index) =>
					new AddSlackColumnReply(
						SlackService.getWebViewURL(workspaceConfig.workspace_id, x.channel_id, x.thread_ts),
						index
					),
			)
			this.addSlackColumnResponse(event, requests)
		})

		ipcMain.on("add-slack-column-request", (event, arg) => {
			const url: string = <string>arg
			const [channelId, threadTs] = SlackService.parseUrl(url)

			const appConfig = AppConfig.load()
			const workSpaceConfig = appConfig.getWorkspaceConfigHead()
			if(workSpaceConfig == null){
				return
			}

			const newColumn = new WorkspaceColumnConfig(
				workSpaceConfig.columns.length,
				channelId,
				threadTs,
			)
			const request: AddSlackColumnReply = {
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
			AppConfig.save(appConfig)
			this.addSlackColumnResponse(event, [request])
		})

		ipcMain.on("remove-slack-column-request", (event, arg) => {
			const id = <number>arg
			this.removeSlackColumn(id)

			const appConfig = AppConfig.load()
			const workspaceConfig = appConfig.getWorkspaceConfigHead()
			if(workspaceConfig == null){
				return
			}

			appConfig.removeWorkspaceColumnConfig(workspaceConfig.workspace_id, id)
			AppConfig.save(appConfig)
		})

		ipcMain.on("on-added-slack-column", (ipcMainEvent, url) => {
			const slackColumnModel = this.createSlackColumn(this.columnModels.length,  url)
			this.rootWindow.addBrowserView(slackColumnModel.view)
			this.columnModels.push(slackColumnModel)
			this.updateSlackColumnPositionRequest()
		})

		ipcMain.on("update-slack-column-position-response", (event, xPosList: number[], yPosList: number[], widthList:number[], heightList:number[]) => {
			console.log("reposition")
			console.log(xPosList)
			this.columnModels.forEach((model, i) => {
				// todo: domから取得する
				const columnHeaderHeight = 26
				// note: setBound は 整数しか受け入れないので round している
				model.view.setBounds({
					x: Math.round(xPosList[i]),
					y: Math.round(yPosList[i] + columnHeaderHeight),
					width: ColumnWidth,
					height: Math.round(heightList[i]) - columnHeaderHeight
				})
			})
		})
	}

	addSlackColumnResponse(event: IpcMainEvent, requests: AddSlackColumnReply[],): void {
		event.sender.send("add-slack-column-reply", JSON.stringify(requests))
	}
	updateSlackColumnPositionRequest() : void {
		this.rootWindow.webContents.send("update-slack-column-position-request")
	}

	removeSlackColumn(slackColumnId:number) {
		const columnModel = this.columnModels.find(x => x.id == slackColumnId)
		if(columnModel == null){
			return
		}

		this.columnModels = this.columnModels.filter(x => x.id == slackColumnId)
		const view = columnModel.view
		this.rootWindow.removeBrowserView(view)
		view.webContents.delete()
	}

	createSlackColumn(slackColumnId: number,url:string) : SlackColumnModel {
		const view = new BrowserView()
		void view.webContents.loadURL(url)
		view.webContents.addListener("new-window", (event, url) => {
			event.preventDefault()
			void shell.openExternal(url)
		})
		view.setBounds({x:0,y:0,width:ColumnWidth,height:0})
		view.webContents.addListener("did-finish-load", () => {
			const isThread = url.includes("thread")
			this.applyCSSForSlackColumn(view, isThread)
		})
		return new SlackColumnModel(slackColumnId, view)
	}

	applyCSSForSlackColumn(browserView : BrowserView, isThread: boolean) : void {
		const commonCSSContents = [
			".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}",
			".p-client { grid-template-rows: 0px auto min-content !important; }",
			".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}",
			".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}",
		]
		for (const commonCSSContent of commonCSSContents) {
			void browserView.webContents.insertCSS(commonCSSContent)
		}

		if (!isThread) {
			return
		}
		const threadCSSContents = [
			".p-workspace__primary_view{ visibility: hidden;} .p-workspace__sidebar{ visibility: hidden; }",
			`.p-workspace-layout .p-workspace__secondary_view { width: ${ColumnWidth}px; }`,
			".p-threads_footer__input_container {min-height: 0px !important}",
			"button[data-qa='close_flexpane']{visibility: hidden;}",
		]

		for (const threadCSSContent of threadCSSContents) {
			void browserView.webContents.insertCSS(threadCSSContent)
		}
	}
}