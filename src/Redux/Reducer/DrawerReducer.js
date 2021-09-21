import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_DREWER_EDIT_PROJECT } from "../Constants/drawer";

import React from "react";
import { SET_SUBMIT_EDIT_PROJECT } from "../Constants/constants";

const initialState = {
  visible: false,
  ComponentContentDrawer: <p>Defail content</p> ,//dạng thẻ
  // ComponentContentModel: () =>
  // {
  //   return <p>Defail content</p> 
  // }
  //dạng funxtion
	callBackSubmit: () => { alert('click demo') },
	title:''
};

export const DrawerReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_DRAWER: {
			return { ...state, visible: true };
		}
		case CLOSE_DRAWER: {
			return { ...state, visible: false };
		}
		case OPEN_DREWER_EDIT_PROJECT: {
			
			return { ...state, visible: true,ComponentContentDrawer : action.Component,title: action.title};
		}
		case SET_SUBMIT_EDIT_PROJECT: {
			  return {...state,callBackSubmit: action.submitFunction}
		}
	
		default:
			return state;
	}
};
