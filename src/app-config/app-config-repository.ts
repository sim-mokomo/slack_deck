import {AppConfig} from "./app-config";
import * as fs from "fs";

export class AppConfigRepository {
    exists(filename:string) : boolean {
        return fs.existsSync(filename)
    }

    load(fileName:string) : AppConfig {
        if(!this.exists(fileName)){
            return AppConfig.default
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