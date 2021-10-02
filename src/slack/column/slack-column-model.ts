import {SlackColumnView} from "./slack-column-view";

export class SlackColumnModel {
    id: number
    posX : number
    posY : number
    width : number
    height : number

    onChangedSize : (x :number, y:number,width:number, height:number) => void = () => { return }

    constructor(id:number) {
        this.id = id
        this.posX = 0
        this.posY = 0
        this.width = 0
        this.height = 0
    }

    setSize(x:number, y:number,width:number, height: number){
        this.posX = x
        this.posY = y
        this.width = width
        this.height = height
        this.onChangedSize(this.posX, this.posY,this.width, this.height)
    }
}