import { baseService } from "../BaseService";

export class priorityService extends baseService {
	constructor() {
		super();
	}

  getAllPriority = () =>
  {
    return this.get(`/Priority/getAll`)
  }
	
}

export const PriorityService = new priorityService();
