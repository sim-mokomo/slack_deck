import {WorkspaceColumnConfig} from "../workspace-column-config";

test("空のカラムを取得できているか", () => {
    const empty = WorkspaceColumnConfig.getEmpty()
    expect(empty.id).toBe(0)
    expect(empty.channel_id).toBe("")
    expect(empty.thread_ts).toBe("")
})