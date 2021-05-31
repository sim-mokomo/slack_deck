export class SlackService {
	// NOTE: 指定なしの場合前回ログインしたワークスペースに移動する。
	// ログインしていない場合はsign in画面
	static getWorkspaceUrl(workspaceId = ""): string {
		return `https://app.slack.com/client/${workspaceId}`
	}

	static getChannelUrl(workspaceId: string, channelId: string): string {
		return `${this.getWorkspaceUrl(workspaceId)}/${channelId}`
	}

	static getThreadUrl(
		workspaceId: string,
		channelId: string,
		threadTs: string,
	): string {
		return `${this.getChannelUrl(
			workspaceId,
			channelId,
		)}/thread/${this.createThreadId(channelId, threadTs)}`
	}

	static createThreadId(channelId: string, threadTs: string): string {
		return `${channelId}-${threadTs}`
	}

	static getWebViewURL(
		workspaceId: string,
		channelId: string,
		threadTs: string,
	): string {
		return threadTs.length > 0
			? this.getThreadUrl(workspaceId, channelId, threadTs)
			: this.getChannelUrl(workspaceId, channelId)
	}

	static parseUrl(url: string): [channelId: string, threadId: string] {
		// note: [channel url] https://<team-name>.slack.com/archives/<channel_id>
		// note: [thread url] https://<team-name>.slack.com/archives/<channel_id>/<thread_ts>?thread_ts=<value>&cid=<value>

		const channelUrlRegex = /https:\/\/.+\/archives\/.+/
		const isChannelUrl = channelUrlRegex.exec(url) != null

		const threadUrlRegex = /https:\/\/.+\/archives\/.+\/.+\?thread_ts=.+&cid=.+/
		const isThreadUrl = threadUrlRegex.exec(url) != null

		if (isThreadUrl) {
			// thread
			const strings = url.split("/")
			const queryString = strings[strings.length - 1].split("?")[1]
			const queryParameterStrings = queryString.split("&")
			const queryKVP = queryParameterStrings.map((x) => {
				const kvp = x.split("=")
				return {
					key: kvp[0],
					value: kvp[1],
				}
			})

			const threadTs =
				queryKVP[queryKVP.findIndex((x) => x.key == "thread_ts")].value
			const channelId =
				queryKVP[queryKVP.findIndex((x) => x.key == "cid")].value

			return [channelId, threadTs]
		} else if (isChannelUrl) {
			// channel
			const strings = url.split("/")
			return [strings[4], ""]
		} else {
			// 謎のurl
			return ["", ""]
		}
	}
}
