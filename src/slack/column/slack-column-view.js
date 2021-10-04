"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackColumnView = void 0;
const electron_1 = require("electron");
const path = require("path");
class SlackColumnView {
    constructor(viewInfo, parentWindow) {
        this.viewInfo = viewInfo;
        this.parentWindow = parentWindow;
        this.browserView = new electron_1.BrowserView({
            webPreferences: {
                nodeIntegration: false,
                devTools: true,
                contextIsolation: true,
                preload: this.isHomeColumn() ? "" : path.join(__dirname, "slack-column-view-preload.js")
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
    isHomeColumn() {
        return this.viewInfo.id == 0;
    }
    delete() {
        this.parentWindow.removeBrowserView(this.browserView);
        this.browserView.webContents.delete();
    }
    getWidth() {
        return this.browserView.getBounds().width;
    }
    applyCSSForSlackColumn(browserView, isThread) {
        if (this.isHomeColumn()) {
            return;
        }
        const commonCSSContents = [
            ".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}",
            ".p-client { grid-template-rows: 0px auto min-content !important; }",
            ".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}",
            ".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}",
            `.p-workspace__sidebar {visibility: hidden;}`,
        ];
        for (const commonCSSContent of commonCSSContents) {
            void browserView.webContents.insertCSS(commonCSSContent);
        }
        if (isThread) {
            const threadCSSContents = [
                ".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}",
                ".p-client { grid-template-rows: 0px auto min-content !important; }",
                ".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}",
                ".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}",
                `.p-workspace-layout {
                    grid-template-columns: auto 99% !important;
                    grid-template-areas: 'p-workspace__primary_view p-workspace__secondary_view !important';
                }`,
                `.p-workspace__sidebar {visibility: hidden;}`,
                `.p-workspace__primary_view{ visibility: hidden;}`,
                "button[data-qa='close_flexpane']{visibility: hidden;}",
            ];
            for (const threadCSSContent of threadCSSContents) {
                void browserView.webContents.insertCSS(threadCSSContent);
            }
        }
    }
}
exports.SlackColumnView = SlackColumnView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2stY29sdW1uLXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGFjay1jb2x1bW4tdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBMkQ7QUFFM0QsNkJBQTZCO0FBRTdCLE1BQWEsZUFBZTtJQU14QixZQUFZLFFBQThCLEVBQUMsWUFBMEI7UUFDakUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUE7UUFFaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHNCQUFXLENBQUM7WUFDL0IsY0FBYyxFQUFFO2dCQUNaLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixPQUFPLEVBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDhCQUE4QixDQUFDO2FBQzVGO1NBQ0osQ0FBQyxDQUFBO1FBQ0YsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2xFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQTtZQUN0QixLQUFLLGdCQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2hDLENBQUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQTtRQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO1lBQzdELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNyRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUMzRCxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0lBRUQsT0FBTyxDQUFDLENBQVEsRUFBRSxDQUFRLEVBQUUsS0FBWSxFQUFFLE1BQWM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQ3RCO1lBQ0ksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQzdCLENBQ0osQ0FBQTtJQUNMLENBQUM7SUFFRCxZQUFZO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDaEMsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNyRCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUE7SUFDN0MsQ0FBQztJQUVELHNCQUFzQixDQUFDLFdBQXlCLEVBQUUsUUFBaUI7UUFDL0QsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUM7WUFDbkIsT0FBTztTQUNWO1FBRUQsTUFBTSxpQkFBaUIsR0FBRztZQUN0QixrR0FBa0c7WUFDbEcsb0VBQW9FO1lBQ3BFLDBJQUEwSTtZQUMxSSxpR0FBaUc7WUFDakcsNkNBQTZDO1NBQ2hELENBQUE7UUFDRCxLQUFLLE1BQU0sZ0JBQWdCLElBQUksaUJBQWlCLEVBQUU7WUFDOUMsS0FBSyxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1NBQzNEO1FBRUQsSUFBSSxRQUFRLEVBQUU7WUFDVixNQUFNLGlCQUFpQixHQUFHO2dCQUN0QixrR0FBa0c7Z0JBQ2xHLG9FQUFvRTtnQkFDcEUsMElBQTBJO2dCQUMxSSxpR0FBaUc7Z0JBQ2pHOzs7a0JBR0U7Z0JBQ0YsNkNBQTZDO2dCQUM3QyxrREFBa0Q7Z0JBQ2xELHVEQUF1RDthQUMxRCxDQUFBO1lBRUQsS0FBSyxNQUFNLGdCQUFnQixJQUFJLGlCQUFpQixFQUFFO2dCQUM5QyxLQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUE7YUFDM0Q7U0FDSjtJQUNMLENBQUM7Q0FDSjtBQTVGRCwwQ0E0RkMifQ==