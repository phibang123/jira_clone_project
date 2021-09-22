import { CHANGE_TASK_MODAL_API_SAGA, GET_TASK_DETAIL } from "../Constants/constants"

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
        {
          "id": 435,
          "avatar": "https://ui-avatars.com/api/?name=Bằng",
          "name": "Bằng",
          "alias": "bang"
        }
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
  switch (action.type) {

    case GET_TASK_DETAIL: {
      
      return {...state,taskDetailModal: action.taskDetailModal}
    }
    case CHANGE_TASK_MODAL_API_SAGA: {
        console.log(state)
        const {name,value} = action
       return {...state,taskDetailModal: {...state.taskDetailModal,[name]:value}}
      }

  default:
    return state
  }
}
