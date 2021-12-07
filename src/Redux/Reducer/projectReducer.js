import { EDIT_PROJECT, GET_PROJECT_DETAIL_API, GET_PROJECT_DETAIL_API_SAGA_NOLOADING } from "../Constants/constants"

import { Notification } from "../../Utils/Notification/Notification";
import _ from "lodash";

const initialState = {
  TaskMyIssues: false,
  projectEdit: {
    id: 0,
    projectName: "L",
    creator: "string",
    description: "<h1>Dm cuoc doi</h1>",
    categoryId: "1"
  },
  projectDetail: {
  
      
    },
    
  }
 


export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case EDIT_PROJECT: {
      state.projectEdit = action.projectEditDrawer
      return {...state}
    }
    case GET_PROJECT_DETAIL_API: {
      state.projectDetail = action.projectDetail;
      state.TaskMyIssues  = false
      return {...state}
      }
    case 'CHANGE_TASK_MODAL_API_TEXT': {
    

      //điểm đang ở
      let statusFindOld = state.projectDetail?.lstTask?.findIndex(statusId => statusId.statusId === action.statusOld)
      let taskDelete = state.projectDetail.lstTask[statusFindOld].lstTaskDeTail.findIndex(dele => dele.taskId === action.taskId)
      state.projectDetail.lstTask[statusFindOld].lstTaskDeTail.splice(taskDelete,1)
     

      //điểm tới [mảng]
      let statusFindNew = state.projectDetail?.lstTask?.findIndex(statusId => statusId.statusId === action.statusId)
      //điểm đến xóa thành đóa
     
      state.projectDetail.lstTask[statusFindNew].lstTaskDeTail.push(action.taskDetail)
      
      
      
      return {...state}
    }
    case 'TASK_MY_ISSUES': {
      const useNotJoin = state.projectDetail.members?.findIndex(id => id.userId === action.myId)
      if (state.projectDetail.creator.id === action.myId)
      {
        Notification("warning", "You are Creator");
        return {...state}
      }
      
      else if (useNotJoin === -1)
      {
        Notification("error", "You not Join Project");
        return {...state}
      }
     
      //  if (useNotJoin === -1)
      // {
      //   Notification("error", "You not Join Project");
      //   return {...state}
      // }


      //console.log(action.myId)
      console.log(action);
    
     // state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)]
      state.projectDetail.lstTask[0].lstTaskDeTail = [...state.projectDetail.lstTask[0]?.lstTaskDeTail?.filter(task => task.assigness.find(idUser => idUser.id === action.myId)?.id === action.myId)]
      //console.log(state.projectDetail.lstTask[0]?.lstTaskDeTail,'0');
      state.projectDetail.lstTask[1].lstTaskDeTail = [...state.projectDetail.lstTask[1]?.lstTaskDeTail?.filter(task => task.assigness.find(idUser => idUser.id === action.myId)?.id === action.myId)]
      //console.log(state.projectDetail.lstTask[1]?.lstTaskDeTail,'1');
      state.projectDetail.lstTask[2].lstTaskDeTail = [...state.projectDetail.lstTask[2]?.lstTaskDeTail?.filter(task => task.assigness.find(idUser => idUser.id === action.myId)?.id === action.myId)]
      //console.log(state.projectDetail.lstTask[2]?.lstTaskDeTail,'2');
      state.projectDetail.lstTask[3].lstTaskDeTail = [...state.projectDetail.lstTask[3]?.lstTaskDeTail?.filter(task => task.assigness.find(idUser => idUser.id === action.myId)?.id === action.myId)]
      //console.log(state.projectDetail.lstTask[3]?.lstTaskDeTail,'3');
      state.TaskMyIssues = true
      return {...state}
    }
    case GET_PROJECT_DETAIL_API_SAGA_NOLOADING: {
      state.TaskMyIssues = false
      return {...state}
    } 
  default:
    return state
  }
}
