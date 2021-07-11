import {BrowserView, BrowserWindow, shell} from "electron";

export class SlackColumnBaseUi
{
    parentWindow : BrowserWindow
    browserView : BrowserView

    constructor(parentWindow:BrowserWindow, url:string) {
        this.parentWindow = parentWindow

        this.browserView = new BrowserView()
        void this.browserView.webContents.loadURL(url)
        this.browserView.webContents.addListener("new-window", (event, url) => {
            event.preventDefault()
            void shell.openExternal(url)
        })

        this.browserView.setBounds({x:0,y:0,width:this.getWidth(),height:0})
        this.browserView.webContents.addListener("did-finish-load", () => {
            const isThread = url.includes("thread")
            this.applyCSSForSlackColumn(this.browserView, isThread)
        })
        this.parentWindow.addBrowserView(this.browserView)
    }

    setSize(x:number, y:number, height: number){
        this.browserView.setBounds({
            x: Math.round(x),
            y: Math.round(y),
            width: this.getWidth(),
            height: Math.round(height)})
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