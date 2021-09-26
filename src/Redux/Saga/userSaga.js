import { ADD_USER_PROJECT_API_SAGA, GET_LIST_PROJECT_SAGA, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA_API, GET_USER_SEARCH, POST_AUTHOR, USER_SIGNIN_SAGA_API, USER_SIGNUP_SAGA_API, USLOGIN } from "../Constants/constants";
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
			userLogin: data.content
		})

		



		// let { history } = yield select((state) => state.historyReducer);

	
		yield put({
			type: HIDE_LOADING,
		});
		yield history.push("/projectmanagement");
		console.log(data)
		Notification('success',data.message)
	} catch (error) {
		yield put({
			type: HIDE_LOADING,
		});

		if (error.response.data.message)
		{
			Notification('error',error.response?.data.message)
		}
		else
		{
			Notification('error',error)
		}
		
	}
}

export function* theoDoiSignIn() {
	yield takeEvery(USER_SIGNIN_SAGA_API, signinSaga);
}

//-------------------đăng kí

export function* signupSaga(action)
{
	yield put({
		type: DISPLAY_LOADING,
	});
	let {email,password} =  action.userSignup
	yield delay(700);
	try
	{
		const { data, status } = yield call(() => userService.signupUser(action.userSignup))
		
    
		yield put({
			type: USER_SIGNIN_SAGA_API,
			userLogin: {
				email: email,
				password: password
			}
		})
		yield put({
			type: HIDE_LOADING,
		});

		Notification('success',data.message)
	}
	catch (err)
	{
		yield put({
			type: HIDE_LOADING,
		});

		if (err.response.data.message)
		{
			Notification('error',err.response?.data.message)
		}
		else
		{
			Notification('error',err)
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
			lstUserSearch: data.content
		})
	   
	} catch (error) {


	}
}


export function* theoDoiGetUser()
{
	yield takeLatest(GET_USER_SAGA_API, getUserSaga);
}



function* getUserByProjectIdSaga(action)
{

	const { idProject } = action
	console.log('alo')
	console.log('alo',idProject)
	try
	{
		const { data, status } = yield call(() =>
			userService.getUserByProjectId(idProject)
		);

		yield put({
			type: GET_USER_BY_PROJECT_ID,
			arrUser: data.content
		})
	  console.log('success')
	}
	catch (error)
	{
		console.log(error)
		console.log('lỗi',error.response?.data)
		
		if (error.response?.data.content)
		{
		
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





