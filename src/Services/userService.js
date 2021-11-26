import { DOMAIN, TOKEN_CYBERSOFT } from "../Utils/constants/settingSystem";

import axios from "axios";
import { baseService } from "./BaseService";

export class UserService extends baseService {
	constructor() {
		super();
	}

	signinUser = (userLogin) =>
	{
		console.log(userLogin)
		return this.post(`/Users/signin`, userLogin);
	};
	signupUser = (userSignup) => {
		return this.post(`/Users/signup`, userSignup);
	};
	getUser = (keyWord) => {
		return this.get(`/Users/getUser/keyword=${keyWord}`);
	};
	getUserByProjectId = (idProject) =>
	{
		 return this.get(`/Users/getUserByProjectId/idProject=${idProject}`)
	}
	editUser = (editUser) =>
	{
		return this.put(`/Users/editUser`,editUser)
	}
	textUser = () =>
	{
	
		return this.postNotAuthor(`/Users/TestToken`)
	}
}

export const userService = new UserService();
