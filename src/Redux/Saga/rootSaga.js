// import * as ToDoListSaga from "./ToDoListSaga";

import * as projectCategorySaga from './projectCategorySaga'
import * as projectSaga from './projectSaga'
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
		projectCategorySaga.theoDoigetAllProjectCategory(),
		projectSaga.theoDoiCreatePrjectSaga(),
		projectSaga.theoDoiGetListProjectSaga(),
		projectSaga.theoDoiUpdateProjectSaga(),
		projectSaga.theoDoiDeleteProject(),
		userSaga.theoDoiGetUser(),
		projectSaga.theoDoiAddUserProject(),
		projectSaga.theoDoiRemoveUserProject(),
		projectSaga.theoDoiGetProjectDetail(),
    ]);
}
