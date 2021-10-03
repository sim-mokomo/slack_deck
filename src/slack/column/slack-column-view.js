"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackColumnView = void 0;
const electron_1 = require("electron");
const path = require("path");
class SlackColumnView {
    constructor(viewInfo, parentWindow) {
        this.viewInfo = viewInfo;
        this.parentWindow = parentWindow;
        console.log(path.join(__dirname, "slack-column-view-preload.js"));
        this.browserView = new electron_1.BrowserView({
            webPreferences: {
                nodeIntegration: false,
                devTools: true,
                contextIsolation: true,
                preload: path.join(__dirname, "slack-column-view-preload.js")
            }
        });
        void this.browserView.webContents.loadURL(this.viewInfo.url);
        this.browserView.webContents.addListener("new-window", (event, url) => {
            event.preventDefault();
            void electron_1.shell.openExternal(url);
        });
        this.browserView.setBounds({ x: 0, y: 0, width: 0, height: 0 });
        this.browserView.webContents.addListener("did-finish-load", () => {
            const isThread = this.viewInfo.url.includes("thread");
            this.applyCSSForSlackColumn(this.browserView, isThread);
        });
        this.parentWindow.addBrowserView(this.browserView);
    }
    setSize(x, y, width, height) {
        this.browserView.setBounds({
            x: Math.round(x),
            y: Math.round(y),
            width: Math.round(width),
            height: Math.round(height)
        });
    }
    delete() {
        this.parentWindow.removeBrowserView(this.browserView);
        this.browserView.webContents.delete();
    }
    getWidth() {
        return this.browserView.getBounds().width;
    }
    applyCSSForSlackColumn(browserView, isThread) {
        if (this.viewInfo.id == 0) {
            const commonCSSContents = [
                ".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}",
                ".p-client { grid-template-rows: 0px auto min-content !important; }",
                ".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}",
                ".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}",
                `.main .webview-container .webview-item { min-width: ${this.getWidth()}px !important;}`,
            ];
            for (const commonCSSContent of commonCSSContents) {
                void browserView.webContents.insertCSS(commonCSSContent);
            }
        }
        else {
            const commonCSSContents = [
                ".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}",
                ".p-client { grid-template-rows: 0px auto min-content !important; }",
                ".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}",
                ".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}",
                `.main .webview-container .webview-item { min-width: ${this.getWidth()}px !important;}`,
            ];
            for (const commonCSSContent of commonCSSContents) {
                void browserView.webContents.insertCSS(commonCSSContent);
            }
        }
        if (!isThread) {
            return;
        }
        const threadCSSContents = [
            ".p-workspace__primary_view{ visibility: hidden;} .p-workspace__sidebar{ visibility: hidden; }",
            `.p-workspace-layout .p-workspace__secondary_view { width: ${this.getWidth()}px; }`,
            ".p-threads_footer__input_container {min-height: 0px !important;}",
            "button[data-qa='close_flexpane']{visibility: hidden;}",
            `.main .webview-container .webview-item { min-width: ${this.getWidth()}px !important;}`,
            `.p-workspace-layout { grid-template-columns: auto ${this.getWidth()}px !important; grid-template-areas: 'p-workspace__primary_view p-workspace__secondary_view';}`,
        ];
        for (const threadCSSContent of threadCSSContents) {
            void browserView.webContents.insertCSS(threadCSSContent);
        }
    }
}
exports.SlackColumnView = SlackColumnView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2stY29sdW1uLXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGFjay1jb2x1bW4tdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBMkQ7QUFFM0QsNkJBQTZCO0FBRTdCLE1BQWEsZUFBZTtJQU14QixZQUFZLFFBQThCLEVBQUMsWUFBMEI7UUFDakUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUE7UUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDLENBQUE7UUFDakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHNCQUFXLENBQUM7WUFDL0IsY0FBYyxFQUFFO2dCQUNaLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixPQUFPLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsOEJBQThCLENBQUM7YUFDakU7U0FDSixDQUFDLENBQUE7UUFDRixLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDbEUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFBO1lBQ3RCLEtBQUssZ0JBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDaEMsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVB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