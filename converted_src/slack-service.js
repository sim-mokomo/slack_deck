"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackService = void 0;
class SlackService {
    // NOTE: 指定なしの場合前回ログインしたワークスペースに移動する。
    // ログインしていない場合はsign in画面
    static getWorkspaceUrl(workspaceId = "") {
        return `https://app.slack.com/client/${workspaceId}`;
    }
    static getChannelUrl(workspaceId, channelId) {
        return `${this.getWorkspaceUrl(workspaceId)}/${channelId}`;
    }
    static getThreadUrl(workspaceId, channelId, threadTs) {
        return `${this.getChannelUrl(workspaceId, channelId)}/thread/${this.createThreadId(channelId, threadTs)}`;
    }
    static createThreadId(channelId, threadTs) {
        return `${channelId}-${threadTs}`;
    }
    static getWebViewURL(workspaceId, channelId, threadId) {
        return threadId.length > 0 ?
            this.getThreadUrl(workspaceId, channelId, threadId) :
            this.getChannelUrl(workspaceId, channelId);
    }
}
exports.SlackService = SlackService;
