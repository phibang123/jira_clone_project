import { EDIT_COMMENT_REDUCER } from "../Constants/comment"

const initialState = {
  commentUser: []
}

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {

  case EDIT_COMMENT_REDUCER:

    return { ...state,commentUser: action.comment}

  default:
    return state
  }
}
