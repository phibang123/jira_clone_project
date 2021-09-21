import * as Yup from 'yup'

import { Button, Input } from "antd";
import { FacebookOutlined, LockOutlined, TwitterOutlined, UserOutlined } from "@ant-design/icons";
import { Form, useFormik, withFormik } from "formik";
import { connect, useDispatch } from 'react-redux';

import React from "react";
import { USER_SIGNIN_SAGA_API } from '../../Redux/Constants/constants';
import { createFromIconfontCN } from '@ant-design/icons';
import { signin_action } from '../../Redux/Actions/userAction';
import { useState } from "react";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
export default function Login(props)
{
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: { //tên gằn liền name
           
            password: '',
            email: '',
   

        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email not required'),
            password:  Yup.string().min(6,"Password must have min 6 characters").required('PassWord not required').max(32,'Password must have max 32 character')
        }),
        onSubmit: (values) =>
        {
          
            // const action = dangKyAsynAction(values);
            dispatch(signin_action(values,props))
            //thành công => chuyển hướng trang
      
        },
        displayName: 'SignIn Jira'
       
        
        
    })
  
	return (
		<form className="container" onSubmit={formik.handleSubmit}>
			<div
				className="d-flex flex-column justify-content-center align-items-center"
				style={{ height: window.innerHeight }}
			>
                <h3 className="text-center" style={{ fontWeight: 300 }}>Sign In Jira</h3>
				<div className='d-flex mt-3' style={{flexDirection: 'column',width: '50%'}}>
					<Input onChange={formik.handleChange} onBlur={formik.handleBlur} type='email' name='email' size="large"  placeholder="Gmail" prefix={<UserOutlined />} />
                </div>
                <div className='text-danger'>
                    {formik.errors.email  && formik.touched.email ? (<>{formik.errors.email}</>):null}
                </div>
              
                <div className='d-flex mt-3' style={{flexDirection: 'column',width: '50%' }}>
					<Input onChange={formik.handleChange} onBlur={formik.handleBlur}  type='password' name='password' size="large" placeholder="Pasword"prefix={<LockOutlined />}  />
                </div>
                <div className='text-danger'>
                    {formik.errors.password  && formik.touched.password ? (<>{formik.errors.password}</>):null}
                </div>
                <Button htmlType="submit" size='large' style={{ color: '#ffffff', width: '50%', backgroundColor: 'rgb(102,117,223)' }} className='mt-5'  type='Submit'>Login</Button>
                <div className='social mt-2 d-flex'>

             
                    <Button icon={ <IconFont type="icon-facebook" /> }size='large' type='primary' style={{ backgroundColor: 'rgb(147,106,99)' }} shape="circle" className='ml-2 '></Button>
                    <Button icon={ <IconFont type="icon-twitter" /> }size='large' type='primary' shape="circle" className='ml-5'></Button>

                </div>
			</div>
		</form>
	);
}
