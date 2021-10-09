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
	private readonly columnBodyDOM : HTMLDivElement
	private readonly id : number

	constructor(id:number, closeAction: (self:SlackColumnView) => void) {
		this.id = id
		this.webviewItemDOM = document.createElement("div")
		this.webviewItemDOM.setAttribute("class", "webview-item")
		this.headerDOM = document.createElement("div")
		this.headerDOM.setAttribute("class", "slack-column-header")
		this.columnBodyDOM = document.createElement("div")
		this.columnBodyDOM.setAttribute("class", "slack-column-body")
		if(this.isHomeColumn()){
			// todo: widthを設定から変えることができるように
			this.webviewItemDOM.setAttribute("style", "min-width:800px;")
			this.webviewItemDOM.appendChild(this.columnBodyDOM)
		}else{
			this.webviewItemDOM.appendChild(this.headerDOM)
			this.webviewItemDOM.appendChild(this.columnBodyDOM)
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
	getColumnBodyDOM(){return this.columnBodyDOM}
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
			window.api.addSlackColumnR2M(addColumnInputDOM.value)
			addColumnInputDOM.value = ""
		})
	}

	window.api.addSlackColumnM2R(requestList  => {
		requestList.forEach(x => {
			AddSlackColumn(x.columnViewInfo.url, x.columnViewInfo.id)
		})
	})

	window.api.updateSlackColumnPositionM2R(()=>{
		updateSlackColumnPositionReply()
	})

	// note: 表示リロード
	const reloadWorkspaceButtonDOM = document.getElementById("reload-workspace-button")
	if(reloadWorkspaceButtonDOM != null){
		reloadWorkspaceButtonDOM.addEventListener("click", () => {
			window.api.reloadAppR2M()
			// todo: リロードリプライをもらって表示を更新する
		})
	}

	window.api.reloadAppM2R(request => {
		const webViewContainerDOM = document.getElementsByClassName("webview-container")[0]
		while(webViewContainerDOM.firstChild){
			webViewContainerDOM.removeChild(webViewContainerDOM.firstChild)
		}
		slackWorkspaceView.removeAll()

		request.columnViewInfoList.forEach(x => {
			AddSlackColumn(x.url, x.id)
		})

		updateSlackColumnPositionReply()
	})

	// note: workspace切り替えアイコン
	window.api.addWorkspaceIconM2R(workspaceIdList => {
		const workspaceIconContainer = document.getElementsByClassName("workspace-icon-container")[0]
		for (const workspaceId of workspaceIdList) {
			const workspaceIconButtonDOM = document.createElement("button")
			workspaceIconButtonDOM.innerText = workspaceId
			workspaceIconButtonDOM.addEventListener("click", () => {
				window.api.onClickedWorkspaceIconR2M(workspaceId)
			})
			workspaceIconContainer.appendChild(workspaceIconButtonDOM)
		}
	})

	window.api.onInitializeIndexR2M()
}

function AddSlackColumn(url:string , id:number){
	const webviewContainerDOM = document.getElementsByClassName("webview-container",)[0]
	const column = new SlackColumnView(id, (self) => {
		const column = slackWorkspaceView.getColumn(self.getId())
		if(column != null){
			window.api.removeSlackColumnR2M(self.getId())
			slackWorkspaceView.removeColumn(self.getId())
			webviewContainerDOM.removeChild(self.getDOM())
			updateSlackColumnPositionReply()
		}
	})

	slackWorkspaceView.addColumn(column)
	webviewContainerDOM.appendChild(column.getDOM())

	window.api.onAddedSlackColumnR2M(url)
}

function updateSlackColumnPositionReply() {
	window.api.updateSlackColumnPositionR2M(getSlackColumnViewDomRects())
}

function getSlackColumnViewDomRects() : Electron.Rectangle[] {
	const columnRectangleList = slackWorkspaceView.getColumns().map(x => {
		const rect = x.getColumnBodyDOM().getBoundingClientRect()
		return {
			x: Math.round(rect.x),
			y: Math.round(rect.y),
			width: Math.round(rect.width),
			height: Math.round(rect.height)
		}
	})
	return columnRectangleList
}