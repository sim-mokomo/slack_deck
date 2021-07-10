const slackColumnViewModels : SlackColumnViewModel[] = []

window.onload = () => {
	window.addEventListener("scroll", ()=>{
		requestSlackColumnPosUpdate()
	})

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
			const removeViewModelIndex = slackColumnViewModels.findIndex(x => x.id == id)
			const slackColumnViewModel = slackColumnViewModels[removeViewModelIndex]
			slackColumnViewModels.splice(removeViewModelIndex, 1)
			webviewContainerDOM.removeChild(slackColumnViewModel.dom)
			requestSlackColumnPosUpdate()
		})

		slackColumnViewModels.push(new SlackColumnViewModel(webViewItemDiv, id))
		webviewContainerDOM.appendChild(webViewItemDiv)

		window.api.OnAddedSlackColumn(url)
	})

	window.api.UpdateSlackColumnPositionRequest(()=>{
		requestSlackColumnPosUpdate()
	})

	window.api.InitIndex()
}

class SlackColumnViewModel
{
	dom : HTMLDivElement
	id : number

	constructor(dom:HTMLDivElement, id:number) {
		this.dom = dom
		this.id = id
	}
}

function requestSlackColumnPosUpdate() {
	const [xPosList,yPosList,widthList,heightList] = getSlackColumnViewDomRects()
	window.api.UpdateSlackColumnPositionResponse(
		xPosList,
		yPosList,
		widthList,
		heightList)
}

function getSlackColumnViewDomRects() : [number[], number[], number[], number[]]{
	const xPosList :number[] = []
	const yPosList :number[] = []
	const widthList :number[] = []
	const heightList :number[] = []
	slackColumnViewModels.forEach(x => {
		const rect = x.dom.getBoundingClientRect()
		xPosList.push(rect.x)
		yPosList.push(rect.y)
		widthList.push(rect.width)
		heightList.push(rect.height)
	})
	return [xPosList,yPosList,widthList,heightList]
}