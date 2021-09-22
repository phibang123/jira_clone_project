import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../Constants/priority";
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

import { PriorityService } from "../../Services/Priority/PriorityService";
import { TaskTypeService } from "../../Services/Task/TaskTypeService";

function* getAllPrioritySaga(action) {
	try {
    const { data, status } = yield call(() => PriorityService.getAllPriority())
    
    yield put({
      type: GET_ALL_PRIORITY,
      arrPriority: data.content
    })
	} catch (error) {
		console.log(error)
	}
}

export function * theoDoigetAllPrioritySaga(){
  yield takeLatest(GET_ALL_PRIORITY_SAGA,getAllPrioritySaga)
}