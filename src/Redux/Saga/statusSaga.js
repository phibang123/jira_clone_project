import { GELL_ALL_TASK_TYPE, GELL_ALL_TASK_TYPE_SAGA, GET_ALL_STATUS_API, GET_ALL_STATUS_API_SAGA } from "../Constants/status";
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

import {StatusService} from '../../Services/Status/StatusService'

function* getAllStatusSaga(action) {
	try {
    const { data, status } = yield call(() => StatusService.getAllStatus())
    
    yield put({
      type: GET_ALL_STATUS_API,
      arrStatus: data.content
    })
	} catch (error) {
    console.log(error)
    console.log(error.response?.data)
	}
}

export function * theoDoiGetAllStatusSaga(){
  yield takeLatest(GET_ALL_STATUS_API_SAGA,getAllStatusSaga)
}