import {SlackColumnModel} from "./slack-column-model";
import {BrowserView, BrowserWindow, shell} from "electron";

export class SlackWorkspaceModel {
    columnModels : SlackColumnModel[] = []

    getColumnNum() {return this.getColumns().length }
    getColumns() { return this.columnModels}

    getColumn(id:number){
        return this.columnModels.find(x => x.id == id)
    }

    addColumn(column:SlackColumnModel){
        this.columnModels.push(column)
    }

    removeColumn(id:number){
        const deleteColumn = this.getColumn(id)
        if(deleteColumn != null){
            this.columnModels = this.columnModels.filter(x => x.id != id)
            deleteColumn.delete()
        }
    }

    createSlackColumn(parentWindow:BrowserWindow,url:string) : SlackColumnModel {
        return new SlackColumnModel(parentWindow,this.columnModels.length, url)
    }

}