import {BrowserView} from "electron";

export class SlackColumnModel {
    id: number
    view : BrowserView
    constructor(id:number, view: BrowserView) {
        this.id = id
        this.view = view;
    }
}