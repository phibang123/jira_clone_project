import { CommentService, commentService } from "../../Services/Comment/CommentService";
import { DELETE_COMMENT_SAGA, EDIT_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA } from "../Constants/comment";
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

import { GET_TASK_DETAIL_SAGA } from "../Constants/constants";
import { Notification } from "../../Utils/Notification/Notification";
import { STATUS_CODE } from "../../Utils/constants/settingSystem";

function* getAllCommentSaga(action) {
  yield delay(700)
  try
  {
 
    let { data, status } = yield call(() => CommentService.getAllComment(action.taskId))
   
    yield put({
      type: 'INSERT_COMMENT',
      CommentAll: data.content
    })
  } catch (err)
  {
    console.log(err)
  }
}


export function * theoDoiGetAllCommentSaga(){
  yield takeLatest(GET_ALL_COMMENT_SAGA,getAllCommentSaga)
}



//elete saga
function* deleteCommentSaga(action) {

  try
  {
    console.log(action)
    let { data, status } = yield call(() => CommentService.deleteComment(action.id))
   
    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: action.taskId
    })
    Notification("success", "Delete comment success");
  } catch (err)
  {
    //console.log(err.response?.data.statusCode)
    if (err.response?.data.statusCode == STATUS_CODE.AUTHORIZATION)
    {
  
      Notification("error", "You not authorized to delete this comment");
    }
    else
    {
      Notification("error", "You not authorized to delete this comment");
    }
  }
}


export function * theoDoiDeleteCommentSaga(){
  yield takeLatest(DELETE_COMMENT_SAGA,deleteCommentSaga)
}



function*  insertCommentSaga  (action) 
{
  try
  {
    let { comment } = action
    const { data, status } = yield  call(() => CommentService.insertComment(comment))
    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: action?.comment.taskId
    })
    Notification("Success", "Success");
  } catch (err)
  { 
     console.log(err.statusCode)
  }
}


export function * theoDoiInsertCommentSaga(){
  yield takeLatest(INSERT_COMMENT_SAGA,insertCommentSaga)
}

function*  editCommentSaga()
{
   try {
      
   } catch (error) {
     
   }
}


export function * theoDoiEditCommentSaga(){
  yield takeLatest(EDIT_COMMENT_SAGA,editCommentSaga)
}