import fs from "fs";

export class AppConfig {
    workspaces : WorkSpaceConfig[] = []
    static readonly fileName = "appconfig.json"

    static load() : AppConfig {
        if(!fs.existsSync(this.fileName)) {
            return this.save(this.getEmpty())
        }
        return (<AppConfig>JSON.parse(fs.readFileSync(this.fileName, 'utf-8')))
    }

    static save(config : AppConfig) : AppConfig {
        fs.writeFileSync(this.fileName,JSON.stringify(config))
        return config
    }

    static getEmpty() : AppConfig {
        const config = new AppConfig()
        config.workspaces.push(new WorkSpaceConfig())
        return config
    }

    addWorkSpaceConfig(workspaceConfig: WorkSpaceConfig){
        this.workspaces.push(workspaceConfig)
    }

    addWorkSpaceColumnConfig(workspaceId:string,workspaceColumnConfig:WorkSpaceColumnConfig){
        const index = this.workspaces.findIndex(x => x.workspace_id == workspaceId)
        this.workspaces[index].columns.push(workspaceColumnConfig)
    }
}

export class WorkSpaceConfig{
    workspace_id = ''
    columns : WorkSpaceColumnConfig[] = []

    constructor() {
        this.columns.push(WorkSpaceColumnConfig.getEmpty())
    }
}

export class WorkSpaceColumnConfig {
    channel_id = ""
    thread_ts = ""

    constructor(channelId: string, threadTs:string) {
        this.channel_id = channelId
        this.thread_ts = threadTs
    }

    static getEmpty() : WorkSpaceColumnConfig{
        return new WorkSpaceColumnConfig("", "")
    }
}