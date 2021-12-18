import {
	GET_ALL_TASK_API_SAGA,
	GET_PROJECT_DETAIL_API_SAGA,
	GET_PROJECT_DETAIL_API_SAGA_NOLOADING,
	GET_TASK_DETAIL_SAGA,
} from "../../../Redux/Constants/constants";
import { Input, Select } from "antd";
import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DownCircleOutlined } from "@ant-design/icons";
import FromChart from "../../Froms/FromChart/FromChart";
import { GET_ALL_COMMENT_SAGA } from "../../../Redux/Constants/comment";
import ReactHtmlParser from "react-html-parser";
import { TreeSelect } from "antd";
import { useState } from "react";

const { TreeNode } = TreeSelect;

 function InfoMain(props) {
	const { id } = useSelector((state) => state.userReducer.userLogin);
 
	const dispatch = useDispatch();
	const { projectDetail, TaskMyIssues, projectId } = props; 
	useCallback(projectDetail, [projectDetail]);
 
	const classMyTask =
		TaskMyIssues === true ? "btn-warning" : "btn-outline-warning";
	


	const renderAvatar = () => {
		return projectDetail.members?.map((user, index) => {
			return (
				<div key={index} className="avatar">
					<img src={user.avatar} alt="" />
				</div>
			);
		});
	};
	const [value, setValue] = useState(undefined);
	const onChange = () => {
		setValue(value);
	};
	return (
		<div>
			<div className="d-lex justify-content-center">
				<span style={{ fontSize: "28px", fontWeight: "700" }} className="mb-3">
					{projectDetail?.projectName}
				</span>
				<span
					className="p-2 ml-5"
					style={{ backgroundColor: "#EBECF0", borderRadius: "5px" }}
				>
					Creator: {projectDetail?.creator?.name}
				</span>
			</div>
			<section style={{ marginTop: "15px", marginBottom: "15px" }}>
				{ReactHtmlParser(projectDetail?.description)}
			</section>
			<div className="info" style={{ display: "flex" }}>
				<div className="search-block">
					{/* <Input></Input> */}
					<TreeSelect
						showSearch
						style={{ width: "200px" }}
						value={value}
						dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
						placeholder="Please select"
						allowClear
						treeDefaultExpandAll
						onChange={onChange}
					>
						{projectDetail.lstTask?.map((status, index) => {
							return (
								<>
									<TreeNode
										key={index}
										value={status.taskName}
										title={<b style={{ color: "#08c" }}>{status.statusName}</b>}
									>
										{status?.lstTaskDeTail.map((taskDetail, index) => {
											return (
												<TreeNode
													onClick={() => {
														dispatch({
															type: GET_TASK_DETAIL_SAGA,
															taskId: taskDetail.taskId,
														});
														dispatch({
															type: GET_ALL_COMMENT_SAGA,
															taskId: taskDetail.taskId,
														});
													}}
													data-toggle="modal"
													data-target="#infoModal"
													key={index.index}
													value={taskDetail.taskName}
													title={taskDetail.taskName}
												/>
											);
										})}
									</TreeNode>
								</>
							);
						})}
					</TreeSelect>
				</div>

				<div className="avatar-group" style={{ display: "flex" }}>
					{renderAvatar()}
				</div>
				<button
					className={`btn ml-3 ${classMyTask}`}
					onClick={() => {
						TaskMyIssues
							? dispatch({
								type: GET_PROJECT_DETAIL_API_SAGA_NOLOADING,
								projectId,
							})
				
							
							: dispatch({
									type: "TASK_MY_ISSUES",
									myId: id,
							  });
					}}
				>
					{TaskMyIssues ? "Get All Task" : "Only My Issues "}
				</button>
				<button
					className="btn btn-dark ml-3"
					onClick={() => {
						dispatch({
							type: GET_PROJECT_DETAIL_API_SAGA,
							projectId,
						})
						dispatch({
							type: GET_ALL_TASK_API_SAGA,
							projectId,
						})
					}}
				>
					Reload Project
				</button>

				<button
					className="btn btn-dark ml-3"
					onClick={() => {
						dispatch({
							type: "OPEN_MODAL_CHART_JIRA",
							callBackSubmit: () => {
								dispatch({ type: "CLOSE_MODAL" });
							},
							ComponentContentModal: (
								<FromChart projectDetail={projectDetail}  allTask={props.getAllTask}></FromChart>
							),
							title: "Chart",
						});
					}}
				>
					statistical
				</button>
			</div>
		</div>
	);
}


export default memo(InfoMain)