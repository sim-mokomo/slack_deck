"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceColumnConfig = exports.WorkspaceConfig = exports.AppConfig = void 0;
class AppConfig {
    constructor() {
        this.current_workspace_id = "";
        this.workspaces = [];
    }
    addWorkspaceColumnConfig(workspaceId, workspaceColumnConfig) {
        const workspaceConfig = this.findWorkspaceConfigById(workspaceId);
        if (workspaceConfig != null) {
            workspaceConfig.columns.push(workspaceColumnConfig);
        }
    }
    removeWorkspaceColumnConfig(workspaceId, columnId) {
        const workspaceConfig = this.findWorkspaceConfigById(workspaceId);
        if (workspaceConfig != null) {
            workspaceConfig.columns = workspaceConfig.columns.filter(x => x.id != columnId);
        }
    }
    findWorkspaceConfigById(workspaceId) {
        const index = this.workspaces.findIndex(x => x.workspace_id == workspaceId);
        if (index < 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxTQUFTO0lBQXRCO1FBRUMseUJBQW9CLEdBQUcsRUFBRSxDQUFBO1FBQ3pCLGVBQVUsR0FBc0IsRUFBRSxDQUFBO0lBNEJuQyxDQUFDO0lBMUJBLHdCQUF3QixDQUFDLFdBQW1CLEVBQUUscUJBQTRDO1FBQ3pGLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNqRSxJQUFHLGVBQWUsSUFBSSxJQUFJLEVBQUM7WUFDMUIsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtTQUNuRDtJQUNGLENBQUM7SUFFRCwyQkFBMkIsQ0FBQyxXQUFtQixFQUFFLFFBQWdCO1FBQ2hFLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNqRSxJQUFHLGVBQWUsSUFBSSxJQUFJLEVBQUU7WUFDM0IsZUFBZSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksUUFBUSxDQUFDLENBQUE7U0FDL0U7SUFDRixDQUFDO0lBRUQsdUJBQXVCLENBQUMsV0FBa0I7UUFDekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxJQUFJLFdBQVcsQ0FBQyxDQUFBO1FBQzNFLElBQUcsS0FBSyxHQUFHLENBQUMsRUFBQztZQUNaLE9BQU8sSUFBSSxDQUFBO1NBQ1g7UUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUVELG1CQUFtQjtRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUE7SUFDdkIsQ0FBQzs7QUE5QkYsOEJBK0JDO0FBOUJPLGlCQUFPLEdBQWUsSUFBSSxTQUFTLEVBQUUsQ0FBQTtBQWlDN0MsTUFBYSxlQUFlO0lBSTNCLFlBQVksV0FBa0IsRUFBRSxPQUErQjtRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQTtRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0NBQ0Q7QUFSRCwwQ0FRQztBQUVELE1BQWEscUJBQXFCO0lBS2pDLFlBQVksRUFBVSxFQUFFLFNBQWlCLEVBQUUsUUFBZ0I7UUFDMUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtJQUMxQixDQUFDO0NBQ0Q7QUFWRCxzREFVQyJ9