export class SlackService {
    // NOTE: 指定なしの場合前回ログインしたワークスペースに移動する。
    // ログインしていない場合はsign in画面
    static getWorkspaceUrl(workspaceId = "") : string{
        return `https://app.slack.com/client/${workspaceId}`
    }

    static getChannelUrl(workspaceId:string, channelId:string) : string {
        return `${this.getWorkspaceUrl(workspaceId)}/${channelId}`
    }

    static getThreadUrl(workspaceId:string, channelId:string, threadTs:string) :string{
        return `${this.getChannelUrl(workspaceId,channelId)}/thread/${this.createThreadId(channelId,threadTs)}`
    }

    static createThreadId(channelId:string, threadTs:string) : string{
        return `${channelId}-${threadTs}`
    }

    static getWebViewURL(workspaceId:string , channelId: string, threadId:string) : string {
        return threadId.length > 0 ?
            this.getThreadUrl(workspaceId, channelId, threadId) :
            this.getChannelUrl(workspaceId, channelId)
    }
}