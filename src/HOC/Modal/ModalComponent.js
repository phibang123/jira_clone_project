import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react'

export default function ModalComponent()
{
  const {visible,ComponentContentModal,callBackSubmit,title,cancel,width} = useSelector(state => state.ModalReducer)
  const dispatch = useDispatch()
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  console.log(width)
  

  
  const handleOk = () => {
    
    setConfirmLoading(true);
    setTimeout(async() => {
      await callBackSubmit()
      await setConfirmLoading(false);
      dispatch({
        type: "CLOSE_MODAL"
     });
    }, 2000);
   
  };
  const handleCancel = () => {
    
    dispatch({
       type: "CLOSE_MODAL"
    });
    cancel()
  };
  return (
    <div>
       <>
 
      <Modal
        title={title}
        style={{top: '30px'}}
        visible={visible}
        width={width}
       
        
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
