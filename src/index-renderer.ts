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

	removeAll(){
		// todo: viewと分離させる
		this.columnViews = []
	}
}

class SlackColumnView
{
	private readonly webviewItemDOM : HTMLDivElement
	private readonly headerDOM : HTMLDivElement
	private readonly id : number

	constructor(id:number, closeAction: (self:SlackColumnView) => void) {
		this.webviewItemDOM = document.createElement("div")
		this.webviewItemDOM.setAttribute("class", "webview-item")
		this.headerDOM = document.createElement("div")
		this.headerDOM.setAttribute("class", "slack-column-header")
		this.webviewItemDOM.appendChild(this.headerDOM)

		this.id = id
		if(id == 0){
			// todo: widthを設定から変えることができるように
			this.webviewItemDOM.setAttribute("style", "min-width:800px;")
		}else{
			this.webviewItemDOM.setAttribute("style", "min-width:400px;")

			const closeButtonDOM = document.createElement("button")
			closeButtonDOM.setAttribute("type", "button")
			closeButtonDOM.setAttribute("class", "slack-column-header-close-button")
			const closeButtonIconDivDOM = document.createElement("div")
			closeButtonIconDivDOM.setAttribute("class", "fas fa-times")
			closeButtonDOM.appendChild(closeButtonIconDivDOM)
			closeButtonDOM.addEventListener("click", () => closeAction(this))
			this.headerDOM.appendChild(closeButtonDOM)
		}
	}

	getDOM(){return this.webviewItemDOM}
	getId(){return this.id}
	isHomeColumn() : boolean { return this.id == 0}
	getHeaderHeight(){
		return this.headerDOM.getBoundingClientRect().height
	}
}

const slackWorkspaceView = new SlackWorkspaceViewModel()

window.onload = () => {
	window.addEventListener("scroll", ()=>{
		updateSlackColumnPositionReply()
	})

	// note: カラム追加
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
		AddSlackColumn(url, id)
	})

	window.api.UpdateSlackColumnPositionRequest(()=>{
		updateSlackColumnPositionReply()
	})

	// note: 表示リロード
	const reloadWorkspaceButtonDOM = document.getElementById("reload-workspace-button")
	if(reloadWorkspaceButtonDOM != null){
		reloadWorkspaceButtonDOM.addEventListener("click", () => {
			window.api.ReloadWorkspaceRequest()
			// todo: リロードリプライをもらって表示を更新する
		})
	}

	window.api.ReloadWorkspaceReply((urlList:string[], idList:number[]) => {
		const webViewContainerDOM = document.getElementsByClassName("webview-container")[0]
		while(webViewContainerDOM.firstChild){
			webViewContainerDOM.removeChild(webViewContainerDOM.firstChild)
		}
		slackWorkspaceView.removeAll()
		
		for (let i = 0; i < idList.length; i++) {
			AddSlackColumn(urlList[i], idList[i])
		}

		updateSlackColumnPositionReply()
	})

	window.api.InitIndex()
}

function AddSlackColumn(url:string , id:number){
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
		const y = x.isHomeColumn() ?
			rect.y:
			rect.y + x.getHeaderHeight()
		const height = x.isHomeColumn() ?
			rect.height:
			rect.height - x.getHeaderHeight()
		xPosList.push(rect.x)
		yPosList.push(y)
		widthList.push(rect.width)
		heightList.push(height)
	})
	console.log(xPosList)
	console.log(yPosList)
	console.log(widthList)
	console.log(heightList)
	return [xPosList,yPosList,widthList,heightList]
}