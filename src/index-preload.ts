import { ipcRenderer, contextBridge } from "electron"
import {AddSlackColumnRequest} from "./add-slack-column-request";

contextBridge.exposeInMainWorld("api", {
	InitIndex: () => ipcRenderer.send("init-index"),
	AddSlackColumnReply: (listener: (url: string, id: number) => void) => {
		ipcRenderer.on("add-slack-column-reply", (event, arg) => {
			const responses: AddSlackColumnRequest[] = []
			Object.assign(responses, JSON.parse(arg))

			for (const response of responses) {
				listener(response.url, response.id)
			}
		})
	},
	AddSlackColumnRequest: (url: string) => {
		ipcRenderer.send("add-slack-column-request", url)
	},
	RemoveSlackColumnRequest: (id: number) => {
		ipcRenderer.send("remove-slack-column-request", id)
	},
	OnAddedSlackColumn: (url: string) => {
		ipcRenderer.send("on-added-slack-column", url)
	},
	UpdateSlackColumnPositionRequest: (listener:()=>void) => {
		ipcRenderer.on("update-slack-column-position-request", () => {
			listener()
		})
	},
	UpdateSlackColumnPositionReply: (xPosList:number[], yPosList:number[], widthList:number[], heightList:number[]) => {
		ipcRenderer.send("update-slack-column-position-reply", xPosList,yPosList,widthList,heightList)
	}
})
