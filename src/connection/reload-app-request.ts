import {SlackColumnHtmlViewInfo} from "../slack/column/slack-column-html-view-info";
import {WorkspaceIconHtmlViewInfo} from "../slack/workspace/workspace-icon-html-view-info";

export class ReloadAppRequest {
    columnViewInfoList : SlackColumnHtmlViewInfo[] = []
    workspaceIconInfoList: WorkspaceIconHtmlViewInfo[] = []

    constructor(init?: Partial<ReloadAppRequest>) {
        Object.assign(this, init)
    }
}