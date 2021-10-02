"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackColumnView = void 0;
const electron_1 = require("electron");
class SlackColumnView {
    constructor(viewInfo, parentWindow) {
        this.viewInfo = viewInfo;
        this.parentWindow = parentWindow;
        this.browserView = new electron_1.BrowserView();
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
        return 0;
    }
    applyCSSForSlackColumn(browserView, isThread) {
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
        if (!isThread) {
            return;
        }
        const threadCSSContents = [
            ".p-workspace__primary_view{ visibility: hidden;} .p-workspace__sidebar{ visibility: hidden; }",
            `.p-workspace-layout .p-workspace__secondary_view { width: ${this.getWidth()}px; }`,
            ".p-threads_footer__input_container {min-height: 0px !important;}",
            "button[data-qa='close_flexpane']{visibility: hidden;}",
            `.main .webview-container .webview-item { min-width: ${this.getWidth()}px !important;}`,
        ];
        for (const threadCSSContent of threadCSSContents) {
            void browserView.webContents.insertCSS(threadCSSContent);
        }
    }
}
exports.SlackColumnView = SlackColumnView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2stY29sdW1uLXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbGFjay1jb2x1bW4tdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBMkQ7QUFHM0QsTUFBYSxlQUFlO0lBTXhCLFlBQVksUUFBOEIsRUFBQyxZQUEwQjtRQUNqRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTtRQUVoQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksc0JBQVcsRUFBRSxDQUFBO1FBQ3BDLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNsRSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUE7WUFDdEIsS0FBSyxnQkFBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNoQyxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtZQUM3RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDckQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDM0QsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDdEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxDQUFRLEVBQUUsQ0FBUSxFQUFFLEtBQVksRUFBRSxNQUFjO1FBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUN0QjtZQUNJLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoQixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUM3QixDQUNKLENBQUE7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ3pDLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxDQUFDLENBQUE7SUFDWixDQUFDO0lBRUQsc0JBQXNCLENBQUMsV0FBeUIsRUFBRSxRQUFpQjtRQUMvRCxNQUFNLGlCQUFpQixHQUFHO1lBQ3RCLGtHQUFrRztZQUNsRyxvRUFBb0U7WUFDcEUsMElBQTBJO1lBQzFJLGlHQUFpRztZQUNqRyx1REFBdUQsSUFBSSxDQUFDLFFBQVEsRUFBRSxpQkFBaUI7U0FDMUYsQ0FBQTtRQUNELEtBQUssTUFBTSxnQkFBZ0IsSUFBSSxpQkFBaUIsRUFBRTtZQUM5QyxLQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUE7U0FDM0Q7UUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsT0FBTTtTQUNUO1FBQ0QsTUFBTSxpQkFBaUIsR0FBRztZQUN0QiwrRkFBK0Y7WUFDL0YsNkRBQTZELElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTztZQUNuRixrRUFBa0U7WUFDbEUsdURBQXVEO1lBQ3ZELHVEQUF1RCxJQUFJLENBQUMsUUFBUSxFQUFFLGlCQUFpQjtTQUMxRixDQUFBO1FBRUQsS0FBSyxNQUFNLGdCQUFnQixJQUFJLGlCQUFpQixFQUFFO1lBQzlDLEtBQUssV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtTQUMzRDtJQUNMLENBQUM7Q0FDSjtBQXhFRCwwQ0F3RUMifQ==