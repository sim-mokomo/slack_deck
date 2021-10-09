// todo: バンドラツールを使用してファイル分けを行えるようにする
class SlackWorkspaceHtmlView
{
	private columnViews : SlackColumnHtmlView[] = []
	private slackColumnContainerDOM : Element
	private readonly addColumnButtonDOM : HTMLButtonElement
	private readonly addColumnButtonInputDOM : HTMLInputElement
	private readonly reloadButtonDOM : HTMLButtonElement
	private readonly workspaceIconContainer : Element
	private readonly onClickedAddColumnButton : (url:string) => void
	private readonly onClickedReloadButton : () => void
	private readonly onClickedWorkspaceIcon : (workspaceId:string) => void

	constructor(
		document:Document,
		onClickedAddColumnButton : (url:string) => void,
		onClickedReloadButton : () => void,
		onClickedWorkspaceIcon : (workspaceId:string) => void) {
		this.slackColumnContainerDOM = document.getElementsByClassName("webview-container")[0]
		this.workspaceIconContainer = document.getElementsByClassName("workspace-icon-container")[0]
		this.onClickedAddColumnButton = onClickedAddColumnButton
		this.onClickedReloadButton = onClickedReloadButton
		this.onClickedWorkspaceIcon = onClickedWorkspaceIcon

		// note: カラム追加
		this.addColumnButtonDOM = (<HTMLButtonElement>document.getElementById("add-column-confirm-button"))
		this.addColumnButtonInputDOM = <HTMLInputElement>(document.getElementById("add-column-input"))
		this.addColumnButtonDOM.addEventListener("click", () => {
			this.onClickedAddColumnButton(this.addColumnButtonInputDOM.value)
			this.addColumnButtonInputDOM.value = ""
		})

		// note: 表示リロード
		this.reloadButtonDOM = (<HTMLButtonElement>document.getElementById("reload-workspace-button"))
		this.reloadButtonDOM.addEventListener("click", () => {
			this.onClickedReloadButton()
		})
	}

	addWorkspaceIcon(workspaceId: string) {
		const workspaceIconButtonDOM = document.createElement("button")
		workspaceIconButtonDOM.innerText = workspaceId
		workspaceIconButtonDOM.addEventListener("click", () => {
			this.onClickedWorkspaceIcon(workspaceId)
		})
		this.workspaceIconContainer.appendChild(workspaceIconButtonDOM)
	}

	getColumns() { return this.columnViews }

	addColumn(columnModel: SlackColumnHtmlView){
		this.columnViews.push(columnModel)
		this.slackColumnContainerDOM.appendChild(columnModel.getColumnContainerDOM())
	}

	getColumn(id:number){
		return this.columnViews.find(x => x.getId() == id)
	}

	removeColumn(id:number){
		const removeSlackColumn = this.columnViews.find(x => x.getId() == id)
		if(!removeSlackColumn){
			return
		}
		this.columnViews = this.columnViews.filter(x => x.getId() != id)
		this.slackColumnContainerDOM.removeChild(removeSlackColumn.getColumnContainerDOM())
	}

	removeAll(){
		this.columnViews = []
		while(this.slackColumnContainerDOM.firstChild){
			this.slackColumnContainerDOM.removeChild(this.slackColumnContainerDOM.firstChild)
		}
	}
}

class SlackColumnHtmlView
{
	private readonly webviewItemDOM : HTMLDivElement
	private readonly headerDOM : HTMLDivElement
	private readonly columnBodyDOM : HTMLDivElement
	private readonly id : number

	constructor(id:number, closeAction: (self:SlackColumnHtmlView) => void) {
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

	getColumnContainerDOM(){return this.webviewItemDOM}
	getColumnBodyDOM(){return this.columnBodyDOM}
	getId(){return this.id}
	isHomeColumn() : boolean { return this.id == 0}
}

window.onload = () => {
	const slackWorkspaceView
		= new SlackWorkspaceHtmlView(document,
			url => {
				window.api.addSlackColumnR2M(url)
			},
		() => {
			window.api.reloadAppR2M()
		},
		workspaceId => {
			window.api.onClickedWorkspaceIconR2M(workspaceId)
		})
	window.addEventListener("scroll", ()=>{
		updateSlackColumnPositionReply()
	})

	window.api.addSlackColumnM2R(requestList  => {
		requestList.forEach(x => {
			AddSlackColumn(x.columnViewInfo.url, x.columnViewInfo.id)
		})
	})
	window.api.addWorkspaceIconM2R(workspaceIdList => {
		workspaceIdList.forEach(id => slackWorkspaceView.addWorkspaceIcon(id))
	})

	window.api.updateSlackColumnPositionM2R(()=>{
		updateSlackColumnPositionReply()
	})

	window.api.reloadAppM2R(request => {
		slackWorkspaceView.removeAll()

		request.columnViewInfoList.forEach(x => {
			AddSlackColumn(x.url, x.id)
		})

		updateSlackColumnPositionReply()
	})

	window.api.onInitializeIndexR2M()

	function AddSlackColumn(url:string , id:number){
		const column = new SlackColumnHtmlView(id, (self) => {
			const column = slackWorkspaceView.getColumn(self.getId())
			if(column != null){
				window.api.removeSlackColumnR2M(self.getId())
				slackWorkspaceView.removeColumn(self.getId())
				updateSlackColumnPositionReply()
			}
		})

		slackWorkspaceView.addColumn(column)
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
}
