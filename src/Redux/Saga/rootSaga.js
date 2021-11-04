// import * as ToDoListSaga from "./ToDoListSaga";

import * as commentSaga from './commentSaga'
import * as prioritySaga from './prioritySaga'
import * as projectCategorySaga from './projectCategorySaga'
import * as projectSaga from './projectSaga'
import * as statusSaga from './statusSaga'
import * as taskSaga from './taskSaga'
import * as taskTypeSaga from './taskTypeSaga'
import * as userSaga from './userSaga'

import {
	all,
	call,
	delay,
	fork,
	put,
	take,
	takeEvery,
	takeLatest,
} from "redux-saga/effects";

// import {theoDoiActionGetTaskAPI} from './ToDoListSaga'

export function* rootSaga() {
	yield all([
		userSaga.theoDoiSignIn(),
		userSaga.theoDoiSignUp(),
		projectCategorySaga.theoDoigetAllProjectCategory(),
		projectSaga.theoDoiCreatePrjectSaga(),
		projectSaga.theoDoiGetListProjectSaga(),
		projectSaga.theoDoiUpdateProjectSaga(),
		projectSaga.theoDoiDeleteProject(),
		userSaga.theoDoiGetUser(),
		userSaga.theoDoiGetUserByProjectIdSaga(),
		projectSaga.theoDoiAddUserProject(),
		projectSaga.theoDoiRemoveUserProject(),
		projectSaga.theoDoiGetProjectDetail(),
		taskTypeSaga.theoDoiGetAllTaskTypeSaga(),
		prioritySaga.theoDoigetAllPrioritySaga(),
		taskSaga.theoDoiCreateTaskSaga(),
		statusSaga.theoDoiGetAllStatusSaga(),
		taskSaga.theoDoiGetTaskDetailSaga(),
		taskSaga.theoDoiUpdateTaskSaga(),
		projectSaga.theoDoiGetProjectDetailNoLoading(),
		taskSaga.theoDoiUpdateTaskStatusSaga(),
		taskSaga.theoDoiHandleChangPostApi(),
		taskSaga.theoDoiDeleteTaskSaga(),
		commentSaga.theoDoiGetAllCommentSaga(),
		commentSaga.theoDoiDeleteCommentSaga(),
		commentSaga.theoDoiInsertCommentSaga(),
		userSaga.theoDoiEditUserSaga(),
		userSaga.theoDoiLogOutSaga(),
		projectSaga.theoDoiGetListProjectIssuesSaga()
    ]);
}
