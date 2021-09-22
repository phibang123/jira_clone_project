import { baseService } from "../BaseService";

class taskService extends baseService {
	constructor() {
		super();
	}

  createTask = (taskObject) =>
  {
    return this.post(`/Project/createTask`,taskObject)
  }
	
}

export const TaskService = new taskService();
