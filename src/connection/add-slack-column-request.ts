import {SlackColumnHtmlViewInfo} from "../slack/column/slack-column-html-view-info";

export class AddSlackColumnRequest {
    columnViewInfo = new SlackColumnHtmlViewInfo()

    constructor(init?: Partial<AddSlackColumnRequest>) {
        Object.assign(this, init)
    }
}