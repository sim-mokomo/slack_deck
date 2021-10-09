class WorkspaceIconHtmlViewInfo{
    workspaceId  = ""
    iconUrl = ""

    constructor(init? : Partial<WorkspaceIconHtmlViewInfo>) {
        Object.assign(this, init)
    }
}