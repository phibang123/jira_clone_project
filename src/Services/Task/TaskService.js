import { baseService } from "../BaseService";

class taskService extends baseService {
	constructor() {
		super();
	}

  createTask = (taskObject) =>
  {
    return this.post(`/Task/createTask`,taskObject)
  }
  getTaskDetail = (taskId) =>
  {
    return this.get(`/Task/getTaskDetail/taskId=${taskId}`)
  }
  updateStatusTask = (taskStatusUpdate) =>
  {
 
    return this.put(`/Task/updateStatus`,taskStatusUpdate)
  }
  updateTask = (taskUpdate) =>
  {
    return this.post(`/Task/updateTask`,taskUpdate)
  }
  deleteTask = (taskId) =>
  {

    return this.delete(`/Task/removeTask/taskId=${taskId}`,)
  }
}

export const TaskService = new taskService();
