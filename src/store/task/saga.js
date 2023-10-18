import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import {
  ADD_TASK,
  ADD_TASK_FAILURE,
  ADD_TASK_SUCCESS,
  GET_TASKS,
  GET_TASKS_FAILURE,
  GET_TASKS_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
} from './constants';
import notification from '../../component/util/notification/Notification';
import { ADD_TASK_SUCCESS_MESSAGE, DELETE_TASK_SUCCESS_MESSAGE, UPDATE_TASK_SUCCESS_MESSAGE } from '../constants';

const  ENDPOINTS  = {
    TASKS: '/api/tasks'
}

function* addTask(action) {
  try {
    const task  = action.payload;
    const request = yield axios.post(ENDPOINTS.TASKS, task);

    notification('success', ADD_TASK_SUCCESS_MESSAGE)

    yield put({
      type: ADD_TASK_SUCCESS,
      payload: request.data, // Assuming the API returns the newly created task
    });
  } catch (error) {

    notification('danger', error.response.data.error)
    yield put({
      type: ADD_TASK_FAILURE,
      payload: error.response.data.errors, // Adjust error handling as needed
    });
  }
}

function* getTasks() {
  try {
    const request = yield axios.get(ENDPOINTS.TASKS);

    yield put({
      type: GET_TASKS_SUCCESS,
      payload: request.data, // Assuming the API returns a list of tasks
    });
  } catch (error) {

    notification('danger', error.response.data.error)

    yield put({
      type: GET_TASKS_FAILURE,
      payload: error.response.data.errors, // Adjust error handling as needed
    });
  }
}

function* updateTask(action) {
  try {
    const task = action.payload;
    const request = yield axios.put(ENDPOINTS.TASKS + '/' + task['_id'], task);

    notification('success', UPDATE_TASK_SUCCESS_MESSAGE)
    yield put({
      type: UPDATE_TASK_SUCCESS,
      payload: request.data, // Assuming the API returns the updated task
    });
  } catch (error) {
    yield put({
      type: UPDATE_TASK_FAILURE,
      payload: error.response.data.errors, // Adjust error handling as needed
    });
  }
}

function* deleteTask(action) {
  try {
    const taskId = action.payload;
    yield axios.delete(ENDPOINTS.TASKS + '/' + taskId);
 
    notification('success', DELETE_TASK_SUCCESS_MESSAGE)

    yield put({
      type: DELETE_TASK_SUCCESS,
      payload: taskId, // Assuming the API returns the ID of the deleted task
    });
  } catch (error) {
    notification('danger', error.response.data.error)
    yield put({
      type: DELETE_TASK_FAILURE,
      payload: error.response.data.errors, // Adjust error handling as needed
    });
  }
}

export default function* taskSaga() {
  yield all([
    takeLatest(ADD_TASK, addTask),
    takeLatest(GET_TASKS, getTasks),
    takeLatest(UPDATE_TASK, updateTask),
    takeLatest(DELETE_TASK, deleteTask),
  ]);
}
