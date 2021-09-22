import { DOMAIN, TOKEN_CYBERSOFT, TOKEN_USER } from "../Utils/constants/settingSystem"

import axios from "axios"
import { baseService } from "./BaseService"

class ProjectService extends baseService  {
    
  constructor()
  {
    super();
  }
  getAllProjectCategory = () =>
  {
     return this.get(`/ProjectCategory`)
  }
  createProject = (newProject) =>
  {
    return this.post(`/Project/createProject`,newProject)
  }
  createProjectAuthorization = (newProject) =>
  {
    return this.post(`/Project/createProjectAuthorize`,newProject)
  }
  getListProject = () =>
  {
    return this.get(`/Project/getAllProject`)
  }
  updateProject = (projectUpdate) =>
  {
    return this.put(`/Project/updateProject?projectId=${projectUpdate.id}`,projectUpdate)
  }
  deleteProject = (id) =>
  {
    return this.delete(`/Project/deleteProject?projectId=${id}`)
  }

  //THÊM XÓA NGƯỜI DÙNG TRONG DỰ ÁN
  assignUserProject = (UserProject) =>
  {
   
		return this.post("/Project/assignUserProject", UserProject);
  };
  removeUserFromProject = (userProject) =>
  {
    return this.post(`/Project/removeUserFromProject`,userProject)
  }
  //Detail của project
  getProjectDetail = (projectId) =>
  {
    return this.get(`/Project/getProjectDetail?id=${projectId}`,)
  }


}

export const projectService = new ProjectService()

