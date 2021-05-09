import {ipcRenderer} from "electron";

const slackColumnViewDOMs : HTMLDivElement[] = []

window.onload = () => {
	const addColumnConfirmButtonDOM = document.getElementById(
		"add-column-confirm-button",
	)
	if (addColumnConfirmButtonDOM != null) {
		addColumnConfirmButtonDOM.addEventListener("click", () => {
			const addColumnInputDOM: HTMLInputElement = <HTMLInputElement>(
				document.getElementById("add-column-input")
			)
			if (addColumnInputDOM == null) {
				return
			}
			window.api.AddSlackColumnRequest(addColumnInputDOM.value)
			addColumnInputDOM.value = ""
		})
	}

	window.api.AddSlackColumnReply((url: string, id: number) => {
		const webViewItemDiv = document.createElement("div")
		webViewItemDiv.setAttribute("class", "webview-item")

		const closeButtonDOM = document.createElement("button")
		closeButtonDOM.setAttribute("type", "button")
		const closeButtonIconDivDOM = document.createElement("div")
		closeButtonIconDivDOM.setAttribute("class", "fas fa-times")
		closeButtonDOM.appendChild(closeButtonIconDivDOM)
		webViewItemDiv.appendChild(closeButtonDOM)

		const webviewContainerDOM = document.getElementsByClassName("webview-container",)[0]
		closeButtonDOM.addEventListener("click", () => {
			window.api.RemoveSlackColumnRequest(id)
			webviewContainerDOM.removeChild(webViewItemDiv)
		})

		slackColumnViewDOMs.push(webViewItemDiv)
		webviewContainerDOM.appendChild(webViewItemDiv)

		window.api.OnFinishedSlackColumn(url)
	})

	window.api.UpdateSlackColumnPositionRequest(()=>{
		const xPosList :number[] = []
		const yPosList :number[] = []
		slackColumnViewDOMs.forEach(x => {
			const rect = x.getBoundingClientRect()
			xPosList.push(rect.x)
			yPosList.push(rect.y)
		})
		window.api.UpdateSlackColumnPositionResponse(xPosList,yPosList)
	})

	window.api.InitIndex()
}
