export class WorkspaceColumnConfig {
    id
    channel_id
    thread_ts

    constructor(id: number, channelId: string, threadTs: string) {
        this.id = id
        this.channel_id = channelId
        this.thread_ts = threadTs
    }

    public static getEmpty(): WorkspaceColumnConfig {
        return new WorkspaceColumnConfig(0, "", "")
    }
}