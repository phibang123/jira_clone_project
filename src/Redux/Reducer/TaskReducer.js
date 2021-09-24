import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL_API, CHANGE_TASK_MODAL_API_SAGA, GET_TASK_DETAIL, REMAVE_USER_ASSIGN } from "../Constants/constants"

const initialState = {
   taskDetailModal: {
 
   
      "priorityTask": {
        "priorityId": 1,
        "priority": "High"
      },
      "taskTypeDetail": {
        "id": 1,
        "taskType": "bug"
      },
      "assigness": [
        
      ],
      "lstComment": [],
      "taskId": 1198,
      "taskName": "task1",
      "alias": "task1",
      "description": "<p>Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.</p>",
      "statusId": "2",
      "originalEstimate": 0,
      "timeTrackingSpent": 12,
      "timeTrackingRemaining": 12,
      "typeId": 1,
      "priorityId": 1,
      "projectId": 1290
 
  }
}

export const TaskReducer = (state = initialState, action) => {
  switch (action.type)
  {
  

    case GET_TASK_DETAIL: {
    
      return {...state,taskDetailModal: action.taskDetailModal}
    }
    case CHANGE_TASK_MODAL_API: {
      
      const { name, value } = action
     
       return {...state,taskDetailModal: {...state.taskDetailModal,[name]:value}}
    }
    case CHANGE_ASSIGNESS :{
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness,action.userSelected]
      return {...state}
    }
    case REMAVE_USER_ASSIGN: {
   
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)]
      return {...state}
      }

  default:
    return state
  }
}
