import {WorkspaceColumnConfig} from "./workspace-column-config";

export class WorkspaceConfig {
    workspace_id = ""
    private columns: WorkspaceColumnConfig[] = []

    clear() { this.columns = []}

    getColumns() { return this.columns}

    getColumnNum() : number{return this.columns.length}

    getColumn(columnId : number) : WorkspaceColumnConfig | null {
        const index = this.getColumnIndex(columnId)
        if(index < 0 || index >= this.columns.length){
            return null
        }

        return this.columns[index]
    }

    addColumn(columnConfig:WorkspaceColumnConfig) : void {
        this.columns.push(columnConfig)
    }

    removeColumn(columnId:number){
        this.columns = this.columns.filter(x => x.id != columnId)
    }

    private getColumnIndex(columnId:number) : number{
        return this.columns.findIndex(x => x.id == columnId)
    }
}