class SlackWorkspaceViewModel
{
	private columnViewModels : SlackColumnViewModel[] = []

	getColumns() { return this.columnViewModels }

	addColumn(columnModel: SlackColumnViewModel){
		this.columnViewModels.push(columnModel)
	}

	getColumn(id:number){
		return this.columnViewModels.find(x => x.id == id)
	}

	removeColumn(id:number){
		this.columnViewModels = this.columnViewModels.filter(x => x.id != id)
	}
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

const slackWorkspaceViewModel = new SlackWorkspaceViewModel()

window.onload = () => {
	window.addEventListener("scroll", ()=>{
		updateSlackColumnPositionReply()
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
			const column = slackWorkspaceViewModel.getColumn(id)
			if(column != null){
				window.api.RemoveSlackColumnRequest(id)
				slackWorkspaceViewModel.removeColumn(id)
				webviewContainerDOM.removeChild(column.dom)
				updateSlackColumnPositionReply()
			}
		})

		slackWorkspaceViewModel.addColumn(new SlackColumnViewModel(webViewItemDiv, id))
		webviewContainerDOM.appendChild(webViewItemDiv)

		window.api.OnAddedSlackColumn(url)
	})

	window.api.UpdateSlackColumnPositionRequest(()=>{
		updateSlackColumnPositionReply()
	})

	window.api.InitIndex()
}

function updateSlackColumnPositionReply() {
	const [xPosList,yPosList,widthList,heightList] = getSlackColumnViewDomRects()
	window.api.UpdateSlackColumnPositionReply(
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
	slackWorkspaceViewModel.getColumns().forEach(x => {
		const rect = x.dom.getBoundingClientRect()
		xPosList.push(rect.x)
		yPosList.push(rect.y)
		widthList.push(rect.width)
		heightList.push(rect.height)
	})
	return [xPosList,yPosList,widthList,heightList]
}