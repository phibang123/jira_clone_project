import { GET_LIST_PROJECT, GET_LIST_PROJECT_ISSUES } from "../Constants/constants"

const initialState = {
  projectList: [/*{
    id: 1,
    projectName: 'abv',
    description: '<p className="text-red">bas</p>'
   }*/],

  projectAssign: []
}

export const ProjectIssuesReducer = (state = initialState,action) => {
  switch (action.type) {
    case GET_LIST_PROJECT_ISSUES: {
      
      state.projectList = action.projectListIssues

      state.projectAssign = action.projectAssign
     

      return {...state}
  }
 

  default:
    return {...state}
  }
}
