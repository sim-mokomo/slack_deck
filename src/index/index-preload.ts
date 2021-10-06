import { ipcRenderer, contextBridge } from "electron"
import {AddSlackColumnRequest} from "../add-slack-column-request";
import {AddWorkspaceIconRequest} from "../add-workspace-icon-request";
import {ChannelDefine} from "../channel-define";

contextBridge.exposeInMainWorld("api", {
	InitIndex: () => ipcRenderer.send(ChannelDefine.onInitializeIndexR2M),
	AddSlackColumnReply: (listener: (url: string, id: number) => void) => {
		ipcRenderer.on(ChannelDefine.addSlackColumnM2R, (event, arg) => {
			const responses: AddSlackColumnRequest[] = []
			Object.assign(responses, JSON.parse(arg))

			for (const response of responses) {
				listener(response.url, response.id)
			}
		})
	},
	AddSlackColumnRequest: (url: string) => {
		ipcRenderer.send(ChannelDefine.addSlackColumnR2M, url)
	},
	RemoveSlackColumnRequest: (id: number) => {
		ipcRenderer.send(ChannelDefine.removeSlackColumnR2M, id)
	},
	OnAddedSlackColumn: (url: string) => {
		ipcRenderer.send(ChannelDefine.onAddedSlackColumnR2M, url)
	},
	UpdateSlackColumnPositionRequest: (listener:()=>void) => {
		ipcRenderer.on(ChannelDefine.updateSlackColumnPositionM2R, () => {
			listener()
		})
	},
	UpdateSlackColumnPositionReply: (xPosList:number[], yPosList:number[], widthList:number[], heightList:number[]) => {
		ipcRenderer.send(ChannelDefine.updateSlackColumnPositionR2M, xPosList,yPosList,widthList,heightList)
	},
	ReloadWorkspaceRequest: () => {
		ipcRenderer.send(ChannelDefine.reloadAppR2M);
	},
	ReloadWorkspaceReply: (receiver: (urlList: string[], idList: number[]) => void) => {
		ipcRenderer.on(ChannelDefine.reloadAppM2R, (event, arg) => {
			const responses: AddSlackColumnRequest[] = []
			Object.assign(responses, JSON.parse(arg))

			const urlList = responses.map(x => x.url)
			const idList = responses.map(x => x.id)
			receiver(urlList, idList)
		})
	},
	AddWorkspaceIconRequestM2R: (receiver: (workspaceIdList:string[]) => void) => {
		ipcRenderer.on(ChannelDefine.addWorkspaceIconM2R, (event, arg) => {
			const responses : AddWorkspaceIconRequest[] = []
			Object.assign(responses, JSON.parse(arg))

			const workspaceIdList:string[] = responses.map(x => x.workspaceId)
			receiver(workspaceIdList)
		})
	},
	OnClickedWorkspaceIconR2M: (workspaceId:string) => {
		ipcRenderer.send(ChannelDefine.onClickedWorkspaceIconR2M, workspaceId)
	}
})
