import { ipcRenderer, shell, contextBridge } from "electron"
import { AddSlackColumnResponse } from "./index-main"

contextBridge.exposeInMainWorld("api", {
	InitIndex: () => ipcRenderer.send("init-index"),
	AddSlackColumnReply: (listener: (url: string, id: number) => void) => {
		ipcRenderer.on("add-slack-column-reply", (event, arg) => {
			const responses: AddSlackColumnResponse[] = []
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
	OpenBrowser: (url: string) => {
		void shell.openExternal(url)
	},
})
