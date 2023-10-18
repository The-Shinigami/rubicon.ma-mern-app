import { all, put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import notification from '../../component/util/notification/Notification';

import {
  ADD_PROJECT,
  ADD_PROJECT_FAILURE,
  ADD_PROJECT_SUCCESS,
  GET_PROJECTS,
  GET_PROJECTS_FAILURE,
  GET_PROJECTS_SUCCESS,
  UPDATE_PROJECT,
  UPDATE_PROJECT_FAILURE,
  UPDATE_PROJECT_SUCCESS,
  DELETE_PROJECT,
  DELETE_PROJECT_FAILURE,
  DELETE_PROJECT_SUCCESS,
  GET_PROJECT_BY_ID,
} from './constants';
import { ADD_PROJECT_SUCCESS_MESSAGE, DELETE_PROJECT_SUCCESS_MESSAGE, GET_ALL_PROJECTS_SUCCESS_MESSAGE, UPDATE_PROJECT_SUCCESS_MESSAGE } from '../constants';

const  ENDPOINTS  = {
    PROJECTS: '/api/projects'
}

function* addProject(action) {
  try {
    const project = action.payload;
    const request = yield axios.post(ENDPOINTS.PROJECTS, project);
 
    notification('success', ADD_PROJECT_SUCCESS_MESSAGE)

    yield put({
      type: ADD_PROJECT_SUCCESS,
      payload: request.data, // Assuming the API returns the newly created project
    });


  } catch (error) {
    notification('danger', error.response.data.error)
    yield put({
      type: ADD_PROJECT_FAILURE,
      payload: error.response.data.errors, // Adjust error handling as needed
    });
  }
}

function* getProjects() {
  try {
    const request = yield axios.get(ENDPOINTS.PROJECTS);

    yield put({
      type: GET_PROJECTS_SUCCESS,
      payload: request.data, // Assuming the API returns a list of projects
    });
  } catch (error) {
    notification('danger', error.response.data.error)
    yield put({
      type: GET_PROJECTS_FAILURE,
      payload: error.response.data.errors, // Adjust error handling as needed
    });
  }
}


function* updateProject(action) {
  try {
    const project = action.payload;
    const request = yield axios.put(ENDPOINTS.PROJECTS + '/' + project["_id"], project);
    notification('success', UPDATE_PROJECT_SUCCESS_MESSAGE)
    yield put({
      type: UPDATE_PROJECT_SUCCESS,
      payload: request.data, // Assuming the API returns the updated project
    });
  } catch (error) {
    notification('danger', error.response.data.error)
    yield put({
      type: UPDATE_PROJECT_FAILURE,
      payload: error.response.data.errors, // Adjust error handling as needed
    });
  }
}

function* deleteProject(action) {
  try {
    const projectId = action.payload;
    yield axios.delete(ENDPOINTS.PROJECTS + '/' + projectId);

    notification('success', DELETE_PROJECT_SUCCESS_MESSAGE)
    yield put({
      type: DELETE_PROJECT_SUCCESS,
      payload: projectId, // Assuming the API returns the ID of the deleted project
    });
  } catch (error) {
    notification('danger', error.response.data.error)
    yield put({
      type: DELETE_PROJECT_FAILURE,
      payload: error.response.data.errors, // Adjust error handling as needed
    });
  }
}

export default function* projectSaga() {
  yield all([
    takeLatest(ADD_PROJECT, addProject),
    takeLatest(GET_PROJECTS, getProjects),
    takeLatest(UPDATE_PROJECT, updateProject),
    takeLatest(DELETE_PROJECT, deleteProject),
  ]);
}
