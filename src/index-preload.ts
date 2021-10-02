import { ipcRenderer, contextBridge } from "electron"
import {AddSlackColumnRequest} from "./add-slack-column-request";

contextBridge.exposeInMainWorld("api", {
	InitIndex: () => ipcRenderer.send("init-index"),
	AddSlackColumnReply: (listener: (url: string, id: number) => void) => {
		ipcRenderer.on("add-column-reply", (event, arg) => {
			const responses: AddSlackColumnRequest[] = []
			Object.assign(responses, JSON.parse(arg))

			for (const response of responses) {
				listener(response.url, response.id)
			}
		})
	},
	AddSlackColumnRequest: (url: string) => {
		ipcRenderer.send("add-column-request", url)
	},
	RemoveSlackColumnRequest: (id: number) => {
		ipcRenderer.send("remove-column-request", id)
	},
	OnAddedSlackColumn: (url: string) => {
		ipcRenderer.send("on-added-column", url)
	},
	UpdateSlackColumnPositionRequest: (listener:()=>void) => {
		ipcRenderer.on("update-column-position-request", () => {
			listener()
		})
	},
	UpdateSlackColumnPositionReply: (xPosList:number[], yPosList:number[], widthList:number[], heightList:number[]) => {
		ipcRenderer.send("update-column-position-reply", xPosList,yPosList,widthList,heightList)
	}
})
