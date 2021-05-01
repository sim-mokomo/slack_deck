"use strict";
window.onload = () => {
    const addColumnConfirmButtonDOM = document.getElementById("add-column-confirm-button");
    if (addColumnConfirmButtonDOM != null) {
        addColumnConfirmButtonDOM.addEventListener("click", () => {
            const addColumnInputDOM = document.getElementById("add-column-input");
            if (addColumnInputDOM == null) {
                return;
            }
            window.api.AddSlackColumnRequest(addColumnInputDOM.value);
            addColumnInputDOM.value = "";
        });
    }
    window.api.AddSlackColumnReply((url, id) => {
        const webViewDivDOM = document.createElement("div");
        webViewDivDOM.setAttribute("class", "webview-item");
        const webViewCloseButtonDOM = document.createElement("button");
        webViewCloseButtonDOM.setAttribute("type", "button");
        webViewCloseButtonDOM.innerText = "×";
        webViewDivDOM.appendChild(webViewCloseButtonDOM);
        const webviewContainerDOM = document.getElementsByClassName("webview-container")[0];
        webViewCloseButtonDOM.addEventListener("click", () => {
            let index = 0;
            for (const child of webviewContainerDOM.children) {
                if (child == webViewDivDOM) {
                    window.api.RemoveSlackColumnRequest(index);
                    break;
                }
                index++;
            }
            webviewContainerDOM.removeChild(webViewDivDOM);
        });
        const webViewDOM = document.createElement("webview");
        const webViewWidth = "400px";
        webViewDOM.setAttribute("src", url);
        // note: enable to open link
        webViewDOM.addEventListener("new-window", (event) => {
            event.preventDefault();
            window.api.OpenBrowser(event.url);
        });
        webViewDOM.style.setProperty("width", webViewWidth);
        webViewDOM.addEventListener("did-finish-load", () => {
            const commonCSSContents = [
                ".p-top_nav--windows:after, .p-top_nav button, .p-top_nav__help__badge--dot {visibility: hidden;}",
                ".p-client { grid-template-rows: 0px auto min-content !important; }",
                ".p-ia__view_header.p-ia__view-header--with-sidebar-button, .p-ia__view_header:not(.p-ia__view_header--with-history){visibility: hidden;}",
                ".p-classic_nav__model__title__name__button {visibility: visible; overflow: visible !important;}"
            ];
            for (const commonCSSContent of commonCSSContents) {
                void webViewDOM.insertCSS(commonCSSContent);
            }
            const isThread = url.includes("thread");
            if (!isThread) {
                return;
            }
            const threadCSSContents = [
                ".p-workspace__primary_view{ visibility: hidden;} .p-workspace__sidebar{ visibility: hidden; }",
                `.p-workspace-layout .p-workspace__secondary_view { width: ${webViewWidth}; }`,
                ".p-threads_footer__input_container {min-height: 0px !important}",
                "button[data-qa='close_flexpane']{visibility: hidden;}"
            ];
            for (const threadCSSContent of threadCSSContents) {
                void webViewDOM.insertCSS(threadCSSContent);
            }
        });
        webViewDivDOM.appendChild(webViewDOM);
        webviewContainerDOM.appendChild(webViewDivDOM);
    });
    window.api.InitIndex();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtcmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgtcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO0lBQ2pCLE1BQU0seUJBQXlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0lBQ3RGLElBQUcseUJBQXlCLElBQUksSUFBSSxFQUFDO1FBQ2pDLHlCQUF5QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDckQsTUFBTSxpQkFBaUIsR0FBeUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBRSxDQUFBO1lBQzVHLElBQUcsaUJBQWlCLElBQUksSUFBSSxFQUFDO2dCQUN6QixPQUFNO2FBQ1Q7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3pELGlCQUFpQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDaEMsQ0FBQyxDQUFDLENBQUE7S0FDTDtJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUUsQ0FBQyxHQUFVLEVBQUUsRUFBUyxFQUFFLEVBQUU7UUFDdEQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuRCxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUVuRCxNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDOUQscUJBQXFCLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNwRCxxQkFBcUIsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO1FBQ3JDLGFBQWEsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUVoRCxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25GLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFFLEVBQUU7WUFDaEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO1lBQ2IsS0FBSyxNQUFNLEtBQUssSUFBSSxtQkFBbUIsQ0FBQyxRQUFRLEVBQUU7Z0JBQzlDLElBQUcsS0FBSyxJQUFJLGFBQWEsRUFBQztvQkFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtvQkFDMUMsTUFBSztpQkFDUjtnQkFDRCxLQUFLLEVBQUUsQ0FBQTthQUNWO1lBRUQsbUJBQW1CLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ2xELENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNwRCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUE7UUFDNUIsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDbkMsNEJBQTRCO1FBQzVCLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNoRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUE7WUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFBO1FBQ25ELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7WUFDaEQsTUFBTSxpQkFBaUIsR0FBRztnQkFDdEIsa0dBQWtHO2dCQUNsRyxvRUFBb0U7Z0JBQ3BFLDBJQUEwSTtnQkFDMUksaUdBQWlHO2FBQ3BHLENBQUE7WUFDRCxLQUFJLE1BQU0sZ0JBQWdCLElBQUksaUJBQWlCLEVBQUM7Z0JBQzVDLEtBQUssVUFBVSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO2FBQzlDO1lBRUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN2QyxJQUFHLENBQUMsUUFBUSxFQUFDO2dCQUNULE9BQU07YUFDVDtZQUNELE1BQU0saUJBQWlCLEdBQUc7Z0JBQ3RCLCtGQUErRjtnQkFDL0YsNkRBQTZELFlBQVksS0FBSztnQkFDOUUsaUVBQWlFO2dCQUNqRSx1REFBdUQ7YUFDMUQsQ0FBQTtZQUVELEtBQUssTUFBTSxnQkFBZ0IsSUFBSSxpQkFBaUIsRUFBRTtnQkFDOUMsS0FBSyxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUE7YUFDOUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUVGLGFBQWEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDckMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ2xELENBQUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtBQUMxQixDQUFDLENBQUEifQ==