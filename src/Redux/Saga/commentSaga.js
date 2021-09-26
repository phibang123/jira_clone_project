import { CommentService, commentService } from "../../Services/Comment/CommentService";
import { DELETE_COMMENT_SAGA, GET_ALL_COMMENT, GET_ALL_COMMENT_SAGA } from "../Constants/comment";
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
      type: GET_ALL_COMMENT,
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