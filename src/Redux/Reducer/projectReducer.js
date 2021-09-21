import { EDIT_PROJECT, GET_PROJECT_DETAIL_API } from "../Constants/constants"

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "L",
    creator: "string",
    description: "<h1>Dm cuoc doi</h1>",
    categoryId: "1"
  },
  projectDetail: {
    
  }
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

  default:
    return state
  }
}
