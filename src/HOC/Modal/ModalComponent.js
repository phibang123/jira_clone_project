import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react'

export default function ModalComponent()
{
  const {visible,ComponentContentModal,callBackSubmit,title} = useSelector(state => state.ModalReducer)
  const dispatch = useDispatch()
  const [confirmLoading, setConfirmLoading] = React.useState(false);
 
  const closeModal = () =>
	{
	
			dispatch({
			   type: 'CLOSE_MODAL'
			})
	
	}

  
  const handleOk = () => {
    
    setConfirmLoading(true);
    setTimeout(() => {
      closeModal()
    
    }, 2000);
   
  };
  const handleCancel = () => {
    
    dispatch({
       type: "CLOSE_MODAL"
    });
  };
  return (
    <div>
       <>
 
      <Modal
        title={title}
        style={{top: '30px'}}
        visible={visible}
          width={900}
       
          maskStyle={{ backgroundColor: "#87AAAA" }}
          okType={'primary'}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        
      >
          {ComponentContentModal}
    
      </Modal>
    </>
    </div>
  )
}
