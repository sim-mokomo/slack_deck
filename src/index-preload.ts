import { ipcRenderer, contextBridge } from "electron"
import {AddSlackColumnReply} from "./add-slack-column-reply";

contextBridge.exposeInMainWorld("api", {
	InitIndex: () => ipcRenderer.send("init-index"),
	AddSlackColumnReply: (listener: (url: string, id: number) => void) => {
		ipcRenderer.on("add-slack-column-reply", (event, arg) => {
			const responses: AddSlackColumnReply[] = []
			Object.assign(responses, JSON.parse(arg))

			for (const response of responses) {
				listener(response.url, response.id)
			}
		})
	},
	AddSlackColumnRequest: (url: string) => {
		ipcRenderer.send("add-column-main-request", url)
	},
	RemoveSlackColumnRequest: (id: number) => {
		ipcRenderer.send("remove-slack-column", id)
	},
	OnFinishedSlackColumn: (url: string) => {
		ipcRenderer.send("on-finished-slack-column", url)
	},
	UpdateSlackColumnPositionRequest: (listener:()=>void) => {
		ipcRenderer.on("update-slack-column-position-request", () => {
			listener()
		})
	},
	UpdateSlackColumnPositionResponse: (xPosList:number[], yPosList:number[]) => {
		ipcRenderer.send("update-slack-column-position-response", xPosList,yPosList)
	}
})
