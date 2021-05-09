import {BrowserWindow, BrowserView, shell} from "electron"
import { app } from "electron"
import { IndexMainProcess } from "./index-main"
import path = require("path")


void app.whenReady().then(() => {
	const rootWindow = new BrowserWindow({
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "index-preload.js"),
		},
	})
	const indexMainProcess = new IndexMainProcess(rootWindow)
	indexMainProcess.init()

	void rootWindow.loadFile("src/index.html")

	app.on("window-all-closed", () => {
		app.quit()
	})
})
