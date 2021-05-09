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
	OnFinishedSlackColumn: (url: string) => void
	UpdateSlackColumnPositionRequest: (listener:()=>void) => void
	UpdateSlackColumnPositionResponse: (xPosList:number[], yPosList:number[]) => void
}
