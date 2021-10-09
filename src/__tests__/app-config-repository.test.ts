import {AppConfigRepository} from "../app-config/app-config-repository";
import {AppConfig, WorkspaceColumnConfig, WorkspaceConfig} from "../app-config/app-config";
import * as fs from "fs";

const saveFileName = "test.json"

test("保存テスト", ()=>{
    const appConfigRepository = new AppConfigRepository()
    if(fs.existsSync(saveFileName)){
        fs.unlinkSync(saveFileName)
    }
    const appConfig = new AppConfig()
    appConfigRepository.save(saveFileName, appConfig)

    const fileExists = fs.existsSync(saveFileName)
    expect(fileExists).toBeTruthy()
})

test("読み込みテスト", ()=>{
    const testWorkspaceId = "test"
    const testChannel = "test_channel"
    const testTs = "test_ts"
    const testAppConfig = new AppConfig()
    testAppConfig.workspaces.push(
        new WorkspaceConfig(
            testWorkspaceId,
        [
            new WorkspaceColumnConfig(0, testChannel, testTs)
        ]))

    const appConfigRepository = new AppConfigRepository()
    appConfigRepository.save(saveFileName, testAppConfig)
    const appConfig = appConfigRepository.load(saveFileName)
    fs.unlinkSync(saveFileName)

    expect(appConfig.workspaces[0].workspace_id).toBe(testWorkspaceId)
    expect(appConfig.workspaces[0].columns[0].id).toBe(0)
    expect(appConfig.workspaces[0].columns[0].channel_id).toBe(testChannel)
    expect(appConfig.workspaces[0].columns[0].thread_ts).toBe(testTs)

})