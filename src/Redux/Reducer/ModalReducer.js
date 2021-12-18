import React from "react";
import { put } from "@redux-saga/core/effects";
import { useDispatch } from "react-redux";

const initialState = {
  visible: false,
  ComponentContentModal: <p>Defail content</p> ,//dạng thẻ
  // ComponentContentModel: () =>
  // {
  //   return <p>Defail content</p> 
  // }
  //dạng funxtion
  callBackSubmit: () =>
  {
  
    
  },
  width: 500,
  title: '',
  cancel: () => {
  
  }
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
    
      return { ...state, visible: true, ComponentContentModal: action.ComponentContentModal, title: action.title,width: 900 };
      
    }
    case 'OPEN_MODAL_LEAVE_RPOJECT': {
    
      return { ...state, visible: true, ComponentContentModal: action.ComponentContentModal, title: action.title,width: 500  };
      
    }
    case 'OPEN_MODAL_CONFIRM_TASK': {
     
      return { ...state, visible: true, ComponentContentModal: action.ComponentContentModal, title: action.title,width: 500  };
      
    }
    case 'OPEN_MODAL_ABOUT_JIRA': {
    
      return { ...state, visible: true, ComponentContentModal: action.ComponentContentModal,cancel: ()=>{}, title: action.title,callBackSubmit: action.callBackSubmit  };
      
    }
    case 'OPEN_MODAL_CHART_JIRA': {
    
      return { ...state, visible: true, ComponentContentModal: action.ComponentContentModal,cancel: ()=>{}, title: action.title,callBackSubmit: action.callBackSubmit  };
      
    }
    case 'SET_NONE': {
      
      return {...state,callBackSubmit:  ()=>{},cancel: ()=>{} ,width: 900}
    }
    case 'SET_SUBMIT_CREATE_TASK': {
      
      return {...state,callBackSubmit: action.submitFunction,cancel: ()=>{},width: 900}
    }
    case 'SET_LEAVE_PROJECT': {
      
      return {...state,callBackSubmit: action.Function,cancel: ()=>{} ,width: 500}
    }
    case 'SET_DONE_TASK': {
      
      return {...state,callBackSubmit: action.Function,cancel: action.cancel ,width: 500}
    }
		default:
			return state;
	}
};
