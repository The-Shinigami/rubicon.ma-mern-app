import { all } from 'redux-saga/effects';
import projectSaga from './project/saga.js';
import taskSaga from './task/saga.js';


// import watchers from other files
export default function* rootSaga() {
    yield all([
        projectSaga(),
        taskSaga()
    ]);
}
