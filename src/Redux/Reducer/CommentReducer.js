import { GET_ALL_COMMENT } from "../Constants/comment"

const initialState = {
  CommentAll: [
  
   ]
}

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_COMMENT:
      console.log(action,'action reducer')
      return { ...state, CommentAll: action.CommentAll }
    

  default:
    return state
  }
}
