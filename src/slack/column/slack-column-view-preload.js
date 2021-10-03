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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2stY29sdW1uLXZpZXctcHJlbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNsYWNrLWNvbHVtbi12aWV3LXByZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksUUFBUSxHQUE2QixJQUFJLENBQUE7QUFDN0MsSUFBSSxNQUFNLEdBQW9CLElBQUksQ0FBQTtBQUVsQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDekIsSUFBRyxLQUFLLElBQUksSUFBSSxFQUFDO1FBQ2IsT0FBTTtLQUNUO0lBQ0QsSUFBRyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksRUFBQztRQUNwQixPQUFNO0tBQ1Q7SUFFRCxJQUFHLFFBQVEsSUFBSSxJQUFJLEVBQUM7UUFDaEIsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLENBQUE7UUFDM0UsSUFBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFDO1lBQ3hCLE9BQU87U0FDVjtRQUNELE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekIsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEMsSUFBRyxNQUFNLElBQUksSUFBSSxFQUFDO2dCQUNkLE9BQU07YUFDVDtZQUNELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDLDZCQUE2QixDQUFDLENBQUE7WUFDdEYsTUFBTSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1lBRXhELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN0RCxLQUFLLE1BQU0sZ0JBQWdCLElBQUksU0FBUyxFQUFFO2dCQUN0QyxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUE7Z0JBQzlFLElBQUcsV0FBVyxFQUFDO29CQUNYLGdCQUFnQixDQUFDLFNBQVM7d0JBQ3RCLG1CQUFtQixDQUFDLENBQUM7NEJBQ3JCOzs7MEJBR0UsQ0FBQyxDQUFDOzRCQUNKOzs7MEJBR0UsQ0FBQTtvQkFDTixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsc0JBQXNCLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtvQkFDbEYsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzt3QkFDMUQscUJBQXFCLENBQUMsQ0FBQzt3QkFDdkIsRUFBRSxDQUFDLENBQUE7b0JBQ1AsTUFBSztpQkFDUjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNyQixTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7S0FDTDtBQUNMLENBQUMsQ0FBQSJ9