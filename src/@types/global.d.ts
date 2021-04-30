declare global {
    interface Window {
        api : SandBox;
    }
}

export interface SandBox{
    InitIndex : () => void
    AddSlackColumnReply:(listener:(url:string,id:number) => void) => void
    AddSlackColumnRequest:(url:string) => void
    RemoveSlackColumnRequest:(id:number) => void
    OpenBrowser:(url:string) => void
}