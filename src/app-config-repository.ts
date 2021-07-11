import {AppConfig} from "./app-config";
import * as fs from "fs";

export class AppConfigRepository {
    load(fileName:string) : AppConfig{
        if(!fs.existsSync(fileName)){
            return this.save(fileName, new AppConfig())
        }

        const appConfig = new AppConfig()
        Object.assign(appConfig, JSON.parse(fs.readFileSync(fileName, "utf-8")))
        return appConfig
    }

    save(fileName:string, appConfig:AppConfig) : AppConfig {
        fs.writeFileSync(fileName, JSON.stringify(appConfig,null,"\t"))
        return appConfig
    }
}