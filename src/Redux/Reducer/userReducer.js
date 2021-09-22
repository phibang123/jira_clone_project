import { GET_USER_BY_PROJECT_ID, GET_USER_SEARCH, USLOGIN } from "../Constants/constants";

import { USER_LOGIN } from "../../Utils/constants/settingSystem";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
	usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
	userLogin: usLogin,
	userSearch: [],
	arrUser: []

};
const userReduer = (state = stateDefault, action) => {
	switch (action.type) {
		case USLOGIN: {
			state.userLogin = action.userLogin;
			return { ...state };
		}
		case GET_USER_SEARCH: {
			state.userSearch = action.lstUserSearch;
			return {...state}
		}
		case GET_USER_BY_PROJECT_ID:
			{
	
				return {...state,arrUser: action.arrUser}
			}
		default:
			return { ...state };
	}
};
export default userReduer;


// const getUserByProjectIdSaga = (state = stateDefault, action) =>
// {
// 	const idProject = action.idProject
// 	switch (action.type) {
// 		case USLOGIN: {
// 			state.userLogin = action.userLogin;
// 			return { ...state };
// 		}
// 		case GET_USER_SEARCH: {
// 			state.userSearch = action.lstUserSearch;
// 			return {...state}
// 			}
// 		default:
// 			return { ...state };
// 	}
// };
// export default userReduer;
