import { baseService } from "../BaseService";

class taskService extends baseService {
	constructor() {
		super();
	}

  createTask = (taskObject) =>
  {
    return this.post(`/Project/createTask`,taskObject)
  }
  getTaskDetail = (taskId) =>
  {
    return this.get(`/Project/getTaskDetail?taskId=${taskId}`)
  }
  updateStatusTask = (taskStatusUpdate) =>
  {
 
    return this.put(`/Project/updateStatus`,taskStatusUpdate)
  }
  updateTask = (taskUpdate) =>
  {
    return this.post(`/Project/updateTask`,taskUpdate)
  }
  deleteTask = (taskId) =>
  {

    return this.delete(`/Project/removeTask?taskId=${taskId}`,)
  }
}

export const TaskService = new taskService();
