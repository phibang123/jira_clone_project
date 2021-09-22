import { baseService } from "../BaseService";

class statusService extends baseService {
	constructor() {
		super();
	}

  getAllStatus = () =>
  {
     return this.get(`/Status/getAll`)
  }
	
}

export const StatusService = new statusService();
