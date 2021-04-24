import {ipcRenderer} from "electron"

const addColumnConfirmButtonDOM = document.getElementById("add-column-confirm-button")
if(addColumnConfirmButtonDOM != null){
    addColumnConfirmButtonDOM.addEventListener("click", () => {
        const addColumnInputDOM : HTMLInputElement = (<HTMLInputElement>document.getElementById("add-column-input"))
        if(addColumnInputDOM == null){
            return
        }

        console.log(`input value is ${addColumnInputDOM.value}`)
        ipcRenderer.send("add-column-main-request", addColumnInputDOM.value)
        addColumnInputDOM.value = ""
    })
}

