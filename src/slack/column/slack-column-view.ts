import {BrowserView, BrowserWindow, shell} from "electron";
import {SlackColumnViewInfo} from "./slack-column-view-info";

export class SlackColumnView
{
    parentWindow : BrowserWindow
    browserView : BrowserView
    viewInfo : SlackColumnViewInfo

    constructor(viewInfo : SlackColumnViewInfo,parentWindow:BrowserWindow) {
        this.viewInfo = viewInfo
        this.parentWindow = parentWindow

        this.browserView = new BrowserView()
        void this.browserView.webContents.loadURL(this.viewInfo.url)
        this.browserView.webContents.addListener("new-window", (event, url) => {
            event.preventDefault()
            void shell.openExternal(url)
        })

        this.browserView.setBounds({x:0,y:0,width:0,height:0})
        this.browserView.webContents.addListener("did-finish-load", () => {
            const isThread = this.viewInfo.url.includes("thread")
            this.applyCSSForSlackColumn(this.browserView, isThread)
        })
        this.parentWindow.addBrowserView(this.browserView)
    }

    setSize(x:number, y:number, width:number, height: number){
        this.browserView.setBounds(
            {
                x: Math.round(x),
                y: Math.round(y),
                width: Math.round(width),
                height: Math.round(height)
            }
        )
    }

    delete(){
        this.parentWindow.removeBrowserView(this.browserView)
        this.browserView.webContents.delete()
    }

    getWidth() : number {
        return 0
    }

    applyCSSForSlackColumn(browserView : BrowserView, isThread: boolean) : void {
        const commonCSSContents = [
            ".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}",
            ".p-client { grid-template-rows: 0px auto min-content !important; }",
            ".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}",
            ".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}",
            `.main .webview-container .webview-item { min-width: ${this.getWidth()}px !important;}`,
        ]
        for (const commonCSSContent of commonCSSContents) {
            void browserView.webContents.insertCSS(commonCSSContent)
        }

        if (!isThread) {
            return
        }
        const threadCSSContents = [
            ".p-workspace__primary_view{ visibility: hidden;} .p-workspace__sidebar{ visibility: hidden; }",
            `.p-workspace-layout .p-workspace__secondary_view { width: ${this.getWidth()}px; }`,
            ".p-threads_footer__input_container {min-height: 0px !important;}",
            "button[data-qa='close_flexpane']{visibility: hidden;}",
            `.main .webview-container .webview-item { min-width: ${this.getWidth()}px !important;}`,
        ]

        for (const threadCSSContent of threadCSSContents) {
            void browserView.webContents.insertCSS(threadCSSContent)
        }
    }
}