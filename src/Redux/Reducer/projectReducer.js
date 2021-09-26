import { EDIT_PROJECT, GET_PROJECT_DETAIL_API } from "../Constants/constants"

import _ from "lodash";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "L",
    creator: "string",
    description: "<h1>Dm cuoc doi</h1>",
    categoryId: "1"
  },
  projectDetail: {
  
      "lstTask": [
        {
          "lstTaskDeTail": [
            {
              "priorityTask": {
                "priorityId": 2,
                "priority": "Medium"
              },
              "taskTypeDetail": {
                "id": 2,
                "taskType": "new task"
              },
              "assigness": [
                {
                  "id": 475,
                  "avatar": "https://ui-avatars.com/api/?name=Phi Bằng",
                  "name": "Phi Bằng",
                  "alias": "phi-bang"
                }
              ],
              "lstComment": [],
              "taskId": 1217,
              "taskName": "task3",
              "alias": "task3",
              "description": "<p>Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.</p>",
              "statusId": "1",
              "originalEstimate": 38,
              "timeTrackingSpent": 12,
              "timeTrackingRemaining": 25,
              "typeId": 0,
              "priorityId": 0,
              "projectId": 1312
            }
          ],
          "statusId": "1",
          "statusName": "BACKLOG",
          "alias": "tồn đọng"
        },
        {
          "lstTaskDeTail": [],
          "statusId": "2",
          "statusName": "SELECTED FOR DEVELOPMENT",
          "alias": "được chọn để phát triển"
        },
        {
          "lstTaskDeTail": [
            {
              "priorityTask": {
                "priorityId": 2,
                "priority": "Medium"
              },
              "taskTypeDetail": {
                "id": 2,
                "taskType": "new task"
              },
              "assigness": [
                {
                  "id": 475,
                  "avatar": "https://ui-avatars.com/api/?name=Phi Bằng",
                  "name": "Phi Bằng",
                  "alias": "phi-bang"
                },
                {
                  "id": 474,
                  "avatar": "https://ui-avatars.com/api/?name=Bồn Lằng",
                  "name": "Bồn Lằng",
                  "alias": "bon-lang"
                },
                {
                  "id": 310,
                  "avatar": "https://ui-avatars.com/api/?name=Loi",
                  "name": "Loi",
                  "alias": "loi"
                },
                {
                  "id": 473,
                  "avatar": "https://ui-avatars.com/api/?name=Bằng Text",
                  "name": "Bằng Text",
                  "alias": "bang-text"
                }
              ],
              "lstComment": [],
              "taskId": 1216,
              "taskName": "Task222",
              "alias": "task222",
              "description": "<p>Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.</p>",
              "statusId": "3",
              "originalEstimate": 20,
              "timeTrackingSpent": 12,
              "timeTrackingRemaining": 50,
              "typeId": 0,
              "priorityId": 0,
              "projectId": 1312
            }
          ],
          "statusId": "3",
          "statusName": "IN PROGRESS",
          "alias": "trong tiến trình"
        },
        {
          "lstTaskDeTail": [],
          "statusId": "4",
          "statusName": "DONE",
          "alias": "hoàn thành"
        }
      ],
      "members": [
        {
          "userId": 473,
          "name": "Bằng Text",
          "avatar": "https://ui-avatars.com/api/?name=Bằng Text",
          "email": null,
          "phoneNumber": null
        },
        {
          "userId": 475,
          "name": "Phi Bằng",
          "avatar": "https://ui-avatars.com/api/?name=Phi Bằng",
          "email": null,
          "phoneNumber": null
        },
        {
          "userId": 474,
          "name": "Bồn Lằng",
          "avatar": "https://ui-avatars.com/api/?name=Bồn Lằng",
          "email": null,
          "phoneNumber": null
        },
        {
          "userId": 310,
          "name": "Loi",
          "avatar": "https://ui-avatars.com/api/?name=Loi",
          "email": null,
          "phoneNumber": null
        }
      ],
      "creator": {
        "id": 475,
        "name": "Phi Bằng"
      },
      "id": 1312,
      "projectName": "Shop Bán bánh",
      "description": "<p>Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.</p>",
      "projectCategory": {
        "id": 1,
        "name": "Dự án web"
      },
      "alias": "shop-ban-banh"
    },
    "dateTime": "2021-09-26T09:26:02.4108552+07:00"
  }


export const projectReducer = (state = initialState, action) => {
  switch (action.type) {

    case EDIT_PROJECT: {
      state.projectEdit = action.projectEditDrawer
      return {...state}
    }
    case GET_PROJECT_DETAIL_API: {
      state.projectDetail = action.projectDetail;
      return {...state}
      }
    case 'CHANGE_TASK_MODAL_API_TEXT': {
      console.log('reducer taskDetail',state.projectDetail)
      console.log(action)

      //điểm đang ở
      let statusFindOld = state.projectDetail?.lstTask?.findIndex(statusId => statusId.statusId === action.statusOld)
      let taskDelete = state.projectDetail.lstTask[statusFindOld].lstTaskDeTail.findIndex(dele => dele.taskId === action.taskId)
      state.projectDetail.lstTask[statusFindOld].lstTaskDeTail.splice(taskDelete,1)
      console.log(state.projectDetail.lstTask[statusFindOld].lstTaskDeTail[taskDelete],'taskDelete')

      //điểm tới [mảng]
      let statusFindNew = state.projectDetail?.lstTask?.findIndex(statusId => statusId.statusId === action.statusId)
      //điểm đến xóa thành đóa
      console.log('alo',state.projectDetail.lstTask[statusFindNew])
      state.projectDetail.lstTask[statusFindNew].lstTaskDeTail.push(action.taskDetail)
      
      
      
      return {...state}
    }
  default:
    return state
  }
}
