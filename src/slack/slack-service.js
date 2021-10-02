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
    static getWebViewURL(workspaceId, channelId, threadTs) {
        return threadTs.length > 0
            ? this.getThreadUrl(workspaceId, channelId, threadTs)
            : this.getChannelUrl(workspaceId, channelId);
    }
    static parseUrl(url) {
        // note: [channel url] https://<team-name>.slack.com/archives/<channel_id>
        // note: [thread url] https://<team-name>.slack.com/archives/<channel_id>/<thread_ts>?thread_ts=<value>&cid=<value>
        const channelUrlRegex = /https:\/\/.+\/archives\/.+/;
        const isChannelUrl = channelUrlRegex.exec(url) != null;
        const threadUrlRegex = /https:\/\/.+\/archives\/.+\/.+\?thread_ts=.+&cid=.+/;
        const isThreadUrl = threadUrlRegex.exec(url) != null;
        if (isThreadUrl) {
            // thread
            const strings = url.split("/");
            const queryString = strings[strings.length - 1].split("?")[1];
            const queryParameterStrings = queryString.split("&");
            const queryKVP = queryParameterStrings.map((x) => {
                const kvp = x.split("=");
                return {
                    key: kvp[0],
                    value: kvp[1],
                };
            });
            const threadTs = queryKVP[queryKVP.findIndex((x) => x.key == "thread_ts")].value;
            const channelId = queryKVP[queryKVP.findIndex((x) => x.key == "cid")].value;
            return [channelId, threadTs];
        }
        else if (isChannelUrl) {
            // channel
            const strings = url.split("/");
            return [strings[4], ""];
        }
        else {
            // 謎のurl
            return ["", ""];
        }
    }
}
exports.SlackService = SlackService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2stc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNsYWNrLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxZQUFZO0lBQ3hCLHFDQUFxQztJQUNyQyx3QkFBd0I7SUFDeEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsRUFBRTtRQUN0QyxPQUFPLGdDQUFnQyxXQUFXLEVBQUUsQ0FBQTtJQUNyRCxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFtQixFQUFFLFNBQWlCO1FBQzFELE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFBO0lBQzNELENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUNsQixXQUFtQixFQUNuQixTQUFpQixFQUNqQixRQUFnQjtRQUVoQixPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FDM0IsV0FBVyxFQUNYLFNBQVMsQ0FDVCxXQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUE7SUFDdkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBaUIsRUFBRSxRQUFnQjtRQUN4RCxPQUFPLEdBQUcsU0FBUyxJQUFJLFFBQVEsRUFBRSxDQUFBO0lBQ2xDLENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUNuQixXQUFtQixFQUNuQixTQUFpQixFQUNqQixRQUFnQjtRQUVoQixPQUFPLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztZQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBVztRQUMxQiwwRUFBMEU7UUFDMUUsbUhBQW1IO1FBRW5ILE1BQU0sZUFBZSxHQUFHLDRCQUE0QixDQUFBO1FBQ3BELE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFBO1FBRXRELE1BQU0sY0FBYyxHQUFHLHFEQUFxRCxDQUFBO1FBQzVFLE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFBO1FBRXBELElBQUksV0FBVyxFQUFFO1lBQ2hCLFNBQVM7WUFDVCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzlCLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM3RCxNQUFNLHFCQUFxQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDcEQsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3hCLE9BQU87b0JBQ04sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ2IsQ0FBQTtZQUNGLENBQUMsQ0FBQyxDQUFBO1lBRUYsTUFBTSxRQUFRLEdBQ2IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7WUFDaEUsTUFBTSxTQUFTLEdBQ2QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7WUFFMUQsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQTtTQUM1QjthQUFNLElBQUksWUFBWSxFQUFFO1lBQ3hCLFVBQVU7WUFDVixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7U0FDdkI7YUFBTTtZQUNOLFFBQVE7WUFDUixPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1NBQ2Y7SUFDRixDQUFDO0NBQ0Q7QUExRUQsb0NBMEVDIn0=