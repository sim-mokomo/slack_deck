let observer : MutationObserver | null = null
let layout : Element | null = null

document.onclick = (event) => {
    if(event == null){
        return
    }
    if(event.target == null){
        return
    }

    if(observer == null){
        const layoutDOMList = document.getElementsByClassName("p-workspace-layout")
        if(layoutDOMList[0] == null){
            return;
        }
        layout = layoutDOMList[0]
        observer = new MutationObserver(records => {
            console.log(records)

            if(layout == null){
                return
            }
            const secondaryViewList = layout.getElementsByClassName("p-workspace__secondary_view")
            const secondaryViewExists = secondaryViewList.length > 0


            const styleList = layout.getElementsByTagName("style")
            for (const styleListElement of styleList) {
                const isLayoutCSS = styleListElement.innerText.includes(".p-workspace-layout")
                if(isLayoutCSS){
                    styleListElement.innerText =
                        secondaryViewExists ?
                        `.p-workspace-layout {
                            \tgrid-template-columns: auto 99%;
                            \tgrid-template-areas: 'p-workspace__primary_view p-workspace__secondary_view';
                        }` :
                        `.p-workspace-layout {
                            \tgrid-template-columns: 0px auto;
                            \tgrid-template-areas: 'p-workspace__sidebar p-workspace__primary_view';
                        }`
                    const primaryViewList = layout.getElementsByClassName("p-workspace__primary_view")
                    primaryViewList[0].setAttribute("style", secondaryViewExists ?
                        "visibility: hidden;" :
                        "")
                    break
                }
            }
        })
        observer.observe(layout, {
            childList: true
        })
    }
}