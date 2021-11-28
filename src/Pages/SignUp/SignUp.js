import * as Yup from "yup";

import {
	AuditOutlined,
	FacebookOutlined,
	LockOutlined,
	PhoneOutlined,
	TwitterOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";

import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { history } from "../../Utils/history";
import { signup_action } from "../../Redux/Actions/userAction";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

const IconFont = createFromIconfontCN({
	scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});
export default function SignUp(props) {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			//tên gằn liền name

			password: "",
			email: "",
			phoneNumber: "",
			name: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().required("Email not required"),
			password: Yup.string()
				.min(6, "password must have min 6 characters")
				.required("password not required")
				.max(32, "password must have max 32 character"),
			name: Yup.string().required("Name not required"),
			phoneNumber: Yup.string().required("phone Number not required"),
		}),
		onSubmit: (values) => {
			// const action = dangKyAsynAction(values);
			//
			//thành công => chuyển hướng trang
      dispatch(signup_action(values))
		},
		displayName: "SignIn Jira",
	});
	return (
		<div className="conteiner">
			<form className="container" onSubmit={formik.handleSubmit}>
				<div
					className="d-flex flex-column justify-content-center align-items-center"
					style={{ height: window.innerHeight }}
				>
					<h3 className="text-center" style={{ fontWeight: 300 }}>
						Sign up
					</h3>
					<div
						className="d-flex mt-3"
						style={{ flexDirection: "column", width: "50%" }}
					>
						<Input
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							type="email"
							name="email"
							size="large"
							placeholder="Gmail"
							prefix={<UserOutlined />}
						/>
					</div>
					<div className="text-danger">
						{formik.errors.email && formik.touched.email ? (
							<>{formik.errors.email}</>
						) : null}
					</div>

					<div
						className="d-flex mt-3"
						style={{ flexDirection: "column", width: "50%" }}
					>
						<Input
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							type="password"
							name="password"
							size="large"
							placeholder="Pasword"
							prefix={<LockOutlined />}
						/>
					</div>
					<div className="text-danger">
						{formik.errors.password && formik.touched.password ? (
							<>{formik.errors.password}</>
						) : null}
					</div>

					<div
						className="d-flex mt-3"
						style={{ flexDirection: "column", width: "50%" }}
					>
						<Input
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							name="name"
							size="large"
							placeholder="Full Name"
							prefix={<AuditOutlined />}
						/>
					</div>
					<div className="text-danger">
						{formik.errors.name && formik.touched.name ? (
							<>{formik.errors.name}</>
						) : null}
					</div>

					<div
						className="d-flex mt-3"
						style={{ flexDirection: "column", width: "50%" }}
					>
						<Input
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							name="phoneNumber"
							type="number"
							size="large"
							placeholder="Phone Number"
							prefix={<PhoneOutlined />}
						/>
					</div>
					<div className="text-danger">
						{formik.errors.phoneNumber && formik.touched.phoneNumber ? (
							<>{formik.errors.phoneNumber}</>
						) : null}
					</div>
           
          <div className='d-flex justify-content-between w-50'>
                <Button htmlType="submit" size='large' style={{ color: '#ffffff', width: '45%', backgroundColor: 'rgb(102,117,223)' }} className='mt-5' type='Submit'>Sign Up</Button>
                
                <Button htmlType="submit" size='large' style={{ color: '#ffffff', width: '45%', backgroundColor: 'red', marginTop: '50px' }} onClick={() =>
                {
                    history.push('/login')
                }} className='mt-5'  type='button'>Login</Button>
                </div>

				
						
			
					
					{/* <div className="social mt-2 d-flex">
						<Button
							icon={<IconFont type="icon-facebook" />}
							size="large"
							type="primary"
							style={{ backgroundColor: "rgb(147,106,99)" }}
							shape="circle"
							className="ml-2 "
						></Button>
						<Button
							icon={<IconFont type="icon-twitter" />}
							size="large"
							type="primary"
							shape="circle"
							className="ml-5"
						></Button>
					</div> */}
				</div>
			</form>
		</div>
	);
}
