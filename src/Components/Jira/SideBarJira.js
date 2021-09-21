import "../../index.css";

import {
	AppstoreAddOutlined,
	QuestionOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";

import FromCreateTask from '../Froms/FromCreateTask/FromCreateTask'
import { NavLink } from "react-router-dom";
import { OPEN_DRAWER } from "../../Redux/Constants/drawer";
import SubMenu from "antd/lib/menu/SubMenu";
import { useDispatch } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

export default function SideBarJira()
{
	
	const dispatch = useDispatch()
	const [state, setState] = useState({ collapsed: true });
	const { collapsed } = state;
	const onCollapse = (collapsed) => {
		console.log(collapsed);
		setState({ collapsed });
	};
	return (
		<>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo text-center">
					<img
						alt=""
						src="https://picsum.photos/200/200"
						style={{
							width: 50,
							height: 50,
							borderRadius: "50%",
							backgroundPosition: "center",
						}}
					></img>
				</div>
				<Menu theme="dark" mode="inline">
			
					<Menu.Item key="1" icon={<SearchOutlined />}>
						Search Issues
					</Menu.Item>
					<Menu.Item key="2" icon={<AppstoreAddOutlined />} onClick={() =>
					{
						dispatch({
							type: 'OPEN_MODAL_CREATE_TASK',
							ComponentContentModal: <FromCreateTask></FromCreateTask>,
					    title: 'Create Task'
						})
					}}>
						Create Task
					</Menu.Item>
					<Menu.Item key="3" icon={<QuestionOutlined />}>
					    About
					</Menu.Item>
				</Menu>
			</Sider>
		</>
	);
}
