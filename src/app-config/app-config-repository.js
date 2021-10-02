"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigRepository = void 0;
const app_config_1 = require("./app-config");
const fs = __importStar(require("fs"));
class AppConfigRepository {
    load(fileName) {
        if (!fs.existsSync(fileName)) {
            return [app_config_1.AppConfig.default, false];
        }
        const appConfig = new app_config_1.AppConfig();
        Object.assign(appConfig, JSON.parse(fs.readFileSync(fileName, "utf-8")));
        return [appConfig, true];
    }
    save(fileName, appConfig) {
        fs.writeFileSync(fileName, JSON.stringify(appConfig, null, "\t"));
        return appConfig;
    }
}
exports.AppConfigRepository = AppConfigRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy1yZXBvc2l0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLWNvbmZpZy1yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBdUM7QUFDdkMsdUNBQXlCO0FBRXpCLE1BQWEsbUJBQW1CO0lBQzVCLElBQUksQ0FBQyxRQUFlO1FBQ2hCLElBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFDO1lBQ3hCLE9BQU8sQ0FBQyxzQkFBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtTQUNwQztRQUVELE1BQU0sU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFBO1FBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3hFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUVELElBQUksQ0FBQyxRQUFlLEVBQUUsU0FBbUI7UUFDckMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDL0QsT0FBTyxTQUFTLENBQUE7SUFDcEIsQ0FBQztDQUNKO0FBZkQsa0RBZUMifQ==