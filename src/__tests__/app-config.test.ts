import {AppConfig, WorkspaceColumnConfig, WorkspaceConfig} from "../app-config/app-config";

const workspaceId = "test"
const testChannel = "test_channel"
const testTs = "test_ts"
let appConfig = new AppConfig()

beforeEach(()=>{
    appConfig = new AppConfig()
    appConfig.workspaces.push(new WorkspaceConfig(workspaceId, []))
    appConfig.addWorkspaceColumnConfig(workspaceId, new WorkspaceColumnConfig(0, testChannel, testTs))
})

test("カラムの追加", () => {
    const testIdAdded = 1;
    const testChannelAdded = "test_channel_2"
    const testTsAdded = "test_ts_2"
    appConfig.addWorkspaceColumnConfig(
        workspaceId,
        new WorkspaceColumnConfig(
            testIdAdded,
            testChannelAdded,
            testTsAdded))
    const workspaceConfig = appConfig.findWorkspaceConfig(workspaceId)
    if(workspaceConfig != null) {
        expect(workspaceConfig.columns.length).toBe(2)
        expect(workspaceConfig.columns[1].id).toBe(testIdAdded)
        expect(workspaceConfig.columns[1].channel_id).toBe(testChannelAdded)
        expect(workspaceConfig.columns[1].thread_ts).toBe(testTsAdded)
    }
})

test("カラムの削除", () => {
    appConfig.removeWorkspaceColumnConfig(workspaceId, 0)
    const workspaceConfig = appConfig.findWorkspaceConfig(workspaceId)
    if(workspaceConfig != null) {
        expect(workspaceConfig.columns.length).toBe(0)
    }
})

test("カラムの取得", () => {
    const workspaceConfig = appConfig.findWorkspaceConfig(workspaceId)
    expect(workspaceConfig).not.toBeNull()
    if(workspaceConfig != null) {
        expect(workspaceConfig.columns[0].id).toBe(0)
        expect(workspaceConfig.columns[0].channel_id).toBe(testChannel)
        expect(workspaceConfig.columns[0].thread_ts).toBe(testTs)
    }
})
