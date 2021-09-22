import { GELL_ALL_TASK_TYPE, GELL_ALL_TASK_TYPE_SAGA } from "../Constants/taskType";
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

import { TaskTypeService } from "../../Services/Task/TaskTypeService";

function* getAllTaskTypeSaga(action) {
	try {
    const { data, status } = yield call(() => TaskTypeService.getAllTaskType())
    
    yield put({
      type: GELL_ALL_TASK_TYPE,
      arrTaskType: data.content
    })
	} catch (error) {
		console.log(error)
	}
}

export function * theoDoiGetAllTaskTypeSaga(){
  yield takeLatest(GELL_ALL_TASK_TYPE_SAGA,getAllTaskTypeSaga)
}