export class SlackColumnHtmlViewInfo{
    id  = 0
    url = ""

    constructor(init?: Partial<SlackColumnHtmlViewInfo>) {
        Object.assign(this, init)
    }
}