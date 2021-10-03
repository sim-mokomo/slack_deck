declare global {
	interface Window {
		api: SandBox
	}
}

export interface SandBox {
	InitIndex: () => void
	AddSlackColumnReply: (listener: (url: string, id: number) => void) => void
	AddSlackColumnRequest: (url: string,) => void
	RemoveSlackColumnRequest: (id: number) => void
	OnAddedSlackColumn: (url: string) => void
	UpdateSlackColumnPositionRequest: (listener: () => void) => void
	UpdateSlackColumnPositionReply: (xPosList: number[], yPosList: number[], widthList: number[], heightList: number[]) => void
	ReloadWorkspaceRequest: () => void
	ReloadWorkspaceReply : (receiver: (urlList:string[], idList: number[]) => void) => void
}
