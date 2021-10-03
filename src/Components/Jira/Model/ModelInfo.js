import * as Yup from "yup";

import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	BugOutlined,
	DeleteOutlined,
	FileTextOutlined,
	MinusOutlined,
	VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Button,
	Comment,
	Form,
	Input,
	Popconfirm,
	Tooltip,
} from "antd";
import {
	CHANGE_ASSIGNESS,
	CHANGE_TASK_MODAL_API,
	CHANGE_TASK_MODAL_API_SAGA,
	DELETE_TASK_API_SAGA,
	REMAVE_USER_ASSIGN,
	UPDATE_TASK_STATUS_SAGA_TEXT,
} from "../../../Redux/Constants/constants";
import {
	DELETE_COMMENT_SAGA,
	GET_ALL_COMMENT_SAGA,
	INSERT_COMMENT_SAGA,
} from "../../../Redux/Constants/comment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Editor } from "@tinymce/tinymce-react";
import { GELL_ALL_TASK_TYPE_SAGA } from "../../../Redux/Constants/taskType";
import { GET_ALL_PRIORITY_SAGA } from "../../../Redux/Constants/priority";
import { GET_ALL_STATUS_API_SAGA } from "../../../Redux/Constants/status";
import ReactHtmlParser from "react-html-parser";
import { Select } from "antd";
import { USER_LOGIN } from "../../../Utils/constants/settingSystem";
import { useFormik } from "formik";

const { TextArea } = Input;
const Editors = ({ onChange, onSubmit, submitting, value }) => (
	<>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button
				htmlType="submit"
				loading={submitting}
				onClick={onSubmit}
				type="primary"
			>
				Add Comment
			</Button>
		</Form.Item>
	</>
);
export default function ModelInfo() {
	//distpath
	const dispatch = useDispatch();
	//useRef
	const editorRef = useRef(null);
	let usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));

	//useSelecet
	const { taskDetailModal } = useSelector((state) => state.TaskReducer);
	const { arrStatus } = useSelector((state) => state.StatusReducer);
	const { arrPriority } = useSelector((state) => state.PriorityReducer);
	const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
	const { projectDetail } = useSelector((state) => state.projectReducer);

	//useState
	const [visibleEditor, setVisibleEditor] = useState(false);
	const [visibleInput, setVisibleInput] = useState(false);
	const [historyContent, sethiStoryContent] = useState(
		taskDetailModal.description
	);
	const [content, setContent] = useState(taskDetailModal.description);
	const [comment, setComment] = React.useState({
		submitting: false,
		value: "",
	});

	//function

	useEffect(() => {
		dispatch({
			type: GET_ALL_STATUS_API_SAGA,
		});
		dispatch({
			type: GET_ALL_PRIORITY_SAGA,
		});
		dispatch({
			type: GELL_ALL_TASK_TYPE_SAGA,
		});
	}, []);

	//comment
	const actions = (com) => {
		return [
			<Tooltip key="comment-basic-dislike">
				<span
					style={{ color: "red" }}
					onClick={() => {
						dispatch({
							type: DELETE_COMMENT_SAGA,
							id: com.id,
							taskId: com.taskId,
						});
					}}
				>
					<span className="comment-action">Delete</span>
				</span>
			</Tooltip>,
		];
	};
	const renderDescription = () => {
		const jxsDescription = ReactHtmlParser(taskDetailModal.description);
		return (
			<div>
				{visibleEditor ? (
					<div className="m-2">
						<Editor
							apiKey="fljctmgnb3bhnix02044qlbuxoyf1onlwfbirols7rgblf1z"
							// onChange={handleChange}
							// onBlur={handleBlur}
							name="description"
							initialValue={taskDetailModal.description}
							onInit={(evt, editor) => (editorRef.current = editor)}
							init={{
								height: 300,
								selector: "textarea",
								document_base_url: "https://jiraclonebonlang.herokuapp.com",
								plugins:
									"a11ychecker advcode casechange export formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker",
								toolbar:
									"a11ycheck addcomment showcomments casechange checklist code export formatpainter pageembed permanentpen table",
								toolbar_mode: "floating",
								tinycomments_mode: "embedded",
								tinycomments_author: "Author name",
							}}
							onEditorChange={(content, editor) => {
								setContent(content);
							}}
						/>
						<button
							className="btn btn-primary m-2"
							onClick={() => {
								dispatch({
									type: CHANGE_TASK_MODAL_API_SAGA,
									actionType: CHANGE_TASK_MODAL_API,
									name: "description",
									value: content,
								});
								setVisibleEditor(false);
							}}
						>
							Save
						</button>
						<button
							className="btn btn-danger m-2"
							onClick={() => {
								setVisibleEditor(false);
							}}
						>
							Close
						</button>
					</div>
				) : (
					<div
						className="mt-3 mb-3"
						onClick={() => {
							setVisibleEditor(!visibleEditor);
						}}
					>
						{" "}
						{jxsDescription}{" "}
					</div>
				)}
			</div>
		);
	};
	const handleChanges = (e) => {
		const { name, value } = e.target;
		dispatch({
			type: CHANGE_TASK_MODAL_API_SAGA,
			actionType: CHANGE_TASK_MODAL_API,
			name,
			value,
		});
		// dispatch({
		// 	type: CHANGE_TASK_MODAL_API,
		// 	name,
		// 	value,
		// });
	};

	const renderTimeTracking = () => {
		const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

		const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);

		const persent = Math.round((Number(timeTrackingSpent) / max) * 100);

		return (
			<div>
				<div style={{ display: "flex" }}>
					<i className="fa fa-clock" />
					<div style={{ width: "100%" }}>
						<div className="progress">
							<div
								className="progress-bar"
								role="progressbar"
								style={{ width: `${persent}%` }}
								aria-valuenow={Number(timeTrackingSpent)}
								aria-valuemin={Number(timeTrackingRemaining)}
								aria-valuemax={max}
							/>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<p className="logged">{Number(timeTrackingSpent)}h logged</p>
							<p className="estimate-time">
								{Number(timeTrackingRemaining)}h estimated
							</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<input
							className="form-control "
							name="timeTrackingSpent"
							value={Number(timeTrackingSpent)}
							onChange={(e) => {
								handleChanges(e);
							}}
						></input>
					</div>
					<div className="col-6">
						<input
							className="form-control"
							value={Number(timeTrackingRemaining)}
							onChange={(e) => {
								handleChanges(e);
							}}
							name="timeTrackingRemaining"
						></input>
					</div>
				</div>
			</div>
		);
	};

	//formik cho comment
	const handleSubmit = () => {
		if (!comment.value) {
			return;
		}

		setComment({
			submitting: true,
		});
		dispatch({
			type: INSERT_COMMENT_SAGA,
			comment: {
				taskId: taskDetailModal.taskId,
				contentComment: comment.value,
			},
		});
		setTimeout(() => {
			setComment({
				submitting: false,
				value: "",
			});
		}, 1000);
	};
	const handleChangeInput = (e) => {
		let { value, name } = e.target;

		setComment({
			value: value,
		});
	};

	return (
		<div
			className="modal fade"
			id="infoModal"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="infoModal"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-info">
				<div className="modal-content">
					<div className="modal-header">
						<div className="task-title d-flex align-items-baseline">
							<p>
								{taskDetailModal.typeId === 1 ? (
									<BugOutlined
										style={{ color: "blue", fontSize: "16px", margin: "3px" }}
									/>
								) : (
									<FileTextOutlined
										style={{
											color: "#146870",
											fontSize: "16px",
											margin: "3px",
										}}
									/>
								)}
							</p>
							<select
								className="form-control"
								onChange={handleChanges}
								name="typeId"
								value={taskDetailModal.typeId}
							>
								{arrTaskType.map((tp, index) => {
									return (
										<option key={index} value={tp.id}>
											{tp.taskType}
										</option>
									);
								})}
							</select>
						</div>

						<div style={{ display: "flex" }} className="task-click">
							<Button
								onClick={() => {
									dispatch({
										type: DELETE_TASK_API_SAGA,
										taskId: taskDetailModal.taskId,
										projectId: taskDetailModal.projectId,
									});
								}}
								data-toggle="modal"
								data-target="#infoModal"
								style={{ outline: "none", border: "none" }}
								icon={<DeleteOutlined />}
							></Button>

							<button
								type="button"
								style={{ outline: "none" }}
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
					</div>
					<div className="modal-body">
						<div className="container-fluid">
							<div className="row">
								<div className="col-8">
									<h2
										style={{
											fontWeight: "500",
											padding: "20px",
											borderRadius: "10px",
											background: "rgb(235, 236, 240)",
										}}
									>
										{taskDetailModal.taskName}
									</h2>
									<div className="description">
										<h6
											style={{
												marginTop: "0",
												color: "rgba(0, 0, 0, 0.85)",
												fontWeight: "500",
											}}
										>
											Description
										</h6>
										{renderDescription()}
									</div>
									<div className="comment mt-4 ">
										<h6>Comment</h6>
										<div className="block-comment " style={{ display: "flex" }}>
											<div className="input-comment mb-1 mt-2">
												{visibleInput ? (
													<Comment
														avatar={<Avatar src={usLogin?.avatar} />}
														content={
															<Editors
																onChange={handleChangeInput}
																onSubmit={handleSubmit}
																submitting={comment.submitting}
																value={comment.value}
															/>
														}
													/>
												) : (
													<input
														className="form-control"
														value="Click to Comment"
														onClick={() => {
															setVisibleInput(!visibleInput);
														}}
													></input>
												)}
											</div>
										</div>
										<div className="lastest-comment">
											{taskDetailModal.lstComment?.map((comment, index) => {
												return (
													<Comment
														key={index}
														actions={actions(comment)}
														author={<span>{comment.user?.name}</span>}
														avatar={
															<Avatar
																src={comment.user?.avatar}
																alt={comment.user?.name}
															/>
														}
														content={comment.contentComment}
													/>
												);
											})}
										</div>
									</div>
								</div>
								<div className="col-4">
									<div className="status">
										<h6>STATUS</h6>

										{/* map select status */}
										<select
											className="custom-select"
											name="statusId"
											value={taskDetailModal.statusId}
											onChange={(e) => {
												handleChanges(e);
												// dispatch({
												//   type: UPDATE_TASK_STATUS_SAGA_TEXT,
												//   taskUpdateStatus: {
												// 		taskId: taskDetailModal.taskId,
												//     statusId: e.target.value,
												//     projectId: taskDetailModal.projectId
												// 	},
												//   })
											}}
										>
											{arrStatus?.map((status, index) => {
												return (
													<option key={index} value={status.statusId}>
														{status.statusName}
													</option>
												);
											})}
										</select>
									</div>
									<div className="assignees">
										<h6>ASSIGNEES</h6>
										<div style={{ display: "flex", flexWrap: "wrap" }}>
											{/* map assigness */}
											{taskDetailModal.assigness.map((user, index) => {
												return (
													<div
														key={index}
														style={{ display: "flex" }}
														className="item"
													>
														<div className="avatar">
															<img src={user.avatar} alt={user.avatar} />
														</div>
														<p
															style={{
																overflow: "hidden",
																textOverflow: "ellipsis",
																width: "50px",
															}}
															className="name mt-1 ml-1"
														>
															{user.name}
														</p>
														<button
															className="btn	p-0"
															onClick={() => {
																dispatch({
																	type: CHANGE_TASK_MODAL_API_SAGA,
																	actionType: REMAVE_USER_ASSIGN,
																	userId: user.id,
																});
															}}
															// 	dispatch({
															// 		type: REMAVE_USER_ASSIGN,
															// 		userId: user.id,
															// 	});
															// }}
														>
															<i
																className="fa fa-times"
																style={{ marginLeft: 5, cursor: "pointer" }}
																type="button"
															/>
														</button>
													</div>
												);
											})}

											<div className="col-6 mt-2 mb-2">
												<Select
													showSearch
													options={projectDetail.members
														?.filter((mem) => {
															let index = taskDetailModal.assigness?.findIndex(
																(us) => us.id === mem.userId
															);
															if (index !== -1) {
																return false;
															} else {
																return true;
															}
														})
														.map((mem, index) => {
															return { value: mem.userId, label: mem.name };
														})}
													optionFilterProp="label"
													style={{ width: "100%" }}
													value="Select User"
													name="lstUser"
													onSelect={(value) => {
														//nom nha là nó sẻ tìm thằng mà mình đã click vào
														//và lấy ra đẩy đủ thông tin của nó
														//rồi truyền vào reducer
														//nhưng vấn đề là mình lấy thong tin của  projectDetail.members mà truyền vào taskDetailModal.assigness
														//nên đâm ra 1 cái id 1 cái userId
														//hướng giải quyết là thêm trường id khi thêm vào taskDetailModal.assigness => xong

														let userSelected = projectDetail.members.find(
															(mem) => mem.userId == value
														);
														userSelected = {
															...userSelected,
															id: userSelected.userId,
														};

														dispatch({
															type: CHANGE_TASK_MODAL_API_SAGA,
															actionType: CHANGE_ASSIGNESS,
															userSelected,
														});
													}}
												></Select>
											</div>
										</div>
									</div>
									<div className="priority" style={{ marginBottom: 20 }}>
										<h6>PRIORITY</h6>

										{/* map select prioryti */}
										<select
											className="form-control"
											name="priorityId"
											value={taskDetailModal.priorityId}
											onChange={handleChanges}
										>
											{arrPriority?.map((priority, index) => {
												return (
													<option key={index} value={priority.priorityId}>
														{priority.priority}
													</option>
												);
											})}
										</select>
									</div>
									<div className="estimate">
										<h6>ORIGINAL ESTIMATE (HOURS)</h6>
										<input
											name="originalEstimate"
											onChange={(e) => {
												handleChanges(e);
											}}
											type="text"
											className="estimate-hours"
										/>
									</div>
									<div className="time-tracking">
										<h6>TIME TRACKING</h6>
										{renderTimeTracking()}
									</div>
									<div style={{ color: "#929398" }}>Create at a month ago</div>
									<div style={{ color: "#929398" }}>
										Update at a few seconds ago
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
