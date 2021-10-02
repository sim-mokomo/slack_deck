class SlackWorkspaceViewModel
{
	private columnViews : SlackColumnView[] = []

	getColumns() { return this.columnViews }

	addColumn(columnModel: SlackColumnView){
		this.columnViews.push(columnModel)
	}

	getColumn(id:number){
		return this.columnViews.find(x => x.getId() == id)
	}

	removeColumn(id:number){
		this.columnViews = this.columnViews.filter(x => x.getId() != id)
	}
}

class SlackColumnView
{
	private readonly webviewItemDOM : HTMLDivElement
	private readonly id : number

	constructor(id:number, closeAction: (self:SlackColumnView) => void) {
		this.webviewItemDOM = document.createElement("div")
		this.webviewItemDOM.setAttribute("class", "webview-item")

		this.id = id
		console.log(`[WEB] ${this.id}`)
		if(id == 0){
			this.webviewItemDOM.setAttribute("style", "min-width:800px;")
		}else{
			this.webviewItemDOM.setAttribute("style", "min-width:400px;")

			const closeButtonDOM = document.createElement("button")
			closeButtonDOM.setAttribute("type", "button")
			const closeButtonIconDivDOM = document.createElement("div")
			closeButtonIconDivDOM.setAttribute("class", "fas fa-times")
			closeButtonDOM.appendChild(closeButtonIconDivDOM)
			closeButtonDOM.addEventListener("click", () => closeAction(this))
			this.webviewItemDOM.appendChild(closeButtonDOM)
		}
	}

	getDOM(){return this.webviewItemDOM}
	getId(){return this.id}
}

const slackWorkspaceView = new SlackWorkspaceViewModel()

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
		const webviewContainerDOM = document.getElementsByClassName("webview-container",)[0]
		const column = new SlackColumnView(id, (self) => {
			const column = slackWorkspaceView.getColumn(self.getId())
			if(column != null){
				window.api.RemoveSlackColumnRequest(self.getId())
				slackWorkspaceView.removeColumn(self.getId())
				webviewContainerDOM.removeChild(self.getDOM())
				updateSlackColumnPositionReply()
			}
		})

		slackWorkspaceView.addColumn(column)
		webviewContainerDOM.appendChild(column.getDOM())

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
	slackWorkspaceView.getColumns().forEach(x => {
		const rect = x.getDOM().getBoundingClientRect()
		xPosList.push(rect.x)
		yPosList.push(rect.y)
		widthList.push(rect.width)
		heightList.push(rect.height)
	})
	return [xPosList,yPosList,widthList,heightList]
}