import {
    GET_TASKS,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAILURE,
    ADD_TASK,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
    UPDATE_TASK,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAILURE,
    DELETE_TASK,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
  } from './constants';
  
  const initialState = {
    isLoading: false,
    tasks: [],
  };
  
  export default function taskReducer(state = initialState, action) {
    switch (action.type) {
      // TRIGGERING ACTIONS
      case ADD_TASK:
      case UPDATE_TASK:
      case DELETE_TASK:
      case GET_TASKS:
        return {
          ...state,
          isLoading: true,    
          tasks: [],
        };
  
      // SUCCESS ACTIONS
      case GET_TASKS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          tasks: action.payload,
        };

      case ADD_TASK_SUCCESS:
        return {
          ...state,
          isLoading: false,
          tasks: [...state.tasks, action.payload],
        };
  
      case UPDATE_TASK_SUCCESS:
        return {
          ...state,
          isLoading: false,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
          ),
        };
  
      case DELETE_TASK_SUCCESS:
        return {
          ...state,
          isLoading: false,
          tasks: state.tasks.filter((task) => task.id !== action.payload),
        };
  
      // FAILURE ACTIONS
      case GET_TASKS_FAILURE:
      case ADD_TASK_FAILURE:
      case UPDATE_TASK_FAILURE:
      case DELETE_TASK_FAILURE:
        return {
          ...state,
          isLoading: false,
        };
  
      default:
        return state;
    }
  }
  