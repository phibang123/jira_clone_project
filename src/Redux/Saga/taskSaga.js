import {
	CHANGE_ASSIGNESS,
	CHANGE_TASK_MODAL_API,
	CHANGE_TASK_MODAL_API_SAGA,
	CREATE_TASK_SAGA,
	DELETE_TASK_API_SAGA,
	GET_PROJECT_DETAIL_API,
	GET_PROJECT_DETAIL_API_SAGA_NOLOADING,
	GET_TASK_DETAIL,
	GET_TASK_DETAIL_SAGA,
	REMAVE_USER_ASSIGN,
	UPDATE_TASK_SAGA,
	UPDATE_TASK_STATUS_SAGA,
	UPDATE_TASK_STATUS_SAGA_TEXT,
} from "../Constants/constants";
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

import { GET_ALL_COMMENT_SAGA } from "../Constants/comment";
import { GET_PROJECT_DETAIL_API_SAGA } from "../../Redux/Constants/constants";
import { Notification } from "../../Utils/Notification/Notification";
import { STATUS_CODE } from "../../Utils/constants/settingSystem";
import { TaskReducer } from "../Reducer/TaskReducer";
import { TaskService } from "../../Services/Task/TaskService";

function* createTaskSaga(action) {
	try {
		const { data, status } = yield call(() =>
			TaskService.createTask(action.taskObject)
		);

		Notification("success", data.message);
		yield put({
			type: "CLOSE_MODAL",
		});
		// yield put({
		//   type: GET_PROJECT_DETAIL_API_SAGA,
		//   projectId: action.taskObject.projectId
		// })
	} catch (error) {
		Notification("error", error.response.data.content);
	}
}

export function* theoDoiCreateTaskSaga() {
	yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

function* getTaskDetail(action) {
	const { taskId } = action;
	
	try {
		const { data, status } = yield call(() =>
			TaskService.getTaskDetail(taskId)
		);
		yield put({
			type: GET_TASK_DETAIL,
			taskDetailModal: data.content,
		});
		yield put({
			type: GET_ALL_COMMENT_SAGA,
			taskId
		});
	} catch (err) {
		console.log(err);
		console.log(err.response?.data);
	}
}

export function* theoDoiGetTaskDetailSaga() {
	yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail);
}

function* updateTaskStatusSaga(action)
{
	

	switch (action.actionType)
	{
		 case CHANGE_TASK_MODAL_API: {
			
			yield put({
				type: 'CHANGE_TASK_MODAL_API_TEXT',
				statusId: action.taskUpdateStatus.statusId,
				taskId: action.taskUpdateStatus.taskId,
				statusOld: action.taskUpdateStatus.statusOld,
				taskDetail: action.taskUpdateStatus.taskDetail
			});
		} break;
	}
	try
	{
		
		const { data, status } = yield call(() =>
		TaskService.updateStatusTask(action.taskUpdateStatus)
	);
	yield put({
		type: GET_PROJECT_DETAIL_API_SAGA_NOLOADING,
		projectId: action.taskUpdateStatus.projectId,
	});
	yield put({
		type: GET_TASK_DETAIL_SAGA,
		taskId: action.taskUpdateStatus.taskId,
	});
	} catch (err) {
		console.log(err);
		console.log(err.response?.data);
	}
}
export function* theoDoiUpdateTaskStatusSaga() {
	yield takeLatest(UPDATE_TASK_STATUS_SAGA_TEXT, updateTaskStatusSaga);
}



//thay đổi task dưa lên api
function* updateTaskSaga(action) {}

export function* theoDoiUpdateTaskSaga() {
	yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}

//thay đổi task dưa lên reducer
function* handleChangPostApi(action) {
	//gọi action làm thay đổi detail modal

	switch (action.actionType) {
		case CHANGE_TASK_MODAL_API: {
			const { value, name } = action;
			yield put({
				type: CHANGE_TASK_MODAL_API,
				name,
				value,
			});
		}break;
    case CHANGE_ASSIGNESS: {
      const { userSelected } = action;
      yield put({
        type: CHANGE_ASSIGNESS,
        userSelected,
      });
    } break;
		case REMAVE_USER_ASSIGN: {
			const { userId } = action;
      yield put({
        type: REMAVE_USER_ASSIGN,
        userId,
      })
		}break;
	}
	//Save lại rồi chạy qua UPDATE_TASK_SAGA
	//lấy dử liệu từ taskDetailModal
	let { taskDetailModal } = yield select((state) => state.TaskReducer);

	//biến đổi dử liệu state.taskDetailModal thành dử liệu api cần
  const listUserAsign = taskDetailModal.assigness?.map((user, index) =>
  {
    return user.id
  })
  const taskUpdateApi = {...taskDetailModal,listUserAsign}
	//èo
  //tại vì bình thường không có lstUserAsign nên phải thêm chuối như vầy
  try
  {
    const { data, status } = yield call(() => TaskService.updateTask(taskUpdateApi))
    if (status === STATUS_CODE.SUCCESS)
    {
      yield put({
        type: GET_PROJECT_DETAIL_API_SAGA_NOLOADING,
        projectId: taskUpdateApi.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
			});
			yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: taskUpdateApi.taskId,
      });
    }
  }
  catch (err)
  {
    console.log(err)
    console.log(err.response?.data)
  }
  
  
}
export function* theoDoiHandleChangPostApi() {
	yield takeLatest(CHANGE_TASK_MODAL_API_SAGA, handleChangPostApi);
}

function* deleteTaskSaga(action)
{
	
	try
	{
		const { data, status } = yield call(() => TaskService.deleteTask(action.taskId))
		Notification("success", data.message);
		yield put({
			type: GET_PROJECT_DETAIL_API_SAGA,
			projectId: action.projectId
		})
	}
	catch (err)
	{
		if (err.response?.data)
		{
			Notification("error", err.response.data.content);
		}
		else
		Notification("error", err.response.data.content);
	}
}


export function* theoDoiDeleteTaskSaga()
{
	yield takeLatest(DELETE_TASK_API_SAGA,deleteTaskSaga)
}