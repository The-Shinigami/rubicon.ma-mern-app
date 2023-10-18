import {
    GET_PROJECTS,
    ADD_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    GET_PROJECT_BY_ID
} from './constants'


export const getProjects = () => ({
    type: GET_PROJECTS
  });

  export const getProjectById = (projectId) => ({
    type: GET_PROJECT_BY_ID
  });

export const addProject = (project) => ({
    type: ADD_PROJECT,
    payload: project,
  });
  
  export const updateProject = (project) => ({
    type: UPDATE_PROJECT,
    payload: project,
  });
  
  export const deleteProject = (projectId) => ({
    type: DELETE_PROJECT,
    payload: projectId,
  });
  