import {SlackColumnBaseUi} from "./slack-column-base-ui";

export class SlackColumnModel {
    id: number
    private columnUi : SlackColumnBaseUi

    constructor(columnUi: SlackColumnBaseUi, id:number) {
        this.columnUi = columnUi
        this.id = id
    }

    setSize(x:number, y:number, height: number){
        this.columnUi.setSize(x,y,height)
    }

    delete(){
        this.columnUi.delete()
    }
}