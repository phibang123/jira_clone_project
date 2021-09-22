import { baseService } from "../BaseService";

class taskTypeService extends baseService {
	constructor() {
		super();
	}

  getAllTaskType = () =>
  {
    return this.get(`/TaskType/getAll`)
  }
	
}

export const TaskTypeService = new taskTypeService();
