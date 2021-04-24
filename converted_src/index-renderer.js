"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const addColumnConfirmButtonDOM = document.getElementById("add-column-confirm-button");
if (addColumnConfirmButtonDOM != null) {
    addColumnConfirmButtonDOM.addEventListener("click", () => {
        const addColumnInputDOM = document.getElementById("add-column-input");
        if (addColumnInputDOM == null) {
            return;
        }
        console.log(`input value is ${addColumnInputDOM.value}`);
        electron_1.ipcRenderer.send("add-column-main-request", addColumnInputDOM.value);
        addColumnInputDOM.value = "";
    });
}
electron_1.ipcRenderer.on("add-slack-column-reply", (event, args) => {
    console.log("receive renderer");
    const webViewWidth = "300px";
    for (let i = 0; i < args.length; i++) {
        const url = args[i];
        const newWebViewItem = document.createElement("div");
        newWebViewItem.setAttribute("class", "webview-item");
        const newWebView = document.createElement("webview");
        newWebView.setAttribute("src", url);
        newWebViewItem.appendChild(newWebView);
        newWebView.addEventListener("did-finish-load", () => {
            const isThread = url.includes("thread");
            void newWebView.insertCSS(".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}");
            void newWebView.insertCSS(".p-client { grid-template-rows: 0px auto min-content !important; }");
            void newWebView.insertCSS(".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}");
            void newWebView.insertCSS(".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}");
            if (!isThread) {
                return;
            }
            void newWebView.insertCSS(".p-workspace__primary_view{ visibility: hidden;} .p-workspace__sidebar{ visibility: hidden; }");
            void newWebView.insertCSS(`.p-workspace-layout .p-workspace__secondary_view { width: ${webViewWidth}; }`);
            void newWebView.insertCSS(".p-threads_footer__input_container {min-height: 0px !important}");
            void newWebView.insertCSS(".c-icon_button--light, .c-icon_button--light.c-button-unstyled, .c-icon_button--light:link{visibility: hidden;}");
        });
        newWebView.style.setProperty("width", webViewWidth);
        const webviewContainerDOM = document.getElementsByClassName("webview-container");
        webviewContainerDOM[0].appendChild(newWebViewItem);
    }
});
electron_1.ipcRenderer.send("init-index");
