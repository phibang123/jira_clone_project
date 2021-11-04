import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../Redux/Constants/drawer';

import { PlusOutlined } from '@ant-design/icons';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// const { Option } = Select;
export default function DrawerComponent(props)
{
  const {visible,ComponentContentDrawer,callBackSubmit,title} = useSelector(state => state.DrawerReducer)
   const dispatch = useDispatch()

  const showDrawer = () => {
    dispatch({
      type: OPEN_DRAWER
    });
  };

  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER
    });
  };
  return (
    <>
    {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
      New account
    </Button> */}
    
        <Drawer
          title={title}
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={callBackSubmit} style={{ backgroundColor:"#87AAAA" ,border: "none", borderRadius: "5px" }} type="primary">
                Edit Project
              </Button>
            </Space>
          }
      >

        {ComponentContentDrawer}
    </Drawer>
  </>
  )
}
