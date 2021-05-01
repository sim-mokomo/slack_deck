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
            window.api.RemoveSlackColumnRequest(id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtcmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgtcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO0lBQ2pCLE1BQU0seUJBQXlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0lBQ3RGLElBQUcseUJBQXlCLElBQUksSUFBSSxFQUFDO1FBQ2pDLHlCQUF5QixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDckQsTUFBTSxpQkFBaUIsR0FBeUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBRSxDQUFBO1lBQzVHLElBQUcsaUJBQWlCLElBQUksSUFBSSxFQUFDO2dCQUN6QixPQUFNO2FBQ1Q7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3pELGlCQUFpQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDaEMsQ0FBQyxDQUFDLENBQUE7S0FDTDtJQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUUsQ0FBQyxHQUFVLEVBQUUsRUFBUyxFQUFFLEVBQUU7UUFDdEQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuRCxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUVuRCxNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDOUQscUJBQXFCLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNwRCxxQkFBcUIsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO1FBQ3JDLGFBQWEsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUVoRCxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25GLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFFLEVBQUU7WUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN2QyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDbEQsQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3BELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQTtRQUM1QixVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNuQyw0QkFBNEI7UUFDNUIsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2hELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQTtZQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDckMsQ0FBQyxDQUFDLENBQUE7UUFDRixVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUE7UUFDbkQsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtZQUNoRCxNQUFNLGlCQUFpQixHQUFHO2dCQUN0QixrR0FBa0c7Z0JBQ2xHLG9FQUFvRTtnQkFDcEUsMElBQTBJO2dCQUMxSSxpR0FBaUc7YUFDcEcsQ0FBQTtZQUNELEtBQUksTUFBTSxnQkFBZ0IsSUFBSSxpQkFBaUIsRUFBQztnQkFDNUMsS0FBSyxVQUFVLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUE7YUFDOUM7WUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3ZDLElBQUcsQ0FBQyxRQUFRLEVBQUM7Z0JBQ1QsT0FBTTthQUNUO1lBQ0QsTUFBTSxpQkFBaUIsR0FBRztnQkFDdEIsK0ZBQStGO2dCQUMvRiw2REFBNkQsWUFBWSxLQUFLO2dCQUM5RSxpRUFBaUU7Z0JBQ2pFLHVEQUF1RDthQUMxRCxDQUFBO1lBRUQsS0FBSyxNQUFNLGdCQUFnQixJQUFJLGlCQUFpQixFQUFFO2dCQUM5QyxLQUFLLFVBQVUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTthQUM5QztRQUNMLENBQUMsQ0FBQyxDQUFBO1FBRUYsYUFBYSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNyQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDbEQsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBQzFCLENBQUMsQ0FBQSJ9