"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackWorkspaceModel = void 0;
class SlackWorkspaceModel {
    constructor() {
        this.columnModels = [];
        this.onDelete = (id) => { return; };
    }
    getColumnNum() { return this.getColumns().length; }
    getColumns() { return this.columnModels; }
    getColumn(id) {
        return this.columnModels.find(x => x.id == id);
    }
    addColumn(column) {
        this.columnModels.push(column);
    }
    removeColumn(id) {
        const deleteColumn = this.getColumn(id);
        if (deleteColumn != null) {
            this.columnModels = this.columnModels.filter(x => x.id != id);
            this.onDelete(id);
        }
    }
}
exports.SlackWorkspaceModel = SlackWorkspaceModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2std29ya3NwYWNlLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xhY2std29ya3NwYWNlLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsbUJBQW1CO0lBQWhDO1FBQ0ksaUJBQVksR0FBd0IsRUFBRSxDQUFBO1FBQ3RDLGFBQVEsR0FBeUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU0sQ0FBQyxDQUFDLENBQUE7SUFvQnZELENBQUM7SUFsQkcsWUFBWSxLQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUM7SUFDakQsVUFBVSxLQUFLLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQSxDQUFBLENBQUM7SUFFeEMsU0FBUyxDQUFDLEVBQVM7UUFDZixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQXVCO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBUztRQUNsQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZDLElBQUcsWUFBWSxJQUFJLElBQUksRUFBQztZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3BCO0lBQ0wsQ0FBQztDQUNKO0FBdEJELGtEQXNCQyJ9