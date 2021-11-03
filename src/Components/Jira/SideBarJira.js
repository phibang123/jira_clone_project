import "../../index.css";

import {
	AppstoreAddOutlined,
	LogoutOutlined,
	QuestionOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Popover, message } from "antd";
import { Layout, Menu } from "antd";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TOKEN_USER, USER_LOGIN } from "../../Utils/constants/settingSystem";
import { useDispatch, useSelector } from "react-redux";

import FromAboutJira from "../Froms/FromAboutJira/FromAboutJira";
import FromCreateTask from "../Froms/FromCreateTask/FromCreateTask";
import { GET_ALL_PRIORITY_SAGA } from "../../Redux/Constants/priority";
import { GET_LIST_PROJECT_SAGA } from "../../Redux/Constants/constants";
import { OPEN_DRAWER } from "../../Redux/Constants/drawer";
import { Select } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { history } from "../../Utils/history";
import logo from "../../Assets/Img/Logo/logo192.png";

const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const text = "Are you sure log out web?";

const searchPop = (projectList) => {
	return (
		<Select
			showSearch
			style={{ width: 200 }}
			placeholder="Search to Select"
			optionFilterProp="children"
			onSelect={(valueSelect, option) => {
				history.push(`/projectdetail/${option.id}`);
			}}
			filterOption={(inputValue, option) =>
				option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
			}
		>
			{projectList?.map((project, index) => {
				return (
					<Option value={project.projectName} id={project.id} key={index}>
						<NavLink
							activeClassName="active"
							style={{ color: "black", width: "100%" }}
							to={`/projectdetail/${project.id}`}
						>
							{project.projectName}
						</NavLink>
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
	// const handleLogOut = () => {
	
	// 	history.push("/login");
	// };

	return (
		<>
			<Sider
				style={{
					backgroundColor: "#87AAAA",
					position: "fixed",
					height: "100%",
				}}
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
					style={{ backgroundColor: "#87AAAA", height: "100vh" }}
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
								id="createTask"
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
						onClick={() => {
							dispatch({
								type: "OPEN_MODAL_ABOUT_JIRA",
								callBackSubmit: () => {
									dispatch({ type: "CLOSE_MODAL" });
								},
								ComponentContentModal: <FromAboutJira></FromAboutJira>,
								title: "About Website",
							});
						}}
					>
						About
					</Menu.Item>
					{/* <Popconfirm
						key="5"
						placement="rightTop"
						title={text}
						onConfirm={handleLogOut}
						okText="Yes"
						cancelText="No"
						
					> */}
					<Menu.Item
						key="5"
						style={{ top: "63%" }}
						onClick={() => {
							setTimeout(() => {
								dispatch({
									type: "LOG_OUT",
								});
							}, 500);
						}}
						icon={
							<LogoutOutlined style={{ color: "#000000", fontSize: "18px" }} />
						}
					>
						Log Out
					</Menu.Item>
					{/* </Popconfirm> */}
				</Menu>
			</Sider>
		</>
	);
}
