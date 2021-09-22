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
      "statusId": "1",
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



  default:
    return state
  }
}
