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
        return threadTs.length > 0 ?
            this.getThreadUrl(workspaceId, channelId, threadTs) :
            this.getChannelUrl(workspaceId, channelId);
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
            const strings = url.split('/');
            const queryString = strings[strings.length - 1].split("?")[1];
            const queryParameterStrings = queryString.split("&");
            const queryKVP = queryParameterStrings.map(x => {
                const kvp = x.split("=");
                return {
                    key: kvp[0],
                    value: kvp[1],
                };
            });
            const threadTs = queryKVP[queryKVP.findIndex(x => x.key == "thread_ts")].value;
            const channelId = queryKVP[queryKVP.findIndex(x => x.key == "cid")].value;
            return [channelId, threadTs];
        }
        else if (isChannelUrl) {
            // channel
            const strings = url.split('/');
            return [strings[4], ""];
        }
        else {
            // 謎のurl
            return ["", ""];
        }
    }
}
exports.SlackService = SlackService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2stc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbGFjay1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsWUFBWTtJQUNyQixxQ0FBcUM7SUFDckMsd0JBQXdCO0lBQ3hCLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLEVBQUU7UUFDbkMsT0FBTyxnQ0FBZ0MsV0FBVyxFQUFFLENBQUE7SUFDeEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBa0IsRUFBRSxTQUFnQjtRQUNyRCxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQTtJQUM5RCxDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFrQixFQUFFLFNBQWdCLEVBQUUsUUFBZTtRQUNyRSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQTtJQUMzRyxDQUFDO0lBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFnQixFQUFFLFFBQWU7UUFDbkQsT0FBTyxHQUFHLFNBQVMsSUFBSSxRQUFRLEVBQUUsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFrQixFQUFHLFNBQWlCLEVBQUUsUUFBZTtRQUN4RSxPQUFPLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBWTtRQUN4QiwwRUFBMEU7UUFDMUUsbUhBQW1IO1FBRW5ILE1BQU0sZUFBZSxHQUFHLDRCQUE0QixDQUFDO1FBQ3JELE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFBO1FBRXRELE1BQU0sY0FBYyxHQUFHLHFEQUFxRCxDQUFBO1FBQzVFLE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFBO1FBRXBELElBQUcsV0FBVyxFQUFDO1lBQ1gsU0FBUztZQUNULE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDOUIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzdELE1BQU0scUJBQXFCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNwRCxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzNDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3hCLE9BQU87b0JBQ0gsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ2hCLENBQUE7WUFDTCxDQUFDLENBQUMsQ0FBQTtZQUVGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtZQUM5RSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7WUFFekUsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQTtTQUMvQjthQUFLLElBQUcsWUFBWSxFQUFDO1lBQ2xCLFVBQVU7WUFDVixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7U0FDMUI7YUFBSTtZQUNELFFBQVE7WUFDUixPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1NBQ2xCO0lBQ0wsQ0FBQztDQUNKO0FBN0RELG9DQTZEQyJ9