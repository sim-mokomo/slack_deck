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
    findWorkspaceConfig(workspaceId) {
        const index = this.workspaces.findIndex(x => x.workspace_id == workspaceId);
        if (index < 0) {
            return null;
        }
        return this.workspaces[index];
    }
    findWorkSpaceConfigByIndex(index) {
        if (index < 0 || index >= this.workspaces.length) {
            return null;
        }
        return this.workspaces[index];
    }
    getWorkspaceConfigs() {
        return this.workspaces;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxTQUFTO0lBQXRCO1FBRUMsZUFBVSxHQUFzQixFQUFFLENBQUE7SUFvQ25DLENBQUM7SUFsQ0Esd0JBQXdCLENBQUMsV0FBbUIsRUFBRSxxQkFBNEM7UUFDekYsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzdELElBQUcsZUFBZSxJQUFJLElBQUksRUFBQztZQUMxQixlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1NBQ25EO0lBQ0YsQ0FBQztJQUVELDJCQUEyQixDQUFDLFdBQW1CLEVBQUUsUUFBZ0I7UUFDaEUsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzdELElBQUcsZUFBZSxJQUFJLElBQUksRUFBRTtZQUMzQixlQUFlLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsQ0FBQTtTQUMvRTtJQUNGLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxXQUFrQjtRQUNyQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksV0FBVyxDQUFDLENBQUE7UUFDM0UsSUFBRyxLQUFLLEdBQUcsQ0FBQyxFQUFDO1lBQ1osT0FBTyxJQUFJLENBQUE7U0FDWDtRQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBRUQsMEJBQTBCLENBQUMsS0FBWTtRQUN0QyxJQUFHLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDO1lBQy9DLE9BQVEsSUFBSSxDQUFBO1NBQ1o7UUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUVELG1CQUFtQjtRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDdkIsQ0FBQzs7QUFyQ0YsOEJBc0NDO0FBckNPLGlCQUFPLEdBQWUsSUFBSSxTQUFTLEVBQUUsQ0FBQTtBQXdDN0MsTUFBYSxlQUFlO0lBSTNCLFlBQVksV0FBa0IsRUFBRSxPQUErQjtRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQTtRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0NBQ0Q7QUFSRCwwQ0FRQztBQUVELE1BQWEscUJBQXFCO0lBS2pDLFlBQVksRUFBVSxFQUFFLFNBQWlCLEVBQUUsUUFBZ0I7UUFDMUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtJQUMxQixDQUFDO0NBQ0Q7QUFWRCxzREFVQyJ9