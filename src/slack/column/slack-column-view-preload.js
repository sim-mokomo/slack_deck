"use strict";
let observer = null;
let layout = null;
document.onclick = (event) => {
    if (event == null) {
        return;
    }
    if (event.target == null) {
        return;
    }
    if (observer == null) {
        const layoutDOMList = document.getElementsByClassName("p-workspace-layout");
        if (layoutDOMList[0] == null) {
            return;
        }
        layout = layoutDOMList[0];
        observer = new MutationObserver(records => {
            console.log(records);
            if (layout == null) {
                return;
            }
            const secondaryViewList = layout.getElementsByClassName("p-workspace__secondary_view");
            const secondaryViewExists = secondaryViewList.length > 0;
            const styleList = layout.getElementsByTagName("style");
            for (const styleListElement of styleList) {
                const isLayoutCSS = styleListElement.innerText.includes(".p-workspace-layout");
                if (isLayoutCSS) {
                    styleListElement.innerText =
                        secondaryViewExists ?
                            `.p-workspace-layout {
                            \tgrid-template-columns: auto 99%;
                            \tgrid-template-areas: 'p-workspace__primary_view p-workspace__secondary_view';
                        }` :
                            `.p-workspace-layout {
                            \tgrid-template-columns: 0px auto;
                            \tgrid-template-areas: 'p-workspace__sidebar p-workspace__primary_view';
                        }`;
                    const primaryViewList = layout.getElementsByClassName("p-workspace__primary_view");
                    primaryViewList[0].setAttribute("style", secondaryViewExists ?
                        "visibility: hidden;" :
                        "");
                    break;
                }
            }
        });
        observer.observe(layout, {
            childList: true
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2stY29sdW1uLXZpZXctcHJlbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNsYWNrLWNvbHVtbi12aWV3LXByZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksUUFBUSxHQUE2QixJQUFJLENBQUE7QUFDN0MsSUFBSSxNQUFNLEdBQW9CLElBQUksQ0FBQTtBQUVsQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDekIsSUFBRyxLQUFLLElBQUksSUFBSSxFQUFDO1FBQ2IsT0FBTTtLQUNUO0lBQ0QsSUFBRyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksRUFBQztRQUNwQixPQUFNO0tBQ1Q7SUFFRCxJQUFHLFFBQVEsSUFBSSxJQUFJLEVBQUM7UUFDaEIsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLENBQUE7UUFDM0UsSUFBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFDO1lBQ3hCLE9BQU87U0FDVjtRQUNELE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekIsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUVwQixJQUFHLE1BQU0sSUFBSSxJQUFJLEVBQUM7Z0JBQ2QsT0FBTTthQUNUO1lBQ0QsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsc0JBQXNCLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtZQUN0RixNQUFNLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7WUFHeEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3RELEtBQUssTUFBTSxnQkFBZ0IsSUFBSSxTQUFTLEVBQUU7Z0JBQ3RDLE1BQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQTtnQkFDOUUsSUFBRyxXQUFXLEVBQUM7b0JBQ1gsZ0JBQWdCLENBQUMsU0FBUzt3QkFDdEIsbUJBQW1CLENBQUMsQ0FBQzs0QkFDckI7OzswQkFHRSxDQUFDLENBQUM7NEJBQ0o7OzswQkFHRSxDQUFBO29CQUNOLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO29CQUNsRixlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO3dCQUMxRCxxQkFBcUIsQ0FBQyxDQUFDO3dCQUN2QixFQUFFLENBQUMsQ0FBQTtvQkFDUCxNQUFLO2lCQUNSO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3JCLFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtLQUNMO0FBQ0wsQ0FBQyxDQUFBIn0=