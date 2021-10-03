export class AppConfig {
	static default : AppConfig = new AppConfig()
	workspaces: WorkspaceConfig[] = []

	addWorkspaceColumnConfig(workspaceId: string, workspaceColumnConfig: WorkspaceColumnConfig): void {
		const workspaceConfig = this.findWorkspaceConfigById(workspaceId)
		if(workspaceConfig != null){
			workspaceConfig.columns.push(workspaceColumnConfig)
		}
	}

	removeWorkspaceColumnConfig(workspaceId: string, columnId: number): void {
		const workspaceConfig = this.findWorkspaceConfigById(workspaceId)
		if(workspaceConfig != null) {
			workspaceConfig.columns = workspaceConfig.columns.filter(x => x.id != columnId)
		}
	}

	findWorkspaceConfigById(workspaceId:string) : WorkspaceConfig | null {
		const index = this.workspaces.findIndex(x => x.workspace_id == workspaceId)
		if(index < 0){
			return null
		}

		return this.workspaces[index]
	}

	getWorkspaceConfigs(){
		return this.workspaces
	}
}


export class WorkspaceConfig {
	workspace_id : string
	columns : WorkspaceColumnConfig[]

	constructor(workspaceId:string, columns:WorkspaceColumnConfig[]) {
		this.workspace_id = workspaceId
		this.columns = columns
	}
}

export class WorkspaceColumnConfig {
	id : number
	channel_id : string
	thread_ts : string

	constructor(id: number, channelId: string, threadTs: string) {
		this.id = id
		this.channel_id = channelId
		this.thread_ts = threadTs
	}
}