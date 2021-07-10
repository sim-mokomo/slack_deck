import {WorkspaceConfig} from "../workspace-config";
import {WorkspaceColumnConfig} from "../workspace-column-config";

const workspaceConfig = new WorkspaceConfig()
const testColumnNum = 3

function createChannelId(id : number) : string {
    return `channel_${id}`
}

function createThreadTs(id : number) : string {
    return `thread_ts_${id}`
}

beforeEach(()=>{
    for (let i = 0; i < testColumnNum; i++) {
        workspaceConfig.addColumn(new WorkspaceColumnConfig(i, createChannelId(i), createThreadTs(i)))
    }
})

afterEach(()=>{
    workspaceConfig.clear()
})

test("WorkspaceColumn要素初期化テスト", () => {
    workspaceConfig.clear()
    expect(workspaceConfig.getColumnNum()).toBe(0)
})

test("WorkspaceColumn要素数テスト", () => {
    expect(workspaceConfig.getColumnNum()).toBe(testColumnNum)
})

test("WorkspaceColumn取得テスト", () => {
    for (let i = 0; i < workspaceConfig.getColumnNum(); i++) {
        const column = workspaceConfig.getColumn(i)
        expect(column).not.toBeNull()

        if(column != null){
            expect(column.id).toBe(i)
            expect(column.channel_id).toBe(createChannelId(i))
            expect(column.thread_ts).toBe(createThreadTs(i))
            return
        }
    }
})

test("WorkspaceColumn追加テスト", () => {
    const originNum = workspaceConfig.getColumnNum()
    workspaceConfig.addColumn(
        new WorkspaceColumnConfig(
            originNum,
            createChannelId(originNum),
            createThreadTs(originNum)
        )
    )
    expect(workspaceConfig.getColumnNum()).toBe(originNum + 1)

    workspaceConfig.getColumns().forEach((x,i) => {
        expect(x.id).toBe(i)
        expect(x.channel_id).toBe(createChannelId(i))
        expect(x.thread_ts).toBe(createThreadTs(i))
    })
})

test("WorkspaceColumn削除テスト", () => {
    const removeTargetColumnId = 1
    workspaceConfig.removeColumn(removeTargetColumnId)
    expect(workspaceConfig.getColumnNum()).toBe(2)

    const notFound = workspaceConfig.getColumn(removeTargetColumnId) == null
    expect(notFound).toBeTruthy()
})
