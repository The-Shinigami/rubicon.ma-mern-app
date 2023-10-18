import { ADD_TASK, DELETE_TASK, GET_TASKS, UPDATE_TASK } from "./constants";

export const getTasks = (tasks) => ({
    type: GET_TASKS,
    payload:tasks
  });

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
  });
  
  export const updateTask = (task) => ({
    type: UPDATE_TASK,
    payload: task,
  });
  
  export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId,
  });

  
  
  