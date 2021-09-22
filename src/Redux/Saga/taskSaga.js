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

import { CREATE_TASK_SAGA } from "../Constants/constants";
import { Notification } from "../../Utils/Notification/Notification";
import { TaskService } from "../../Services/Task/TaskService";

function* createTaskSaga(action)
{
  try
  {
    const { data, status } = yield call(() => TaskService.createTask(action.taskObject))
   
    Notification("success", data.message)
    yield put({
       type: "CLOSE_MODAL"
    })
  }
  catch (error)
  {
    Notification("error", error.response.data.content)
  }
}

export function* theoDoiCreateTaskSaga() {
	yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}