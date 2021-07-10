import fs from "fs"
import {WorkspaceConfig} from "./workspace-config";
import {WorkspaceColumnConfig} from "./workspace-column-config";

export class AppConfig {
	workspaces: WorkspaceConfig[] = []
	static readonly fileName = "appconfig.json"

	static load(): AppConfig {
		if (!fs.existsSync(this.fileName)) {
			return this.save(this.getEmpty())
		}
		const ret: AppConfig = new AppConfig()
		Object.assign(ret, JSON.parse(fs.readFileSync(this.fileName, "utf-8")))
		return ret
	}

	static save(config: AppConfig): AppConfig {
		fs.writeFileSync(this.fileName, JSON.stringify(config,null , "\t"))
		return config
	}

	static getEmpty(): AppConfig {
		const config = new AppConfig()
		const workspaceConfig = new WorkspaceConfig()
		workspaceConfig.addColumn(WorkspaceColumnConfig.getEmpty())
		config.workspaces.push(workspaceConfig)
		return config
	}

	addWorkspaceColumnConfig(workspaceId: string, workspaceColumnConfig: WorkspaceColumnConfig): void {
		const workspaceConfig = this.getWorkspaceConfig(workspaceId)
		if(workspaceConfig != null){
			workspaceConfig.addColumn(workspaceColumnConfig)
		}
	}

	removeWorkspaceColumnConfig(workspaceId: string, columnId: number): void {
		const workspaceConfig = this.getWorkspaceConfig(workspaceId)
		if(workspaceConfig != null) {
			workspaceConfig.removeColumn(columnId)
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


