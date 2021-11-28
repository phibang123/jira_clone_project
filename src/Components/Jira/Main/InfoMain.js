import { GET_PROJECT_DETAIL_API_SAGA, GET_TASK_DETAIL_SAGA } from "../../../Redux/Constants/constants";
import { useDispatch, useSelector } from "react-redux";

import { DownCircleOutlined } from "@ant-design/icons";
import { GET_ALL_COMMENT_SAGA } from "../../../Redux/Constants/comment";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Select } from "antd";
import { TreeSelect } from "antd";
import { useState } from "react";

const { TreeNode } = TreeSelect;

export default function InfoMain(props) {
	const { id } = useSelector((state) => state.userReducer.userLogin);

	const dispatch = useDispatch();
	const { projectDetail, TaskMyIssues, projectId } = props;
	const classMyTask =  TaskMyIssues === true ? 'btn-warning': 'btn-outline-warning'
	


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
					{projectDetail.projectName}
				</span>
				<span
					className="p-2 ml-5"
					style={{ backgroundColor: "#EBECF0", borderRadius: "5px" }}
				>
					Creator: {projectDetail.creator.name}
				</span>
			</div>
			<section style={{ marginTop: "15px", marginBottom: "15px" }}>
				{ReactHtmlParser(projectDetail.description)}
			</section>
			<div className="info" style={{ display: "flex" }}>
				<div className="search-block">
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

						{/* <TreeNode value="parent 1" title="parent 1">
							  <TreeNode value="parent 1-0" title="parent 1-0">
								<TreeNode value="leaf1" title="leaf1" />
								<TreeNode value="leaf2" title="leaf2" />
							</TreeNode>
							<TreeNode value="parent 1-1" title="parent 1-1">
								<TreeNode
									value="leaf3"
									title={<b style={{ color: "#08c" }}>leaf3</b>}
								/>
							</TreeNode>
						</TreeNode> */}
					</TreeSelect>
				</div>

				<div className="avatar-group" style={{ display: "flex" }}>
					{renderAvatar()}
				</div>
				<button className={`btn ml-3 ${classMyTask}`} onClick={() =>
				{
					dispatch({
						type: "TASK_MY_ISSUES",
						myId: id
					})
				}} >
					Only My Issues
				</button>
				<button className='btn btn-dark ml-3'   onClick={() =>
				{
				
					dispatch({
						type: GET_PROJECT_DETAIL_API_SAGA,
						projectId
					})
				}}>
					Reload Project
				</button>
			</div>
		</div>
	);
}
