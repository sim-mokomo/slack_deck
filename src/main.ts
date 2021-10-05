import {BrowserWindow} from "electron"
import { app } from "electron"
import { IndexMainProcess } from "./index/index-main"
import path = require("path")

void app.whenReady().then(() => {
	const rootWindow = new BrowserWindow({
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "index/index-preload.js"),
		},
	})
	const indexMainProcess = new IndexMainProcess(rootWindow)
	indexMainProcess.init()

	void rootWindow.loadFile(path.join(__dirname, "index/index.html"))

	app.on("window-all-closed", () => {
		app.quit()
	})
})
