import { Button, notification } from 'antd';
import { DISPLAY_LOADING, HIDE_LOADING } from "../Constants/loading";
import {
	EDIT_USER_API_SAGA,
	GET_LIST_PROJECT_SAGA,
	GET_USER_BY_PROJECT_ID,
	GET_USER_BY_PROJECT_ID_SAGA,
	GET_USER_SAGA_API,
	GET_USER_SEARCH,
	POST_AUTHOR,
	USER_SIGNIN_SAGA_API,
	USER_SIGNUP_SAGA_API,
	USLOGIN,
} from "../Constants/constants";
import {
	STATUS_CODE,
	TOKEN_USER,
	USER_LOGIN,
} from "../../Utils/constants/settingSystem";
import {
	all,
	call,
	delay,
	fork,
	put,
	select,
	take,
	takeEvery,
	takeLatest,
} from "redux-saga/effects";

import { HeartTwoTone } from '@ant-design/icons'
import { Notification } from "../../Utils/Notification/Notification";
import { SmileOutlined } from '@ant-design/icons';
import {SmileTwoTone}from '@ant-design/icons';
import axios from "axios";
import { history } from "../../Utils/history";
import { openNotification } from '../../Utils/Notification/NotificationBox';
import { push } from "react-router-redux";
import { string } from "yup/lib/locale";
import { userService } from "../../Services/userService";

//quan lý các acton saga

//ant notification 



//-------------------đăng nhập
function* signinSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(700);
	try {
		const { data, status } = yield call(() =>
			userService.signinUser(action.userLogin)
		);

		//lưu vào store  khi đang nhập thành công
		yield localStorage.setItem(TOKEN_USER, data.content.accessToken);
		yield localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

		yield put({
			type: USLOGIN,
			userLogin: data.content,
		});

		// let { history } = yield select((state) => state.historyReducer);

		yield put({
			type: HIDE_LOADING,
		});
		yield history.push("/");
	
		Notification("success", data.message);
	} catch (error) {
		yield put({
			type: HIDE_LOADING,
		});

		if (error.response.data.message) {
			Notification("error", error.response?.data.message);
		} else {
			Notification("error", error);
		}
	}
}

export function* theoDoiSignIn() {
	yield takeEvery(USER_SIGNIN_SAGA_API, signinSaga);
}

//-------------------đăng kí

export function* signupSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	let { email, password } = action.userSignup;
	yield delay(700);
	try {
		const { data, status } = yield call(() =>
			userService.signupUser(action.userSignup)
		);

		yield put({
			type: USER_SIGNIN_SAGA_API,
			userLogin: {
				email: email,
				password: password,
			},
		});
		yield put({
			type: HIDE_LOADING,
		});

		Notification("success", data.message);
	} catch (err) {
		yield put({
			type: HIDE_LOADING,
		});

		if (err.response.data.message) {
			Notification("error", err.response?.data.message);
		} else {
			Notification("error", err);
		}
	}
}

export function* theoDoiSignUp() {
	yield takeLatest(USER_SIGNUP_SAGA_API, signupSaga);
}

//lấy danh sách user
function* getUserSaga(action) {
	try {
		const { data, status } = yield call(() =>
			userService.getUser(action.keyWord)
		);

		yield put({
			type: GET_USER_SEARCH,
			lstUserSearch: data.content,
		});
	} catch (error) {}
}

export function* theoDoiGetUser() {
	yield takeLatest(GET_USER_SAGA_API, getUserSaga);
}

function* getUserByProjectIdSaga(action) {
	const { idProject } = action;

	try {
		const { data, status } = yield call(() =>
			userService.getUserByProjectId(idProject)
		);

		yield put({
			type: GET_USER_BY_PROJECT_ID,
			arrUser: data.content,
		});
		//console.log("success");
	} catch (error) {
		//console.log(error);
		console.log("lỗi", error.response?.data);

		if (error.response?.data.content) {
			yield put({
				type: GET_USER_BY_PROJECT_ID,
				arrUser: [],
			});
		} else {
			Notification("error", "error");
		}
	}
}

export function* theoDoiGetUserByProjectIdSaga() {
	yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

//edit user
function* editUserSaga(action) {
	try {
		const { editUser } = action;
		const { data, status } = yield call(() => userService.editUser(editUser));
		const { email, passWord } = editUser;
		const userLogin = { email, passWord }

		Notification("success", data.message);
		if (status === STATUS_CODE.SUCCESS) {
			 
			const { data, status } = yield call(() =>
				userService.signinUser(userLogin)
			);

			//lưu vào store  khi đang nhập thành công
			yield localStorage.setItem(TOKEN_USER, data.content.accessToken);
			yield localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

			yield put({
				type: USLOGIN,
				userLogin: data.content,
			});
		}
		
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiEditUserSaga() {
	yield takeLatest(EDIT_USER_API_SAGA, editUserSaga);
}



function* theoDoiLogOut()
{
	yield put({
		type: DISPLAY_LOADING,
	});
	yield localStorage.removeItem(TOKEN_USER);
	yield localStorage.removeItem(USER_LOGIN);
	yield delay(1000);
  
	yield put({
		type: HIDE_LOADING,
	});
	history.push("/login");
	// Notification("success", <SmileTwoTone/> ,"See You later");
  openNotification( <HeartTwoTone twoToneColor="#eb2f96" />,"LogOut Success","See You later");  
}


export function* theoDoiLogOutSaga()
{
	yield takeLatest('LOG_OUT',theoDoiLogOut)
}