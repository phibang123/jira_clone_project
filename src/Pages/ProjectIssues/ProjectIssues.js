import {
	ADD_USER_PROJECT_API_SAGA,
	DELETE_PROJECT_SAGA,
	EDIT_PROJECT,
	GET_LIST_PROJECT_SAGA,
	GET_LIST_PROJECT_SAGA_ISSUES,
	GET_USER_SAGA_API,
	REMOVE_USER_PROJECT_API_SAGA,
} from "../../Redux/Constants/constants";
import { AutoComplete, Avatar, Button, Popover, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import FromEditProject from "../../Components/Froms/FromEditProject/FromEditProject";
import FromLeaveProject from "../../Components/Froms/FromLeaveProject/FromLeaveProject";
import { NavLink } from "react-router-dom";
import { OPEN_DREWER_EDIT_PROJECT } from "../../Redux/Constants/drawer";
import ReactHtmlParser from "react-html-parser";
import { UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function ProjectIssues() {
	//lấy dử liệu từ reducer về
	const { projectList } = useSelector((state) => state.ProjectIssuesReducer);
	const { projectAssign } = useSelector((state) => state.ProjectIssuesReducer);
	const { userSearch } = useSelector((state) => state.userReducer);
	//sử dụng dispatch gọi action
	const [value, setValue] = useState("");
	const dispatch = useDispatch();

	const searchRef = useRef(null);

	useEffect(() => {
		dispatch({
			type: GET_LIST_PROJECT_SAGA_ISSUES,
		});
	}, []);

	const [state, setState] = useState({
		filteredInfo: null,
		sortedInfo: null,
	});

	const clearFilters = () => {
		setState({ filteredInfo: null });
	};

	const clearAll = () => {
		setState({
			filteredInfo: null,
			sortedInfo: null,
		});
	};
	const setAgeSort = () => {
		setState({
			sortedInfo: {
				order: "descend",
				columnKey: "age",
			},
		});
	};
	const handleChange = (pagination, filters, sorter) => {
		setState({
			filteredInfo: filters,
			sortedInfo: sorter,
		});
	};

	let { sortedInfo, filteredInfo } = state;

	sortedInfo = sortedInfo || {};
	filteredInfo = filteredInfo || {};
	const columnsIssues = [
		{
			title: "Id",
			width: 50,
			dataIndex: "id",
			key: "id",
			sorter: (item1, item2) => {
				return item1.id - item2.id;
			},
			// filters: [
			//   { text: 'Joe', value: 'Joe' },
			//   { text: 'Jim', value: 'Jim' },
			// ],
			// filteredValue: filteredInfo.name || null,
			// onFilter: (value, record) => record.name.includes(value),
			// sorter: (a, b) => a.name.length - b.name.length,
			// sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
			// ellipsis: true,
		},
		{
			title: "Project Name",
			width: 300,
			dataIndex: "projectName",
			render: (text, recond, index) => {
				return <NavLink to={`/projectdetail/${recond.id}`}>{text}</NavLink>;
			},
			key: "projectName",
			sorter: (item1, item2) => {
				let projectName1 = item1.projectName?.trim().toLowerCase();
				let projectName2 = item2.projectName?.trim().toLowerCase();
				if (projectName1 < projectName2) {
					return -1;
				}
				return 1;
			},
			// sorter: (a, b) => a.age - b.age,
			// sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
			// ellipsis: true,
		},

		//tạm thời không lấy derestion

		// {
		//   title: 'Description',
		//   dataIndex: 'description',
		//   key: 'description',
		//   render: (text, record, index) =>
		//   {
		//     // console.log('text',text)
		//     // console.log('record',record)
		//     // console.log('index', index)
		//     let jsxContent = ReactHtmlParser(text)
		//     return <div>
		//       {jsxContent}
		//     </div>
		//   }
		// },

		{
			title: "Category",
			width: 150,
			dataIndex: "categoryName",
			key: "categoryName",
			sorter: (item1, item2) => {
				let category1 = item1.categoryName?.trim().toLowerCase();
				let category2 = item2.categoryName?.trim().toLowerCase();
				if (category1 < category2) {
					return -1;
				}
				return 1;
			},
		},

		{
			title: "members",
			key: "members",
			width: 300,
			render: (text, record, index) => {
				return (
					<div>
						{record.members?.slice(0, 3).map((member, index) => {
							return (
								<Popover
									key={index}
									placement="top"
									title="members"
									content={() => {
										return (
											<table className="table">
												<thead>
													<tr>
														<th>Id</th>
														<th>Avatar</th>
														<th>name</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{record.members?.map((item, index) => (
														<tr key={index}>
															<td>{item.userId}</td>
															<td>
																<img
																	src={item.avatar}
																	width="30"
																	height="30"
																	style={{ borderRadius: "15px" }}
																	alt=""
																></img>
															</td>
															<td>{item.name}</td>
															<td>
																<button
																	testDeleteU={item.userId}
																	onClick={() => {
																		dispatch({
																			type: REMOVE_USER_PROJECT_API_SAGA,
																			userProject: {
																				userId: item.userId,
																				projectId: record.id,
																			},
																		});
																	}}
																	style={{
																		borderRadius: "50%",
																		lineHeight: "50%",
																	}}
																	className="btn btn-outline-danger"
																>
																	<DeleteOutlined />
																</button>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										);
									}}
								>
									<Avatar className="m-1" key={index} src={member.avatar} />
								</Popover>
							);
						})}
						{record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
						<Popover
							placement="right"
							title={"Add User"}
							content={() => {
								return (
									<AutoComplete
										style={{ width: "100%" }}
										options={userSearch?.map((user, index) => {
											return {
												label: user.name,

												value: user.userId.toString(),
											};
										})}
										value={value}
										onChange={(text) => {
											setValue(text);
										}}
										onSearch={(value) => {
											if (searchRef.current) {
												clearTimeout(searchRef.current);
											}
											searchRef.current = setTimeout(() => {
												dispatch({
													type: GET_USER_SAGA_API,
													keyWord: value,
												});
											}, 300);
										}}
										onSelect={(valueSelect, option) => {
											//set giá trị của hộp thoại = option.label
											setValue(option.label);
											//gọi api trả về backend
											dispatch({
												type: ADD_USER_PROJECT_API_SAGA,
												userProject: {
													projectId: record.id,
													userId: option.value,
												},
											});
										}}
									></AutoComplete>
								);
							}}
							trigger="click"
						>
							<Button className="m-1" icon={<UserAddOutlined />}></Button>
						</Popover>
					</div>
				);
			},
		},
		{
			title: "Action",
			width: 150,
			key: "action",
			render: (text, record, index) => (
				<div size="middle">
					<button
						style={{ lineHeight: "50%" }}
						className="btn mr-2 btn-outline-primary"
						onClick={() => {
							const action = {
								type: OPEN_DREWER_EDIT_PROJECT,
								Component: <FromEditProject></FromEditProject>,
								title: "Edit Project",
							};
							dispatch(action);
							//dispatch dử liệu dòng hiện tại lên reducer
							const actionEditProject = {
								type: EDIT_PROJECT,
								projectEditDrawer: record,
							};
							dispatch(actionEditProject);
						}}
					>
						<EditOutlined style={{ fontSize: "12px" }} />
					</button>

					{/* <button
			
						style={{ lineHeight: "50%" }}
						onClick={() =>
						{
							dispatch({
								type: DELETE_PROJECT_SAGA,
								idProject: record.id,
							});
						 }}
							className="btn mr-2 btn-outline-danger"
						>
							<DeleteOutlined style={{ fontSize: "12px" }} />
						</button> */}
					<Popconfirm
						title="Are you sure to delete this project?"
						onConfirm={() => {
							dispatch({
								type: DELETE_PROJECT_SAGA,
								idProject: record.id,
							});
						}}
						okText="Yes"
						cancelText="No"
					>
						<button
							style={{ lineHeight: "50%" }}
							className="btn mr-2 btn-outline-danger"
						>
							<DeleteOutlined style={{ fontSize: "12px" }} />
						</button>
					</Popconfirm>
				</div>
			),
		},
		// {
		//   title: 'Address',
		//   dataIndex: 'address',
		//   key: 'address',
		//   filters: [
		//     { text: 'London', value: 'London' },
		//     { text: 'New York', value: 'New York' },
		//   ],
		//   filteredValue: filteredInfo.address || null,
		//   onFilter: (value, record) => record.address.includes(value),
		//   sorter: (a, b) => a.address.length - b.address.length,
		//   sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
		//   ellipsis: true,
		// },
	];

	const columnsAssign = [
		{
			title: "Id",
			width: 50,
			dataIndex: "id",
			key: "id",
			sorter: (item1, item2) => {
				return item1.id - item2.id;
			},
		},
		{
			title: "Project Name",
			width: 300,
			dataIndex: "projectName",
			render: (text, recond, index) => {
				return <NavLink to={`/projectdetail/${recond.id}`}>{text}</NavLink>;
			},
			key: "projectName",
			sorter: (item1, item2) => {
				let projectName1 = item1.projectName?.trim().toLowerCase();
				let projectName2 = item2.projectName?.trim().toLowerCase();
				if (projectName1 < projectName2) {
					return -1;
				}
				return 1;
			},
		},

		//tạm thời không lấy derestion

		// {
		//   title: 'Description',
		//   dataIndex: 'description',
		//   key: 'description',
		//   render: (text, record, index) =>
		//   {
		//     // console.log('text',text)
		//     // console.log('record',record)
		//     // console.log('index', index)
		//     let jsxContent = ReactHtmlParser(text)
		//     return <div>
		//       {jsxContent}
		//     </div>
		//   }
		// },

		{
			title: "Category",
			width: 150,
			dataIndex: "categoryName",
			key: "categoryName",
			sorter: (item1, item2) => {
				let category1 = item1.categoryName?.trim().toLowerCase();
				let category2 = item2.categoryName?.trim().toLowerCase();
				if (category1 < category2) {
					return -1;
				}
				return 1;
			},
		},
		{
			title: "Creator",
			key: "creator",
			width: 200,
			render: (text, record, index) => {
				return <Tag color="gold"> {record.creator?.name}</Tag>;
			},
			sorter: (item1, item2) => {
				let creator1 = item1.creator?.name.trim().toLowerCase();
				let creator2 = item2.creator?.name.trim().toLowerCase();
				if (creator1 < creator2) {
					return -1;
				}
				return 1;
			},
		},
		{
			title: "members",
			key: "members",
			width: 300,
			render: (text, record, index) => {
				return (
					<div>
						{record.members?.slice(0, 3).map((member, index) => {
							return (
								<Popover
									key={index}
									placement="top"
									title="members"
									content={() => {
										return (
											<table className="table">
												<thead>
													<tr>
														<th>Id</th>
														<th>Avatar</th>
														<th>name</th>
													</tr>
												</thead>
												<tbody>
													{record.members?.map((item, index) => (
														<tr key={index}>
															<td>{item.userId}</td>
															<td>
																<img
																	src={item.avatar}
																	width="30"
																	height="30"
																	style={{ borderRadius: "15px" }}
																	alt=""
																></img>
															</td>
															<td>{item.name}</td>
														</tr>
													))}
												</tbody>
											</table>
										);
									}}
								>
									<Avatar className="m-1" key={index} src={member.avatar} />
								</Popover>
							);
						})}
						{record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
					</div>
				);
			},
		},
		{
			title: "Action",
			width: 150,
			key: "action",
			render: (text, record, index) => (
				<div size="middle">
					<button
						style={{ lineHeight: "50%" }}
						className="btn mr-2 btn-outline-danger"
						// onClick={() => {
						// 	const action = {
						// 		type: OPEN_DREWER_EDIT_PROJECT,
						// 		Component: <FromEditProject></FromEditProject>,
						// 		title: "Edit Project",
						// 	};
						// 	dispatch(action);
						// 	//dispatch dử liệu dòng hiện tại lên reducer
						// 	const actionEditProject = {
						// 		type: EDIT_PROJECT,
						// 		projectEditDrawer: record,
						// 	};
						// 	dispatch(actionEditProject);
						// }}
						onClick={() =>
						{
							const actionLeave = {
								type: "OPEN_MODAL_LEAVE_RPOJECT",
								ComponentContentModal: <FromLeaveProject record={record}></FromLeaveProject>,
								title: "Leave Project",
							}
							dispatch(actionLeave);
						}}
					>
						<i className="fa fa-sign-out-alt"></i>
					</button>

				</div>
			),
		},
	];
	return (
		<div className="container mt-5">
			<h3>Project Issues: {projectList?.length}</h3>
			<Space style={{ marginBottom: 16 }}>
				<h6
					style={{
						background: "rgb(235, 236, 240)",
						width: "600px",
						padding: "10px",
					}}
				>
					<span style={{ color: "red" }}>* </span>Note: here allows you to
					change, delete, and add members to the project you can click on the
					project name link to manage your project details more
				</h6>
			</Space>
			<Table
				pagination={{ pageSize: 3 }}
				columns={columnsIssues}
				rowKey={"id"}
				dataSource={projectList}
				onChange={handleChange}
			/>

			<Space style={{ marginBottom: 16 }}>
				<h3>Project Assignees: {projectAssign?.length}</h3>
			</Space>
			<h6
				style={{
					background: "rgb(235, 236, 240)",
					width: "600px",
					padding: "10px",
				}}
			>
				<span style={{ color: "red" }}>* </span>Note: here allows you to change,
				delete, and add members to the project you can click on the project name
				link to manage your project details more
			</h6>
			<Table
				pagination={{ pageSize: 3 }}
				columns={columnsAssign}
				rowKey={"id"}
				dataSource={projectAssign}
				onChange={handleChange}
			/>
		</div>
	);
}
