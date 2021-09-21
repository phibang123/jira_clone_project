import { DOMAIN, TOKEN_CYBERSOFT } from "../Utils/constants/settingSystem";

import axios from "axios";
import { baseService } from "./BaseService";

export class UserService extends baseService {
	constructor() {
		super();
	}

	signinUser = (userLogin) => {
		return this.post(`/Users/signin`, userLogin);
	};
	getUser = (keyWord) => {
		return this.get(`/Users/getUser?keyword=${keyWord}`);
	};

	
}

export const userService = new UserService();
