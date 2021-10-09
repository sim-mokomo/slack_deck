import {AddSlackColumnRequest} from "../connection/add-slack-column-request";
import {ReloadAppRequest} from "../connection/reload-app-request";

declare global {
	interface Window {
		api: SandBox
	}
}

export interface SandBox {
	onInitializeIndexR2M: () => void
	addSlackColumnM2R: (listener: (requestList: AddSlackColumnRequest[]) => void) => void
	addSlackColumnR2M: (url: string,) => void
	removeSlackColumnR2M: (id: number) => void
	onAddedSlackColumnR2M: (url: string) => void
	updateSlackColumnPositionM2R: (listener: () => void) => void
	updateSlackColumnPositionR2M: (columnRectangleList: Electron.Rectangle[]) => void
	reloadAppR2M: () => void
	reloadAppM2R : (receiver: (request: ReloadAppRequest) => void) => void
	addWorkspaceIconM2R:(receiver: (workspaceIdList:string[]) => void) => void
	onClickedWorkspaceIconR2M: (workspaceId:string) => void
}
