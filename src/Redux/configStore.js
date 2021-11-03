import {applyMiddleware, combineReducers, compose, createStore} from 'redux'

import { CommentReducer } from './Reducer/CommentReducer';
import { DrawerReducer } from './Reducer/DrawerReducer';
import { ModalReducer } from './Reducer/ModalReducer';
import { PriorityReducer } from './Reducer/PriorityReducer'
import { StatusReducer } from './Reducer/StatusReducer';
import { TaskReducer } from './Reducer/TaskReducer';
import { TaskTypeReducer } from './Reducer/TaskTypeReducer';
import createSagaMiddleware from '@redux-saga/core';
import { loadingReducer } from './Reducer/loadingReducer';
import { projectCategoryReducer } from './Reducer/projectCategoryReducer';
import { projectManageReducer } from './Reducer/projectManageReducer';
import { projectReducer } from './Reducer/projectReducer';
import reduxThunk from 'redux-thunk'
import { rootSaga } from './Saga/rootSaga';
import thunk from 'redux-thunk'
import userReducer from './Reducer/userReducer'

const middleWareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
    userReducer: userReducer,
    loadingReducer: loadingReducer,
    projectCategoryReducer: projectCategoryReducer,
    projectManageReducer: projectManageReducer,
    DrawerReducer: DrawerReducer,
    projectReducer: projectReducer,
    ModalReducer: ModalReducer,
    TaskTypeReducer: TaskTypeReducer,
    PriorityReducer: PriorityReducer,
    StatusReducer: StatusReducer,
    TaskReducer: TaskReducer,
    CommentReducer: CommentReducer,


})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
    rootReducer,
    
    //thunk
    composeEnhancers(applyMiddleware(thunk),applyMiddleware(reduxThunk,middleWareSaga)),
    

    

)
middleWareSaga.run(/* moi de chay saga */rootSaga)