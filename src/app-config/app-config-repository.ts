import {AppConfig} from "./app-config";
import * as fs from "fs";

export class AppConfigRepository {
    load(fileName:string) : [AppConfig, boolean] {
        if(!fs.existsSync(fileName)){
            return [AppConfig.default, false]
        }

        const appConfig = new AppConfig()
        Object.assign(appConfig, JSON.parse(fs.readFileSync(fileName, "utf-8")))
        return [appConfig, true]
    }

    save(fileName:string, appConfig:AppConfig) : AppConfig {
        fs.writeFileSync(fileName, JSON.stringify(appConfig,null,"\t"))
        return appConfig
    }
}