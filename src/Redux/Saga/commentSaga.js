import { CommentService, commentService } from "../../Services/Comment/CommentService";
import { DELETE_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA, INSERT_COMMENT_SAGA } from "../Constants/comment";
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
 
    let { data, status } = yield call(() => CommentService.deleteComment(action.id))
   
    yield put({
      type: GET_ALL_COMMENT_SAGA,
      taskId: action.taskId
    })
  } catch (err)
  {
    console.log(err)
  }
}


export function * theoDoiDeleteCommentSaga(){
  yield takeLatest(DELETE_COMMENT_SAGA,deleteCommentSaga)
}

function* insertCommentSaga(action)
{
  try
  {
    let { comment } = action
    const { data, status } = yield call(() => CommentService.insertComment(comment))
    yield put({
      type: GET_ALL_COMMENT_SAGA,
      taskId: comment.taskId
    })
  } catch (err)
  { 
     console.log(err)
  }
}


export function * theoDoiInsertCommentSaga(){
  yield takeLatest(INSERT_COMMENT_SAGA,insertCommentSaga)
}