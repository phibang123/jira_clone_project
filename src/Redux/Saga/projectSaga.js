import {
	ADD_USER_PROJECT_API_SAGA,
	CREATE_PROJECT_SAGA,
	DELETE_PROJECT_SAGA,
	GET_ALL_PROJECT_CATEGORY,
	GET_ALL_PROJECT_CATEGORY_SAGA,
	GET_LIST_PROJECT,
	GET_LIST_PROJECT_ISSUES,
	GET_LIST_PROJECT_SAGA,
	GET_LIST_PROJECT_SAGA_ISSUES,
	GET_PROJECT_DETAIL_API,
	GET_PROJECT_DETAIL_API_SAGA,
	GET_PROJECT_DETAIL_API_SAGA_NOLOADING,
	GET_USER_BY_PROJECT_ID_SAGA,
	LEAVE_PROJECT_SAGA,
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
			//history.push("/projectmanagement");
			Notification("success", "Add project is success");
			yield put({
				type: GET_LIST_PROJECT_SAGA,
			});
	
			yield put({
				type: GET_LIST_PROJECT_SAGA_ISSUES,
		
			});
		}
	} catch (err) {
		console.log(err.response.data);
		yield put({
			type: HIDE_LOADING,
		});
		Notification("error", err.response?.data.content);
		//Notification("error", "Add project is fail!");
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
			// //console.log(data.content[0]?.id)
			// yield put({
			// 	type: GET_USER_BY_PROJECT_ID_SAGA,
			// 	idProject: data.content[0]?.id,
			// });
		}
	} catch (error) {
		console.log(error);
	
		if (error.response.data.statusCode === 405)
		{
			console.log(123)
			yield put({
				type: "LOG_OUT"
			})
			Notification("error",error.response.data.content)
		}
	}
}

export function* theoDoiGetListProjectSaga() {
	yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}


//------------------- lấy danh sách project all issues

function* getListProjectIssuesSaga(action) {
	try {
		const { data, status } = yield call(() => projectService.getListProject());
		//sau khi lấy dử liệu từ api về thành công dispatch len reducer
		if (status === STATUS_CODE.SUCCESS)
		{
			let user = yield JSON.parse(localStorage.getItem("userlogin"));
			let projectIssues = yield data.content?.filter(project => project.creator?.id === user?.id)
      let projectAssign = yield data.content?.filter(issue => issue.members.find(id => id.userId === user?.id)?.userId === user?.id)
		
			yield put({
				type: GET_LIST_PROJECT_ISSUES,
				projectListIssues: projectIssues,
	      projectAssign: projectAssign
				//projectALL: data.content
			});
	
			
			yield put({
				type: GET_USER_BY_PROJECT_ID_SAGA,
				idProject: projectIssues[0]?.id,
	
			});
		}
	} catch (error) {
		console.log(error);
	}
}

export function* theoDoiGetListProjectIssuesSaga() {
	yield takeLatest(GET_LIST_PROJECT_SAGA_ISSUES, getListProjectIssuesSaga);
}

//update-project

function* updateProjectSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(700);
	console.log(action);
	const { data, status } = yield call(() =>
		projectService.getProjectDetail(action.projectUpdate?.id)
	);
	
	let user = yield JSON.parse(localStorage.getItem("userlogin"));

	if (data.content?.creator.id !== user?.id) {

		Notification("error", "You not authorized ");
		yield put({
			type: HIDE_LOADING,
		});
		return;
	}
	try {
		const { data, status } = yield call(() =>
			projectService.updateProject(action.projectUpdate)
		);
		//sau khi lấy dử liệu từ api về thành công dispatch len reducer
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_LIST_PROJECT_SAGA,
			});yield put({
				type: GET_LIST_PROJECT_SAGA_ISSUES,
		
			});
			yield put({
				type: CLOSE_DRAWER,
			});
			Notification("success", "Update project is success");
		}
	} catch (error) {
		console.log(error);
		yield put({
			type: HIDE_LOADING,
		});
		Notification("error", error.response?.data.content);
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

	const { data, status } = yield call(() =>
		projectService.getProjectDetail(action.idProject)
	);
	let user = yield JSON.parse(localStorage.getItem("userlogin"));
	if (data.content?.creator.id !== user?.id) {

		Notification("error", "You not authorized ");
		yield put({
			type: HIDE_LOADING,
		});
		return;
	}
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
				type: GET_LIST_PROJECT_SAGA_ISSUES,

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
	try {
		const { data, status } = yield call(() =>
			projectService.assignUserProject(action.userProject)
		);

		if (status === STATUS_CODE.SUCCESS) {
			Notification("success", "Add user into Project success");
			yield put({
				type: GET_LIST_PROJECT_SAGA,
			});

			yield put({
				type: GET_LIST_PROJECT_SAGA_ISSUES,

			});
		}
	} catch (error) {
		Notification("error", error.response.data.content);
	}
}

export function* theoDoiAddUserProject() {
	yield takeLatest(ADD_USER_PROJECT_API_SAGA, addUserProjectSaga);
}

//delete user from project saga

function* removeUserProject(action) {
	try {
		const { data, status } = yield call(() =>
			projectService.removeUserFromProject(action.userProject)
		);
		console.log("sss", status);
		if (status === STATUS_CODE.SUCCESS) {
			Notification("success", "Remove user from Project success");
			yield put({
				type: GET_LIST_PROJECT_SAGA,
			});

			yield put({
				type: GET_LIST_PROJECT_SAGA_ISSUES,
			
			});
		}
	} catch (error) {
		Notification("warning", "Remove user from Project failt!");
	}
}

export function* theoDoiRemoveUserProject() {
	yield takeLatest(REMOVE_USER_PROJECT_API_SAGA, removeUserProject);
}

//get detail from project saga

function* getProjectDetail(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(700);
	try {
		const { data, status } = yield call(() =>
			projectService.getProjectDetail(action.projectId)
		);

		//lấy dử liệu thành công đưa dử liệu lên reducer
		yield put({
			type: GET_PROJECT_DETAIL_API,
			projectDetail: data.content,
		});
	} catch (error) {
		yield put({
			type: HIDE_LOADING,
		});
		Notification("warning", "Error 404 not found!");
		history.push("/projectmanagement");
	}
	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiGetProjectDetail() {
	yield takeLatest(GET_PROJECT_DETAIL_API_SAGA, getProjectDetail);
}





//get detail from project saga

function* getProjectDetailNoLoading(action) {
	try {
		const { data, status } = yield call(() =>
			projectService.getProjectDetail(action.projectId)
		);

		//lấy dử liệu thành công đưa dử liệu lên reducer
		yield put({
			type: GET_PROJECT_DETAIL_API,
			projectDetail: data.content,
		});
	} catch (error) {}
}

export function* theoDoiGetProjectDetailNoLoading() {
	yield takeLatest(
		GET_PROJECT_DETAIL_API_SAGA_NOLOADING,
		getProjectDetailNoLoading
	);
}

function* postUserLeaveProject(action)
{
	try
	{
		let project = {
			projectId :action?.projectId
		}
		const { data, status } = yield call(() => projectService.leaveProject(project))
		yield put({
			type: GET_LIST_PROJECT_SAGA,
		});

		yield put({
			type: GET_LIST_PROJECT_SAGA_ISSUES,
	
		});
		yield put({
			type: "CLOSE_MODAL",
		});
		Notification("success", "Leave project is sucess");
	} catch (error) {
		Notification("error", error?.response.data.content);
	}
}



export function* theoDoiPostUserLeaveProject() {
	yield takeLatest(
		LEAVE_PROJECT_SAGA,
		postUserLeaveProject
	);
}
