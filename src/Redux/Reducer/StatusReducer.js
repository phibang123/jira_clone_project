import { GET_ALL_STATUS_API } from "../Constants/status"

const initialState = {
   arrStatus: []
}

export const StatusReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_STATUS_API:
    return { ...state,arrStatus: action.arrStatus }

  default:
    return state
  }
}
