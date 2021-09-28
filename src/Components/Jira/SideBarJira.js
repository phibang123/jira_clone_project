import "../../index.css";

import {
	AppstoreAddOutlined,
	LogoutOutlined,
	QuestionOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Popover, message } from "antd";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { TOKEN_USER, USER_LOGIN } from "../../Utils/constants/settingSystem";
import { useDispatch, useSelector } from "react-redux";

import FromCreateTask from "../Froms/FromCreateTask/FromCreateTask";
import { GET_ALL_PRIORITY_SAGA } from "../../Redux/Constants/priority";
import { GET_LIST_PROJECT_SAGA } from "../../Redux/Constants/constants";
import { NavLink } from "react-router-dom";
import { OPEN_DRAWER } from "../../Redux/Constants/drawer";
import { Select } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { history } from "../../Utils/history";
import logo from "../../Assets/Img/Logo/logo192.png";

const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const text = "Are you sure log out web?";

const searchPop = (projectList) => {
	console.log(projectList, "alo");
	return (
		<Select
			showSearch
			style={{ width: 200 }}
			placeholder="Search to Select"
			optionFilterProp="children"
			filterOption={(inputValue, option) =>
				option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
			
			}
		>
			{projectList?.map((project, index) => {
				return (
					<Option value={project.projectName} key={index}>
						<a style={{color: 'black'}} href={`/projectdetail/${project.id}`}>{project.projectName}</a>
					</Option>
				);
			})}
		</Select>
	);
};
export default function SideBarJira() {
	useEffect(() => {
		dispatch({
			type: GET_LIST_PROJECT_SAGA,
		});
	}, []);

	const projectList = useSelector((state) => state.projectManageReducer);
	const dispatch = useDispatch();
	const [state, setState] = useState({ collapsed: true });
	const { collapsed } = state;
	const onCollapse = (collapsed) => {
		setState({ collapsed });
	};
	const handleLogOut = () => {
		localStorage.removeItem(TOKEN_USER);
		localStorage.removeItem(USER_LOGIN);
		history.push("/login");
	};

	return (
		<>
			<Sider
				style={{ background: "#feca57", position: "fixed", height: "100%" }}
				collapsed={collapsed}
				onCollapse={onCollapse}
			>
				<div className="logo text-center">
					<img
						alt=""
						src={logo}
						style={{
							width: "100%",

							borderRadius: "50%",
							backgroundPosition: "center",
						}}
					></img>
				</div>
				<Menu
					style={{ background: "#feca57", height: "100vh" }}
					theme="dark"
					mode="inline"
				>
					<Popover
						placement="right"
						title={"Search Project"}
						content={searchPop(projectList?.projectList)}
						trigger="click"
					>
						<Menu.Item
							key="1"
							icon={
								<SearchOutlined
									style={{ color: "#000000", fontSize: "18px" }}
								/>
							}
						>
							Search Project
						</Menu.Item>
					</Popover>
					<Menu.Item
						key="2"
						icon={
							<AppstoreAddOutlined
								style={{ color: "#000000", fontSize: "18px" }}
							/>
						}
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
					<Menu.Item
						style={{ top: "63%" }}
						key="3"
						icon={
							<QuestionOutlined
								twoToneColor={"#578bfe"}
								style={{ color: "#000000", fontSize: "18px" }}
							/>
						}
					>
						About
					</Menu.Item>
					<Popconfirm
						key="4"
						placement="rightTop"
						title={text}
						onConfirm={handleLogOut}
						okText="Yes"
						cancelText="No"
					>
						<Menu.Item
							key="4"
							style={{ top: "63%" }}
							icon={
								<LogoutOutlined
									style={{ color: "#000000", fontSize: "18px" }}
								/>
							}
						>
							Log Out
						</Menu.Item>
					</Popconfirm>
				</Menu>
			</Sider>
		</>
	);
}
