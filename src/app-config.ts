import fs from "fs"

export class AppConfig {
	workspaces: WorkspaceConfig[] = []
	static readonly fileName = "appconfig.json"

	static load(): AppConfig {
		if (!fs.existsSync(this.fileName)) {
			return this.save(new AppConfig())
		}
		const ret: AppConfig = new AppConfig()
		Object.assign(ret, JSON.parse(fs.readFileSync(this.fileName, "utf-8")))
		return ret
	}

	static save(config: AppConfig): AppConfig {
		fs.writeFileSync(this.fileName, JSON.stringify(config,null , "\t"))
		return config
	}

	addWorkspaceColumnConfig(workspaceId: string, workspaceColumnConfig: WorkspaceColumnConfig): void {
		const workspaceConfig = this.getWorkspaceConfig(workspaceId)
		if(workspaceConfig != null){
			workspaceConfig.columns.push(workspaceColumnConfig)
		}
	}

	removeWorkspaceColumnConfig(workspaceId: string, columnId: number): void {
		const workspaceConfig = this.getWorkspaceConfig(workspaceId)
		if(workspaceConfig != null) {
			workspaceConfig.columns = workspaceConfig.columns.filter(x => x.id == columnId)
		}
	}

	getWorkspaceConfigHead() : WorkspaceConfig | null {
		return this.workspaces[0]
	}

	private getWorkspaceConfig(workspaceId:string) : WorkspaceConfig | null {
		const index = this.workspaces.findIndex(x => x.workspace_id == workspaceId)
		if(index < 0 || index >= this.workspaces.length){
			return null
		}

		return this.workspaces[index]
	}
}


export class WorkspaceConfig {
	workspace_id = ""
	columns: WorkspaceColumnConfig[] = []

	constructor(workspaceId:string, columns:WorkspaceColumnConfig[]) {
		this.workspace_id = workspaceId
		this.columns = columns
	}
}

export class WorkspaceColumnConfig {
	id
	channel_id
	thread_ts

	constructor(id: number, channelId: string, threadTs: string) {
		this.id = id
		this.channel_id = channelId
		this.thread_ts = threadTs
	}
}