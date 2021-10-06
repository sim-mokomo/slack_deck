declare global {
	interface Window {
		api: SandBox
	}
}

export interface SandBox {
	onInitializeIndexR2M: () => void
	addSlackColumnM2R: (listener: (url: string[], id: number[]) => void) => void
	addSlackColumnR2M: (url: string,) => void
	removeSlackColumnR2M: (id: number) => void
	onAddedSlackColumnR2M: (url: string) => void
	updateSlackColumnPositionM2R: (listener: () => void) => void
	updateSlackColumnPositionR2M: (xPosList: number[], yPosList: number[], widthList: number[], heightList: number[]) => void
	reloadAppR2M: () => void
	reloadAppM2R : (receiver: (urlList:string[], idList: number[]) => void) => void
	addWorkspaceIconM2R:(receiver: (workspaceIdList:string[]) => void) => void
	onClickedWorkspaceIconR2M: (workspaceId:string) => void
}
