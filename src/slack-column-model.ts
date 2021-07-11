import {BrowserView, BrowserWindow, shell} from "electron";

export class SlackColumnModel {
    id: number
    view : BrowserView
    private parentWindow: BrowserWindow
    private static width = 400

    // todo: 描画と分離
    constructor(parentWindow:BrowserWindow, id:number, url:string) {
        this.parentWindow = parentWindow
        this.id = id
        this.view = new BrowserView()
        void this.view.webContents.loadURL(url)
        this.view.webContents.addListener("new-window", (event, url) => {
            event.preventDefault()
            void shell.openExternal(url)
        })
        this.view.setBounds({x:0,y:0,width:SlackColumnModel.width,height:0})
        this.view.webContents.addListener("did-finish-load", () => {
            const isThread = url.includes("thread")
            this.applyCSSForSlackColumn(this.view, isThread)
        })
        this.parentWindow.addBrowserView(this.view)
    }

    setSize(x:number, y:number, height:number){
        this.view.setBounds({
            x: Math.round(x),
            y: Math.round(y),
            width: SlackColumnModel.width,
            height: Math.round(height)})
    }

    delete(){
        this.parentWindow.removeBrowserView(this.view)
        this.view.webContents.delete()
    }

    applyCSSForSlackColumn(browserView : BrowserView, isThread: boolean) : void {
        const commonCSSContents = [
            ".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}",
            ".p-client { grid-template-rows: 0px auto min-content !important; }",
            ".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}",
            ".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}",
        ]
        for (const commonCSSContent of commonCSSContents) {
            void browserView.webContents.insertCSS(commonCSSContent)
        }

        if (!isThread) {
            return
        }
        const threadCSSContents = [
            ".p-workspace__primary_view{ visibility: hidden;} .p-workspace__sidebar{ visibility: hidden; }",
            `.p-workspace-layout .p-workspace__secondary_view { width: ${SlackColumnModel.width}px; }`,
            ".p-threads_footer__input_container {min-height: 0px !important}",
            "button[data-qa='close_flexpane']{visibility: hidden;}",
        ]

        for (const threadCSSContent of threadCSSContents) {
            void browserView.webContents.insertCSS(threadCSSContent)
        }
    }
}