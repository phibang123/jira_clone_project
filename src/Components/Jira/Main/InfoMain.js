import { useDispatch, useSelector } from "react-redux";

import { DownCircleOutlined } from "@ant-design/icons";
import { GET_ALL_COMMENT_SAGA } from "../../../Redux/Constants/comment";
import { GET_TASK_DETAIL_SAGA } from "../../../Redux/Constants/constants";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Select } from "antd";
import { TreeSelect } from "antd";
import { useState } from "react";

const { TreeNode } = TreeSelect;

export default function InfoMain(props) {
	const dispatch = useDispatch();
	const {id} = useSelector(state => state.userReducer?.userLogin)
	const { projectDetail } = props;

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
				{" "}
				<span style={{ fontSize: "28px", fontWeight: "700" }} className="mb-3">
					{projectDetail.projectName}
				</span>{" "}
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
				<button onClick={() =>
				{
					dispatch({
						type: 'ONLY_MY_TASK',
						id: id
					})
				}} style={{ marginLeft: 20 }} className="mr-5 text btn btn-dark text-white rounded">
					Only My Issues
				</button>
			
			</div>
		</div>
	);
}
