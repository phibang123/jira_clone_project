import {
	ADD_USER_PROJECT_API_SAGA,
	CREATE_PROJECT_SAGA,
	DELETE_PROJECT_SAGA,
	GET_ALL_PROJECT_CATEGORY,
	GET_ALL_PROJECT_CATEGORY_SAGA,
	GET_LIST_PROJECT,
	GET_LIST_PROJECT_SAGA,
	GET_PROJECT_DETAIL_API,
	GET_PROJECT_DETAIL_API_SAGA,
	GET_PROJECT_DETAIL_API_SAGA_NOLOADING,
	GET_USER_BY_PROJECT_ID_SAGA,
	REMOVE_USER_PROJECT_API_SAGA,
	UPDATE_PROJECT_SAGA,
} from "../Constants/constants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../Constants/loading";
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

import { CLOSE_DRAWER } from "../Constants/drawer";
import { Notification } from "../../Utils/Notification/Notification";
import { STATUS_CODE } from "../../Utils/constants/settingSystem";
import { history } from "../../Utils/history";
import { projectService } from "../../Services/projectService";

function* createProjectSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(700);
	//lấy dử liệu ra
	try {
		const { data, status } = yield call(() =>
			projectService.createProjectAuthorization(action.newProject)
		);

		if (status === STATUS_CODE.SUCCESS) {
		
			history.push("/projectmanagement");
			Notification("success", "Add project is success");
			yield put({
				type: GET_LIST_PROJECT_SAGA,
			});
		}
	
	} catch (err) {
		console.log(err.response.data);
		yield put({
			type: HIDE_LOADING,
		});
		Notification("error", "Add project is fail!");
	}
	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiCreatePrjectSaga() {
	yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

//------------------- lấy danh sách project all

function* getListProjectSaga(action) {
	try {
		const { data, status } = yield call(() => projectService.getListProject());
		//sau khi lấy dử liệu từ api về thành công dispatch len reducer
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_LIST_PROJECT,
				projectList: data.content,
			});
			yield put({type:GET_USER_BY_PROJECT_ID_SAGA,idProject: data.content[0]?.id})
		}
	} catch (error) {
		console.log(error);
	}
}

export function* theoDoiGetListProjectSaga() {
	yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

//update-project

function* updateProjectSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(700);
	try {
		const { data, status } = yield call(() =>
			projectService.updateProject(action.projectUpdate)
		);
		//sau khi lấy dử liệu từ api về thành công dispatch len reducer
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_LIST_PROJECT_SAGA,
			});
			yield put({
				type: CLOSE_DRAWER,
			});
		}
	} catch (error) {
		console.log(error);
		yield put({
			type: HIDE_LOADING,
		});
	}
	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiUpdateProjectSaga() {
	yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

// delete saga

function* deleteProjectSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(700);
	try {
		const { data, status } = yield call(() =>
			projectService.deleteProject(action.idProject)
		);
		//sau khi lấy dử liệu từ api về thành công dispatch len reducer
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_LIST_PROJECT_SAGA,
			});
			yield put({
				type: CLOSE_DRAWER,
			});
			Notification("success", "Delete project is success");
		} else {
			Notification("error", "Delete project is fail!");
		}
	} catch (error) {
		console.log(error);
		yield put({
			type: HIDE_LOADING,
		});
		Notification("error", "Delete project is fail!");
	}
	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiDeleteProject() {
	yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}



//thêm người dùng vào dự án
function* addUserProjectSaga(action) {
  console.log(action)
	try {
		const { data, status } = yield call(() =>
			projectService.assignUserProject(action.userProject)
		);
		console.log('sss',status)
		if (status === STATUS_CODE.SUCCESS)
		{
	    Notification("success", "Add user into Project success")
			yield put({
				type: GET_LIST_PROJECT_SAGA
			})
		}
		

	   
	} catch (error) {
		
		Notification("error", error.response.data.content)
	}
}


export function* theoDoiAddUserProject()
{
	yield takeLatest(ADD_USER_PROJECT_API_SAGA, addUserProjectSaga);
}

//delete user from project saga

function* removeUserProject(action) {

	try {
		const { data, status } = yield call(() =>
			projectService.removeUserFromProject(action.userProject)
		);
		console.log('sss',status)
		if (status === STATUS_CODE.SUCCESS)
		{
	    Notification("success", "Remove user from Project success")
			yield put({
				type: GET_LIST_PROJECT_SAGA
			})
		}
		

	   
	} catch (error) {
		Notification("warning", "Remove user from Project failt!")
	}
}

export function* theoDoiRemoveUserProject()
{
	yield takeLatest(REMOVE_USER_PROJECT_API_SAGA, removeUserProject);
}


//get detail from project saga

function* getProjectDetail(action)
{
	yield put({
		type: DISPLAY_LOADING,
	});
  yield delay(700)
	try {
		const { data, status } = yield call(() =>
			projectService.getProjectDetail(action.projectId)
		);
	
		//lấy dử liệu thành công đưa dử liệu lên reducer
		yield put({
			type: GET_PROJECT_DETAIL_API,
			projectDetail: data.content
		})
	   
	} catch (error) {
		
		yield put({
			type: HIDE_LOADING,
		});
		Notification("warning", "Error 404 not found!")
	  history.push('/projectmanagement')
	}
	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiGetProjectDetail()
{
	yield takeLatest(GET_PROJECT_DETAIL_API_SAGA, getProjectDetail);
}



//get detail from project saga

function* getProjectDetailNoLoading(action)
{
	
	try {
		const { data, status } = yield call(() =>
			projectService.getProjectDetail(action.projectId)
		);
	
		//lấy dử liệu thành công đưa dử liệu lên reducer
		yield put({
			type: GET_PROJECT_DETAIL_API,
			projectDetail: data.content
		})
	   
	} catch (error) {
		
	
	}

}

export function* theoDoiGetProjectDetailNoLoading()
{
	yield takeLatest(GET_PROJECT_DETAIL_API_SAGA_NOLOADING, getProjectDetailNoLoading);
}
