import {BrowserView} from "electron";

export class SlackColumnModel {
    view : BrowserView

    constructor(view: BrowserView) {
        this.view = view;
    }
}