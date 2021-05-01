window.onload = () => {
    const addColumnConfirmButtonDOM = document.getElementById("add-column-confirm-button")
    if(addColumnConfirmButtonDOM != null){
        addColumnConfirmButtonDOM.addEventListener("click", () => {
            const addColumnInputDOM : HTMLInputElement = (<HTMLInputElement>document.getElementById("add-column-input"))
            if(addColumnInputDOM == null){
                return
            }
            window.api.AddSlackColumnRequest(addColumnInputDOM.value)
            addColumnInputDOM.value = ""
        })
    }

    window.api.AddSlackColumnReply( (url:string, id:number) => {
        const webViewDivDOM = document.createElement("div")
        webViewDivDOM.setAttribute("class", "webview-item")

        const webViewCloseButtonDOM = document.createElement("button")
        webViewCloseButtonDOM.setAttribute("type", "button")
        webViewCloseButtonDOM.innerText = "×"
        webViewDivDOM.appendChild(webViewCloseButtonDOM)

        const webviewContainerDOM = document.getElementsByClassName("webview-container")[0]
        webViewCloseButtonDOM.addEventListener("click", ()=>{
            window.api.RemoveSlackColumnRequest(id)
            webviewContainerDOM.removeChild(webViewDivDOM)
        })

        const webViewDOM = document.createElement("webview")
        const webViewWidth = "300px"
        webViewDOM.setAttribute("src", url)
        // note: enable to open link
        webViewDOM.addEventListener("new-window", (event) => {
            event.preventDefault()
            window.api.OpenBrowser(event.url)
        })
        webViewDOM.style.setProperty("width", webViewWidth)
        webViewDOM.addEventListener("did-finish-load", () => {
            const commonCSSContents = [
                ".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}",
                ".p-client { grid-template-rows: 0px auto min-content !important; }",
                ".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}",
                ".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}"
            ]
            for(const commonCSSContent of commonCSSContents){
                void webViewDOM.insertCSS(commonCSSContent)
            }

            const isThread = url.includes("thread")
            if(!isThread){
                return
            }
            const threadCSSContents = [
                ".p-workspace__primary_view{ visibility: hidden;} .p-workspace__sidebar{ visibility: hidden; }",
                `.p-workspace-layout .p-workspace__secondary_view { width: ${webViewWidth}; }`,
                ".p-threads_footer__input_container {min-height: 0px !important}",
                "button[data-qa='close_flexpane']{visibility: hidden;}"
            ]

            for (const threadCSSContent of threadCSSContents) {
                void webViewDOM.insertCSS(threadCSSContent)
            }
        })

        webViewDivDOM.appendChild(webViewDOM)
        webviewContainerDOM.appendChild(webViewDivDOM)
    })

    window.api.InitIndex()
}