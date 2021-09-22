import { CREATE_TASK_SAGA, GET_PROJECT_DETAIL_API, GET_PROJECT_DETAIL_API_SAGA_NOLOADING, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, UPDATE_TASK_STATUS_SAGA, UPDATE_TASK_STATUS_SAGA_TEXT } from "../Constants/constants";
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

import {GET_PROJECT_DETAIL_API_SAGA} from '../../Redux/Constants/constants'
import { Notification } from "../../Utils/Notification/Notification";
import { TaskReducer } from "../Reducer/TaskReducer";
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
    // yield put({
    //   type: GET_PROJECT_DETAIL_API_SAGA,
    //   projectId: action.taskObject.projectId
    // })

    
  }
  catch (error)
  {
    Notification("error", error.response.data.content)
  }
}

export function* theoDoiCreateTaskSaga() {
	yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}



function* getTaskDetail(action)
{
  const { taskId } = action
  console.log(taskId)
  try
  {
    const { data, status } = yield call(() => TaskService.getTaskDetail(taskId))
    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModal: data.content
    })
  }
  catch (err)
  {
    console.log(err)
    console.log(err.response?.data)
  }
}


export function* theoDoiGetTaskDetailSaga()
{
  yield takeLatest(GET_TASK_DETAIL_SAGA,getTaskDetail)
}


function* updateTaskSaga(action)
{
  
  
 
  try
  {
    const { data, status } = yield call(() => TaskService.updateStatusTask(action.taskUpdateStatus))
    yield put({
      type: GET_PROJECT_DETAIL_API_SAGA_NOLOADING,
      projectId: action.taskUpdateStatus.projectId
      
    })
    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: action.taskUpdateStatus.taskId
    })
  } catch (err)
  {
    console.log(err)
    console.log(err.response?.data)
  }
}
export function* theoDoiUpdateTaskSaga()
{
  yield takeLatest(UPDATE_TASK_STATUS_SAGA_TEXT,updateTaskSaga)
}