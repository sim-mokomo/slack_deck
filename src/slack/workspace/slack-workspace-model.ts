import {SlackColumnModel} from "../column/slack-column-model";

export class SlackWorkspaceModel {
    columnModels : SlackColumnModel[] = []
    onDelete : (id:number) => void = (id) => { return }

    getColumnNum() {return this.getColumns().length }
    getColumns() { return this.columnModels}

    getColumn(id:number) : SlackColumnModel | undefined {
        return this.columnModels.find(x => x.id == id)
    }

    addColumn(column:SlackColumnModel){
        this.columnModels.push(column)
    }

    removeColumn(id:number){
        const deleteColumn = this.getColumn(id)
        if(deleteColumn != null){
            this.columnModels = this.columnModels.filter(x => x.id != id)
            this.onDelete(id)
        }
    }

    removeAll() : void {
        for (const columnModel of this.columnModels) {
            this.onDelete(columnModel.id)
        }
        this.columnModels = []
    }
}