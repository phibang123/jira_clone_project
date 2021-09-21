import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../Constants/constants";
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

import { STATUS_CODE } from "../../Utils/constants/settingSystem";
import { projectService } from "../../Services/projectService";

function* getAllProjectCategory(action)

{
 
  //lấy dử liệu ra
  try
  {
    const { data, status } = yield call(() => projectService.getAllProjectCategory())
  
    
    // gọi thành công dưa lên reducer
    if (status === STATUS_CODE.SUCCESS)
    {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content
      })
    }
  
 
  } catch (err)
  {

    console.log(err.response.data)
  }
}

export function* theoDoigetAllProjectCategory() {
	yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA,getAllProjectCategory);
}
