import fs from "fs"

export class AppConfig {
	workspaces: WorkSpaceConfig[] = []
	static readonly fileName = "appconfig.json"

	static load(): AppConfig {
		if (!fs.existsSync(this.fileName)) {
			return this.save(this.getEmpty())
		}
		const config = <AppConfig>(
			JSON.parse(fs.readFileSync(this.fileName, "utf-8"))
		)
		const ret: AppConfig = new AppConfig()
		Object.assign(ret, config)
		return ret
	}

	static save(config: AppConfig): AppConfig {
		fs.writeFileSync(this.fileName, JSON.stringify(config))
		return config
	}

	static getEmpty(): AppConfig {
		const config = new AppConfig()
		config.workspaces.push(new WorkSpaceConfig())
		return config
	}

	addWorkSpaceConfig(workspaceConfig: WorkSpaceConfig): void {
		this.workspaces.push(workspaceConfig)
	}

	addWorkSpaceColumnConfig(
		workspaceId: string,
		workspaceColumnConfig: WorkSpaceColumnConfig,
	): void {
		const index = this.workspaces.findIndex(
			(x) => x.workspace_id == workspaceId,
		)
		this.workspaces[index].columns.push(workspaceColumnConfig)
	}

	removeWorkSpaceColumnConfig(workspaceId: string, columnId: number): void {
		const index = this.workspaces.findIndex(
			(x) => x.workspace_id == workspaceId,
		)
		const columnIndex = this.workspaces[index].columns.findIndex(
			(x) => x.id == columnId,
		)
		this.workspaces[index].columns.splice(columnIndex, 1)
	}
}

export class WorkSpaceConfig {
	workspace_id = ""
	columns: WorkSpaceColumnConfig[] = []

	constructor() {
		this.columns.push(WorkSpaceColumnConfig.getEmpty())
	}
}

export class WorkSpaceColumnConfig {
	id = 0
	channel_id = ""
	thread_ts = ""

	constructor(id: number, channelId: string, threadTs: string) {
		this.channel_id = channelId
		this.thread_ts = threadTs
	}

	static getEmpty(): WorkSpaceColumnConfig {
		return new WorkSpaceColumnConfig(0, "", "")
	}
}
