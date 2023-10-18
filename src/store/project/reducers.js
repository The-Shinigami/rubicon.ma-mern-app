
import {
    GET_PROJECTS,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_FAILURE,
    ADD_PROJECT,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAILURE,
    UPDATE_PROJECT,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAILURE,
    DELETE_PROJECT,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
  } from './constants';
  
  const initialState = {
    isLoading: false,
    projects: [],
  };
  
  export default function projectReducer(state = initialState, action) {
    switch (action.type) {
      // TRIGGERING ACTIONS
      case ADD_PROJECT:
      case UPDATE_PROJECT:
      case DELETE_PROJECT:
      case GET_PROJECTS:
        return {
          ...state,
          isLoading: true,    
          projects: [],
        };
  
      // SUCCESS ACTIONS
      case GET_PROJECTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          projects: action.payload,
        };

      case ADD_PROJECT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          projects: [...state.projects, action.payload],
        };
  
      case UPDATE_PROJECT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          projects: state.projects.map((project) =>
            project.id === action.payload.id ? action.payload : project
          ),
        };
  
      case DELETE_PROJECT_SUCCESS:

        return {
          ...state,
          isLoading: false,
          projects: state.projects.filter((project) => project.id !== action.payload),
        };
  
      // FAILURE ACTIONS
      case GET_PROJECTS_FAILURE:
      case ADD_PROJECT_FAILURE:
      case UPDATE_PROJECT_FAILURE:
      case DELETE_PROJECT_FAILURE:
        return {
          ...state,
          isLoading: false,
        };
  
      default:
        return state;
    }
  }
  