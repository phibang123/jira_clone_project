import "../../index.css";

import {
	AppstoreAddOutlined,
	LogoutOutlined,
	QuestionOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { TOKEN_USER, USER_LOGIN } from "../../Utils/constants/settingSystem";

import FromCreateTask from "../Froms/FromCreateTask/FromCreateTask";
import { NavLink } from "react-router-dom";
import { OPEN_DRAWER } from "../../Redux/Constants/drawer";
import SubMenu from "antd/lib/menu/SubMenu";
import { history } from "../../Utils/history";
import logo from '../../Assets/Img/Logo/logo192.png'
import { useDispatch } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;
const text = "Are you sure log out web?";
export default function SideBarJira() {
	const dispatch = useDispatch();
	const [state, setState] = useState({ collapsed: true });
	const { collapsed } = state;
	const onCollapse = (collapsed) => {
		setState({ collapsed });
	};
	const handleLogOut = () => {
		history.push("/login");
		localStorage.removeItem(TOKEN_USER);
		localStorage.removeItem(USER_LOGIN);
	};

	return (
		<>
			<Sider style={{background: '#feca57',position: 'fixed',height: '100%'}} collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo text-center">
					<img
						alt=""
						src={logo}
						style={{
							width: '100%',
						
							borderRadius: "50%",
							backgroundPosition: "center",
						}}
					></img>
				</div>
				<Menu style={{background: '#feca57',height: '100vh'}} theme="dark" mode="inline">
					<Menu.Item key="1" icon={<SearchOutlined style={{color: 	'#000000',fontSize: '18px'}} />}>
						Search Issues
					</Menu.Item>

					<Menu.Item
						
						key="2"
						icon={<AppstoreAddOutlined style={{color: 	'#000000',fontSize: '18px'}}/>}
						onClick={() => {
							dispatch({
								type: "OPEN_MODAL_CREATE_TASK",
								ComponentContentModal: <FromCreateTask></FromCreateTask>,
								title: "Create Task",
							});
						}}
					>
						Create Task
					</Menu.Item>
					<Menu.Item style={{top: '63%'}} key="3" icon={<QuestionOutlined twoToneColor={'#578bfe'} style={{color: 	'#000000',fontSize: '18px' , }} />}>
						About
					</Menu.Item>
					<Popconfirm
						placement="right"
						title={text}
						onConfirm={handleLogOut}
						okText="Yes"
						cancelText="No"
					>
						<Menu.Item key="4" style={{top: '63%'}} icon={<LogoutOutlined style={{color: 	'#000000',fontSize: '18px'}}/>}>
							Log Out
						</Menu.Item>
					</Popconfirm>
				</Menu>
			</Sider>
		</>
	);
}
