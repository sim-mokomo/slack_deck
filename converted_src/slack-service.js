"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackService = void 0;
class SlackService {
    // NOTE: 指定なしの場合前回ログインしたワークスペースに移動する。
    // ログインしていない場合はsign in画面
    static getWorkspaceUrl(workspaceId = "") {
        return `https://app.slack.com/client/${workspaceId}`;
    }
}
exports.SlackService = SlackService;
