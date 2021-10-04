import {BrowserView, BrowserWindow, shell} from "electron";
import {SlackColumnViewInfo} from "./slack-column-view-info";
import path = require("path")

export class SlackColumnView
{
    parentWindow : BrowserWindow
    browserView : BrowserView
    viewInfo : SlackColumnViewInfo

    constructor(viewInfo : SlackColumnViewInfo,parentWindow:BrowserWindow) {
        this.viewInfo = viewInfo
        this.parentWindow = parentWindow

        this.browserView = new BrowserView({
            webPreferences: {
                nodeIntegration: false,
                devTools: true,
                contextIsolation: true,
                preload : this.isHomeColumn() ? "" : path.join(__dirname, "slack-column-view-preload.js")
            }
        })
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

    isHomeColumn(){
        return this.viewInfo.id == 0
    }

    delete(){
        this.parentWindow.removeBrowserView(this.browserView)
        this.browserView.webContents.delete()
    }

    getWidth() : number {
        return this.browserView.getBounds().width
    }

    applyCSSForSlackColumn(browserView : BrowserView, isThread: boolean) : void {
        if(this.isHomeColumn()){
            return;
        }

        const commonCSSContents = [
            ".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}",
            ".p-client { grid-template-rows: 0px auto min-content !important; }",
            ".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}",
            ".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}",
            `.p-workspace__sidebar {visibility: hidden;}`,
        ]
        for (const commonCSSContent of commonCSSContents) {
            void browserView.webContents.insertCSS(commonCSSContent)
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
            ]

            for (const threadCSSContent of threadCSSContents) {
                void browserView.webContents.insertCSS(threadCSSContent)
            }
        }
    }
}