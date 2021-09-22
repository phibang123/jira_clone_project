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
    console.log('taskStatusUpdate',taskStatusUpdate)
    return this.put(`/Project/updateStatus`,taskStatusUpdate)
  }
}

export const TaskService = new taskService();
