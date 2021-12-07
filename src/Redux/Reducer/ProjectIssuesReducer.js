import { GET_LIST_PROJECT, GET_LIST_PROJECT_ISSUES } from "../Constants/constants"

const initialState = {
  projectList: [/*{
    id: 1,
    projectName: 'abv',
    description: '<p className="text-red">bas</p>'
   }*/],

  projectAssign: [],
  projectUserAddTask: []
}

export const ProjectIssuesReducer = (state = initialState,action) => {
  switch (action.type) {
    case GET_LIST_PROJECT_ISSUES: {
      
      state.projectList = action.projectListIssues

      state.projectAssign = action.projectAssign
      state.projectUserAddTask = action.projectListIssues
      state.projectUserAddTask = state.projectUserAddTask.concat(action.projectAssign)
     

      console.log(state.projectUserAddTask)
      return {...state}
  }
 

  default:
    return {...state}
  }
}
