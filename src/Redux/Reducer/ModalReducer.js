import React from "react";

const initialState = {
  visible: false,
  ComponentContentModal: <p>Defail content</p> ,//dạng thẻ
  // ComponentContentModel: () =>
  // {
  //   return <p>Defail content</p> 
  // }
  //dạng funxtion
	callBackSubmit: () => { alert('click demo') },
	title:''
};

export const ModalReducer = (state = initialState, action) => {
  switch (action.type)
  {
    case 'OPEN_MODAL': {
			return { ...state, visible: true };
    }
  
    case "CLOSE_MODAL": {
			return { ...state, visible: false };
    }
    
    case 'OPEN_MODAL_CREATE_TASK': {
    
      return { ...state, visible: true, ComponentContentModal: action.ComponentContentModal, title: action.title };
      
    }
  
    case 'SET_SUBMIT_CREATE_TASK': {
      return {...state,callBackSubmit: action.submitFunction}
    }
   
		default:
			return state;
	}
};
