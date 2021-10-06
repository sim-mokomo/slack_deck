import { ipcRenderer, contextBridge } from "electron"
import {AddSlackColumnRequest} from "../connection/add-slack-column-request";
import {AddWorkspaceIconRequest} from "../connection/add-workspace-icon-request";
import {ChannelDefine} from "../connection/channel-define";

contextBridge.exposeInMainWorld("api", {
	onInitializeIndexR2M: () => ipcRenderer.send(ChannelDefine.onInitializeIndexR2M),
	addSlackColumnM2R: (listener: (urlList: string[], idList: number[]) => void) => {
		ipcRenderer.on(ChannelDefine.addSlackColumnM2R, (event, arg) => {
			const responses: AddSlackColumnRequest[] = []
			Object.assign(responses, JSON.parse(arg))
			const urlList = responses.map(x => x.url)
			const idList = responses.map(x => x.id)
			listener(urlList, idList)
		})
	},
	addSlackColumnR2M: (url: string) => {
		ipcRenderer.send(ChannelDefine.addSlackColumnR2M, url)
	},
	removeSlackColumnR2M: (id: number) => {
		ipcRenderer.send(ChannelDefine.removeSlackColumnR2M, id)
	},
	onAddedSlackColumnR2M: (url: string) => {
		ipcRenderer.send(ChannelDefine.onAddedSlackColumnR2M, url)
	},
	updateSlackColumnPositionM2R: (listener:()=>void) => {
		ipcRenderer.on(ChannelDefine.updateSlackColumnPositionM2R, () => {
			listener()
		})
	},
	updateSlackColumnPositionR2M: (xPosList:number[], yPosList:number[], widthList:number[], heightList:number[]) => {
		ipcRenderer.send(ChannelDefine.updateSlackColumnPositionR2M, xPosList,yPosList,widthList,heightList)
	},
	reloadAppR2M: () => {
		ipcRenderer.send(ChannelDefine.reloadAppR2M);
	},
	reloadAppM2R: (receiver: (urlList: string[], idList: number[]) => void) => {
		ipcRenderer.on(ChannelDefine.reloadAppM2R, (event, arg) => {
			const responses: AddSlackColumnRequest[] = []
			Object.assign(responses, JSON.parse(arg))

			const urlList = responses.map(x => x.url)
			const idList = responses.map(x => x.id)
			receiver(urlList, idList)
		})
	},
	addWorkspaceIconM2R: (receiver: (workspaceIdList:string[]) => void) => {
		ipcRenderer.on(ChannelDefine.addWorkspaceIconM2R, (event, arg) => {
			const responses : AddWorkspaceIconRequest[] = []
			Object.assign(responses, JSON.parse(arg))

			const workspaceIdList:string[] = responses.map(x => x.workspaceId)
			receiver(workspaceIdList)
		})
	},
	onClickedWorkspaceIconR2M: (workspaceId:string) => {
		ipcRenderer.send(ChannelDefine.onClickedWorkspaceIconR2M, workspaceId)
	}
})
