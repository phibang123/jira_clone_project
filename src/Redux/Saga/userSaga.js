import { ADD_USER_PROJECT_API_SAGA, GET_LIST_PROJECT_SAGA, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA_API, GET_USER_SEARCH, USER_SIGNIN_SAGA_API, USLOGIN } from "../Constants/constants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../Constants/loading";
import { STATUS_CODE, TOKEN_USER, USER_LOGIN } from "../../Utils/constants/settingSystem";
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

import { Notification } from "../../Utils/Notification/Notification";
import axios from "axios";
import {history} from '../../Utils/history'
import { push } from "react-router-redux";
import { string } from "yup/lib/locale";
import { userService } from "../../Services/userService";

//quan lý các acton saga
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
		localStorage.setItem(TOKEN_USER, data.content.accessToken);
		localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

		yield put({
			type: USLOGIN,
			userLogin: data.content
		})

		



		// let { history } = yield select((state) => state.historyReducer);

		history.push("/jira");
		yield put({
			type: HIDE_LOADING,
		});
	} catch (error) {
		yield put({
			type: HIDE_LOADING,
		});
		console.log(error.response.data);
	}
}

export function* theoDoiSignIn() {
	yield takeLatest(USER_SIGNIN_SAGA_API, signinSaga);
}

//lấy danh sách user
function* getUserSaga(action) {

	try {
		const { data, status } = yield call(() =>
			userService.getUser(action.keyWord)
		);
 
		yield put({
			type: GET_USER_SEARCH,
			lstUserSearch: data.content
		})
	   
	} catch (error) {


	}
}


export function* theoDoiGetUser()
{
	yield takeLatest(GET_USER_SAGA_API, getUserSaga);
}



function* getUserByProjectIdSaga(action) {
  const {idProject} =  action
	try
	{
		const { data, status } = yield call(() =>
			userService.getUserByProjectId(idProject)
		);

		yield put({
			type: GET_USER_BY_PROJECT_ID,
			arrUser: data.content
		})
	
	}
	catch (error)
	{
		console.log(error)
		console.log(error.response?.data)
		
		if (error.response?.data.content)
		{
			Notification('info', error.response.data.content)
			yield put({
				type: GET_USER_BY_PROJECT_ID,
				arrUser: []
			})
		}
		else
		{
			Notification('error','error')
		}
	}
}


export function* theoDoiGetUserByProjectIdSaga()
{
	yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

