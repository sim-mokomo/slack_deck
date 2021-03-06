import {ipcMain, shell, BrowserWindow, IpcMainEvent, app} from "electron"
import {AppConfig, WorkspaceColumnConfig, WorkspaceConfig} from "../app-config/app-config"
import { SlackService } from "../slack/slack-service"
import {AddSlackColumnRequest} from "../connection/add-slack-column-request";
import {AppConfigRepository} from "../app-config/app-config-repository";
import {SlackWorkspaceModel} from "../slack/workspace/slack-workspace-model";
import {SlackColumnModel} from "../slack/column/slack-column-model";
import {SlackColumnBrowserView} from "../slack/column/slack-column-browser-view";
import {SlackColumnBrowserViewInfo} from "../slack/column/slack-column-browser-view-info";
import {AddWorkspaceIconRequest} from "../connection/add-workspace-icon-request";
import {ChannelDefine} from "../connection/channel-define";
import {SlackColumnHtmlViewInfo} from "../slack/column/slack-column-html-view-info";
import {ReloadAppRequest} from "../connection/reload-app-request";
import {WorkspaceIconHtmlViewInfo} from "../slack/workspace/workspace-icon-html-view-info";
const AppConfigFileName = "appconfig.json"

export class IndexMainProcess {
	workspaceModel : SlackWorkspaceModel
	slackColumnViewList :  SlackColumnBrowserView[] = []
	rootWindow : BrowserWindow
	currentWorkspaceId  = ""

	constructor(rootWindow:BrowserWindow) {
		const appConfigRepository = new AppConfigRepository()
		if(!appConfigRepository.exists(AppConfigFileName)){
			appConfigRepository.save(AppConfigFileName,  AppConfig.default)
		}

		this.currentWorkspaceId = appConfigRepository.load(AppConfigFileName).current_workspace_id

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
		ipcMain.on(ChannelDefine.onInitializeIndexR2M, (event) => {
			const appConfig = new AppConfigRepository().load(AppConfigFileName)
			{
				// ワークスペースアイコン追加
				const requests =
						appConfig
						.getWorkspaceConfigs()
						.map(x => {
							return new AddWorkspaceIconRequest(
								x.workspace_id
							)
						})
				this.addWorkspaceIconsReply(event, requests)
			}

			{
				// カラム表示
				const workspaceConfig = appConfig.findWorkspaceConfigById(this.currentWorkspaceId)
				if(workspaceConfig == null){
					return
				}

				const requests = workspaceConfig.columns.map(
					x => new AddSlackColumnRequest({
							columnViewInfo: {
								url: SlackService.getWebViewURL(workspaceConfig.workspace_id, x.channel_id, x.thread_ts),
								id: x.id
							}
						}
					)
				)

				this.addSlackColumnReply(event, requests)
			}
		})

		ipcMain.on(ChannelDefine.addSlackColumnR2M, (event, arg) => {
			const appConfigRepository = new AppConfigRepository()
			const appConfig = appConfigRepository.load(AppConfigFileName)
			const workSpaceConfig = appConfig.findWorkspaceConfigById(this.currentWorkspaceId)
			if(workSpaceConfig == null){
				return
			}

			const url: string = <string>arg
			const [channelId, threadTs] = SlackService.parseUrl(url)
			const columnId = workSpaceConfig.columns.length
			appConfig.addWorkspaceColumnConfig(
				workSpaceConfig.workspace_id,
				new WorkspaceColumnConfig(
					columnId,
					channelId,
					threadTs,
				),
			)
			appConfigRepository.save(AppConfigFileName, appConfig)

			const request = new AddSlackColumnRequest({
								columnViewInfo:{
									url: SlackService.getWebViewURL(workSpaceConfig.workspace_id,  channelId,  threadTs),
									id: columnId
								}
							})
			this.addSlackColumnReply(event, [request])
		})

		ipcMain.on(ChannelDefine.removeSlackColumnR2M, (event, arg) => {
			const id = <number>arg
			this.workspaceModel.removeColumn(id)

			const appConfigRepository = new AppConfigRepository()
			const appConfig = appConfigRepository.load(AppConfigFileName)
			const workspaceConfig = appConfig.findWorkspaceConfigById(this.currentWorkspaceId)
			if(workspaceConfig == null){
				return
			}

			appConfig.removeWorkspaceColumnConfig(workspaceConfig.workspace_id, id)
			appConfigRepository.save(AppConfigFileName, appConfig)
		})

		ipcMain.on(ChannelDefine.onAddedSlackColumnR2M, (ipcMainEvent, url) => {
			const columnId = this.workspaceModel.getColumnNum()
			const columnViewInfo = new SlackColumnBrowserViewInfo(
					columnId,
					url
			)
			const slackColumnView = new SlackColumnBrowserView(columnViewInfo, this.rootWindow)
			const slackColumnModel = new SlackColumnModel(columnId)
			slackColumnModel.onChangedSize = (columnRect) => {
				slackColumnView.setSize(columnRect)
			}
			this.workspaceModel.addColumn(slackColumnModel)
			this.slackColumnViewList.push(slackColumnView);
			this.onChangedSlackColumn()
		})

		ipcMain.on(ChannelDefine.updateSlackColumnPositionR2M, (event, rectangleList: Electron.Rectangle[]) => {
			this.workspaceModel.getColumns().forEach((column, i) => {
				column.setSize(rectangleList[i])
			})
		})

		ipcMain.on(ChannelDefine.reloadAppR2M, (event) => {
			this.reloadAppByAppConfig(event, new AppConfigRepository().load(AppConfigFileName))
		})

		ipcMain.on(ChannelDefine.onClickedWorkspaceIconR2M, (event, arg) => {
			const workspaceId = <string>(arg)
			const appConfig = new AppConfigRepository().load(AppConfigFileName)
			const workspaceConfig = appConfig.findWorkspaceConfigById(workspaceId)
			if(workspaceConfig != null){
				this.currentWorkspaceId = workspaceId
				appConfig.current_workspace_id = this.currentWorkspaceId
				new AppConfigRepository().save(AppConfigFileName, appConfig)
				this.reloadAppByAppConfig(event , appConfig)
			}
		})
	}

	onChangedWindow():void{
		this.updateSlackColumnPositionRequest()
	}

	onChangedSlackColumn():void{
		this.updateSlackColumnPositionRequest()
	}

	addSlackColumnReply(event: IpcMainEvent, requests: AddSlackColumnRequest[],): void {
		event.sender.send(ChannelDefine.addSlackColumnM2R, JSON.stringify(requests))
	}
	updateSlackColumnPositionRequest() : void {
		this.rootWindow.webContents.send(ChannelDefine.updateSlackColumnPositionM2R)
	}
	reloadAppM2R(event: IpcMainEvent, request : ReloadAppRequest) :void {
		event.sender.send(ChannelDefine.reloadAppM2R, JSON.stringify(request))
	}

	addWorkspaceIconsReply(event:IpcMainEvent, requests: AddWorkspaceIconRequest[]) : void {
		event.sender.send(ChannelDefine.addWorkspaceIconM2R, JSON.stringify(requests))
	}

	reloadAppByAppConfig(event:IpcMainEvent, appConfig:AppConfig){
		// note: ModelとBrowserViewの解放
		this.workspaceModel.removeAll()
		const workspaceConfig =
			new AppConfigRepository()
				.load(AppConfigFileName)
				.findWorkspaceConfigById(this.currentWorkspaceId)
		if(workspaceConfig == null){
			return
		}

		const workspaceIconHtmlViewInfos : WorkspaceIconHtmlViewInfo[] =
			appConfig.workspaces.map(x =>  new WorkspaceIconHtmlViewInfo({
				workspaceId: x.workspace_id,
				// todo: ワークスペース切り替えボタン、アイコン表示できるように
				iconUrl: ""
			}))
		const request = new ReloadAppRequest({
			columnViewInfoList: workspaceConfig.columns.map(x => {
				return new SlackColumnHtmlViewInfo({
					id: x.id,
					url: SlackService.getWebViewURL(workspaceConfig.workspace_id, x.channel_id, x.thread_ts)
				})
			}),
			workspaceIconInfoList: workspaceIconHtmlViewInfos
		})
		this.reloadAppM2R(event, request)
	}
}