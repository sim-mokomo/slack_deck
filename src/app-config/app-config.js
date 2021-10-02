"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceColumnConfig = exports.WorkspaceConfig = exports.AppConfig = void 0;
class AppConfig {
    constructor() {
        this.workspaces = [];
    }
    addWorkspaceColumnConfig(workspaceId, workspaceColumnConfig) {
        const workspaceConfig = this.findWorkspaceConfig(workspaceId);
        if (workspaceConfig != null) {
            workspaceConfig.columns.push(workspaceColumnConfig);
        }
    }
    removeWorkspaceColumnConfig(workspaceId, columnId) {
        const workspaceConfig = this.findWorkspaceConfig(workspaceId);
        if (workspaceConfig != null) {
            workspaceConfig.columns = workspaceConfig.columns.filter(x => x.id != columnId);
        }
    }
    getWorkspaceConfigHead() {
        return this.workspaces[0];
    }
    findWorkspaceConfig(workspaceId) {
        const index = this.workspaces.findIndex(x => x.workspace_id == workspaceId);
        if (index < 0) {
            return null;
        }
        return this.workspaces[index];
    }
}
exports.AppConfig = AppConfig;
AppConfig.default = new AppConfig();
class WorkspaceConfig {
    constructor(workspaceId, columns) {
        this.workspace_id = workspaceId;
        this.columns = columns;
    }
}
exports.WorkspaceConfig = WorkspaceConfig;
class WorkspaceColumnConfig {
    constructor(id, channelId, threadTs) {
        this.id = id;
        this.channel_id = channelId;
        this.thread_ts = threadTs;
    }
}
exports.WorkspaceColumnConfig = WorkspaceColumnConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxTQUFTO0lBQXRCO1FBRUMsZUFBVSxHQUFzQixFQUFFLENBQUE7SUE0Qm5DLENBQUM7SUExQkEsd0JBQXdCLENBQUMsV0FBbUIsRUFBRSxxQkFBNEM7UUFDekYsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzdELElBQUcsZUFBZSxJQUFJLElBQUksRUFBQztZQUMxQixlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1NBQ25EO0lBQ0YsQ0FBQztJQUVELDJCQUEyQixDQUFDLFdBQW1CLEVBQUUsUUFBZ0I7UUFDaEUsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzdELElBQUcsZUFBZSxJQUFJLElBQUksRUFBRTtZQUMzQixlQUFlLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsQ0FBQTtTQUMvRTtJQUNGLENBQUM7SUFFRCxzQkFBc0I7UUFDckIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxXQUFrQjtRQUNyQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksV0FBVyxDQUFDLENBQUE7UUFDM0UsSUFBRyxLQUFLLEdBQUcsQ0FBQyxFQUFDO1lBQ1osT0FBTyxJQUFJLENBQUE7U0FDWDtRQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM5QixDQUFDOztBQTdCRiw4QkE4QkM7QUE3Qk8saUJBQU8sR0FBZSxJQUFJLFNBQVMsRUFBRSxDQUFBO0FBZ0M3QyxNQUFhLGVBQWU7SUFJM0IsWUFBWSxXQUFrQixFQUFFLE9BQStCO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFBO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7Q0FDRDtBQVJELDBDQVFDO0FBRUQsTUFBYSxxQkFBcUI7SUFLakMsWUFBWSxFQUFVLEVBQUUsU0FBaUIsRUFBRSxRQUFnQjtRQUMxRCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUNaLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO0lBQzFCLENBQUM7Q0FDRDtBQVZELHNEQVVDIn0=