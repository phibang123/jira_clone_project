import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	BugOutlined,
	FileTextOutlined,
	MinusOutlined,
	VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import {
	CHANGE_TASK_MODAL_API_SAGA,
	UPDATE_TASK_STATUS_SAGA_TEXT,
} from "../../../Redux/Constants/constants";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Editor } from "@tinymce/tinymce-react";
import { Formik } from "formik";
import { GELL_ALL_TASK_TYPE_SAGA } from "../../../Redux/Constants/taskType";
import { GET_ALL_PRIORITY_SAGA } from "../../../Redux/Constants/priority";
import { GET_ALL_STATUS_API_SAGA } from "../../../Redux/Constants/status";
import ReactHtmlParser from "react-html-parser";

export default function ModelInfo() {
	const dispatch = useDispatch();
	const editorRef = useRef(null);
	const { taskDetailModal } = useSelector((state) => state.TaskReducer);
	const { arrStatus } = useSelector((state) => state.StatusReducer);
	const { arrPriority } = useSelector((state) => state.PriorityReducer);
	const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, sethiStoryContent] = useState(taskDetailModal.description)
  const [content, setContent] = useState(taskDetailModal.description)
	console.log("new", taskDetailModal);
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

	const renderDescription = () => {
		const jxsDescription = ReactHtmlParser(taskDetailModal.description);
		return (
      <div >
        {visibleEditor ? (
          <div className='m-2'>
					<Editor
						apiKey="fljctmgnb3bhnix02044qlbuxoyf1onlwfbirols7rgblf1z"
						// onChange={handleChange}
						// onBlur={handleBlur}
            name='description'
            initialValue={taskDetailModal.description}
						onInit={(evt, editor) => (editorRef.current = editor)}
					
						init={{
							height: 300,
							menubar: false,
							plugins: [
								"advlist autolink lists link image charmap print preview anchor",
								"searchreplace visualblocks code fullscreen",
								"insertdatetime media table paste code help wordcount",
							],
							toolbar:
								"undo redo | formatselect | " +
								"bold italic backcolor | alignleft aligncenter " +
								"alignright alignjustify | bullist numlist outdent indent | " +
								"removeformat | help",
							content_style:
								"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
						}}
						onEditorChange={(content, editor) => {
							setContent(content)
						}}
            />
            <button className='btn btn-primary m-2' onClick={() =>
            {
              dispatch({
                type: CHANGE_TASK_MODAL_API_SAGA,
                name: 'description',
                value: content
              })
              setVisibleEditor(false)
            }}>Save</button>
            <button className='btn btn-danger m-2' onClick={() =>
            {
              setVisibleEditor(false)
            }}>Close</button>
				</div>) : (
					  <div className='mt-3 mb-3' onClick={() =>
              {
                setVisibleEditor(!visibleEditor)
              }}> {jxsDescription} </div>
				)}
			</div>
		);
	};
	const handleChanges = (e) => {
		const { name, value } = e.target;
		dispatch({
			type: CHANGE_TASK_MODAL_API_SAGA,
			name,
			value,
		});
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
							onChange={(e) => {
								handleChanges(e);
							}}
						></input>
					</div>
					<div className="col-6">
						<input
							className="form-control"
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
								{taskDetailModal.typeId === "1" ? (
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
							<div>
								<i className="fab fa-telegram-plane" />
								<span style={{ paddingRight: 20 }}>Give feedback</span>
							</div>
							<div>
								<i className="fa fa-link" />
								<span style={{ paddingRight: 20 }}>Copy link</span>
							</div>
							<i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
							<button
								type="button"
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
									<p className="issue">{taskDetailModal.taskName}</p>
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
									<div className="comment">
										<h6>Comment</h6>
										<div className="block-comment" style={{ display: "flex" }}>
											<div className="avatar">
												<img src="https://picsum.photos/50/50" alt="" />
											</div>
											<div className="input-comment">
												<input type="text" placeholder="Add a comment ..." />
												<p>
													<span style={{ fontWeight: 500, color: "gray" }}>
														Protip:
													</span>
													<span>
														press
														<span
															style={{
																fontWeight: "bold",
																background: "#ecedf0",
																color: "#b4bac6",
															}}
														>
															M
														</span>
														to comment
													</span>
												</p>
											</div>
										</div>
										<div className="lastest-comment">
											<div className="comment-item">
												<div
													className="display-comment"
													style={{ display: "flex" }}
												>
													<div className="avatar">
														<img src="https://picsum.photos/50/50" alt="" />
													</div>
													<div>
														<p style={{ marginBottom: 5 }}>
															Lord Gaben <span>a month ago</span>
														</p>
														<p style={{ marginBottom: 5 }}>
															Lorem ipsum dolor sit amet, consectetur
															adipisicing elit. Repellendus tempora ex
															voluptatum saepe ab officiis alias totam ad
															accusamus molestiae?
														</p>
														<div>
															<span style={{ color: "#929398" }}>Edit</span>•
															<span style={{ color: "#929398" }}>Delete</span>
														</div>
													</div>
												</div>
											</div>
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
														<p className="name mt-1 ml-1">
															{user.name}
															<i
																className="fa fa-times"
																style={{ marginLeft: 5 }}
															/>
														</p>
													</div>
												);
											})}

											<div style={{ display: "flex", alignItems: "center" }}>
												<i className="fa fa-plus" style={{ marginRight: 5 }} />
												<span>Add more</span>
											</div>
										</div>
									</div>
									{/* <div className="reporter">
										<h6>REPORTER</h6>
										<div style={{ display: "flex" }} className="item">
											<div className="avatar">
												<img src="https://picsum.photos/50/50" alt="" />
											</div>
											<p className="name">
												Pickle Rick
												<i className="fa fa-times" style={{ marginLeft: 5 }} />
											</p>
										</div>
									</div> */}
									<div className="priority" style={{ marginBottom: 20 }}>
										<h6>PRIORITY</h6>

										{/* map select prioryti */}
										<select
											className="form-control"
											value={taskDetailModal.priorityTask.priorityId}
											onChange={(e) => {}}
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
