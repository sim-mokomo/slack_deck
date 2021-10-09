export class SlackColumnModel {
    id: number
    rectangle: Electron.Rectangle

    onChangedSize : (rectangle: Electron.Rectangle) => void = () => { return }

    constructor(id:number) {
        this.id = id
        this.rectangle = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    }

    setSize(rectangle : Electron.Rectangle){
        this.rectangle = rectangle
        this.onChangedSize(rectangle)
    }
}