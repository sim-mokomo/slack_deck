import {SlackService} from "../slack/slack-service";

test("getWorkspaceUrl", ()=>{
    expect(SlackService.getWorkspaceUrl("TestWorkspaceId")).toBe("https://app.slack.com/client/TestWorkspaceId");
})

test("getChannelUrl", () =>{
    expect(SlackService.getChannelUrl("TestWorkspaceId", "TestChannelId"))
        .toBe("https://app.slack.com/client/TestWorkspaceId/TestChannelId")
})

test("getThreadUrl", ()=>{
    expect(SlackService.getThreadUrl(
        "TestWorkspaceId",
        "TestChannelId",
        "TestThreadTs"
    )).toBe("https://app.slack.com/client/TestWorkspaceId/TestChannelId/thread/TestChannelId-TestThreadTs")
})

test("createThreadId", ()=>{
    expect(SlackService.createThreadId("TestChannelId", "TestThreadTs"))
        .toBe("TestChannelId-TestThreadTs")
})

test("getWebViewURL", ()=>{
    expect(SlackService.getWebViewURL(
        "TestWorkspaceId",
        "TestChannelId",
        "TestThreadTs"))
        .toBe("https://app.slack.com/client/TestWorkspaceId/TestChannelId/thread/TestChannelId-TestThreadTs")

    expect(SlackService.getWebViewURL(
        "TestWorkspaceId",
        "TestChannelId",
        ""))
        .toBe("https://app.slack.com/client/TestWorkspaceId/TestChannelId")
})

test("parseUrl", ()=>{
    {
        const [channelId, threadTs] : [string, string] = SlackService.parseUrl('https://<team-name>.slack.com/archives/<channel-id>')
        expect(channelId).toBe("<channel-id>")
        expect(threadTs).toBe("")
    }

    {
        const [channelId, threadTs] : [string, string] =
            SlackService.parseUrl('https://<team-name>.slack.com/archives/<channel-id>/<thread-ts>?thread_ts=<ts-value>&cid=<channel-id-value>')
        expect(channelId).toBe("<channel-id-value>")
        expect(threadTs).toBe("<ts-value>")
    }
})