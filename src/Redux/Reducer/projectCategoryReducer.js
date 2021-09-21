import { GET_ALL_PROJECT_CATEGORY } from "../Constants/constants"

const initialState = {
   arrProjectCategory: []
}

export const projectCategoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_PROJECT_CATEGORY: {
      state.arrProjectCategory = action.data
      return {...state}
  }

  default:
    return {...state}
  }
}
