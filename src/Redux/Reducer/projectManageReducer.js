import { GET_LIST_PROJECT } from "../Constants/constants"

const initialState = {
  projectList: [/*{
    id: 1,
    projectName: 'abv',
    description: '<p className="text-red">bas</p>'
   }*/]
}

export const projectManageReducer = (state = initialState,action) => {
  switch (action.type) {
    case GET_LIST_PROJECT: {
      state.projectList = action.projectList
      return {...state}
  }
 

  default:
    return {...state}
  }
}
