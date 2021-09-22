import { GELL_ALL_TASK_TYPE } from "../Constants/taskType"

const initialState = {
   arrTaskType: []
}

export const TaskTypeReducer = (state = initialState, action) => {
  switch (action.type) {

  case GELL_ALL_TASK_TYPE:
    return { ...state, arrTaskType: action.arrTaskType }

  default:
    return state
  }
}
