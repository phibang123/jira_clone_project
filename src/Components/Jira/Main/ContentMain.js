import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	BugOutlined,
	FileTextOutlined,
	MinusOutlined,
	PaperClipOutlined,
	SwapOutlined,
	VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import {
	CHANGE_TASK_MODAL_API,
	GET_TASK_DETAIL_SAGA,
	UPDATE_TASK_STATUS_REDUCER_TEXT,
	UPDATE_TASK_STATUS_SAGA_TEXT,
} from "../../../Redux/Constants/constants";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

export default function ContentMain(props) {
	const { projectDetail } = props;
	//const {projectDetail} = useSelector(state => state.projectReducer)
	const dispatch = useDispatch();

	const handleDragEnd = (result) => {
		let { projectId, taskId, taskDetail } = JSON.parse(result.draggableId); //vì ở dướ chỉ sổ ra chuỗi mà mình muốn đưa ra 1 object nên chúng ta phải làm vậy

		let { source, destination } = result;
		///gọi api cập nhập lại status
		if (!destination) {
			return;
		} else if (
			destination.index === source.index &&
			destination.droppableId === source.droppableId
		) {
			return;
		}
		// if (destination.droppableId === "4") {
		// 	const actionLeave = {
		// 		type: "OPEN_MODAL_CONFIRM_TASK",
		// 		ComponentContentModal: (
		// 			<FromConfirmTask
						
		// 			></FromConfirmTask>
		// 		),
		// 		title: "Confirm task done",
		// 	};
		// 	dispatch(actionLeave);
		// } 
			dispatch({
				type: UPDATE_TASK_STATUS_SAGA_TEXT,
				actionType: CHANGE_TASK_MODAL_API,

				taskUpdateStatus: {
					taskId: taskId,

					statusId: destination.droppableId,
					projectId: projectId,
					statusOld: source.droppableId,
					taskDetail: taskDetail,
				},
			});
	
	};
	const renderCardTaskList = () => {
		return (
			<DragDropContext onDragEnd={handleDragEnd}>
				{projectDetail.lstTask?.map((taskListDetail, index) => {
					return (
						<Droppable key={index} droppableId={taskListDetail.statusId}>
							{(provider) => {
								return (
									<div
										className="card"
										style={{
											width: "17rem",
											minHeight: "25rem",
											height: "auto",
										}}
									>
										<div className="card-header">
											{taskListDetail.statusName} (
											{taskListDetail.lstTaskDeTail.length})
										</div>
										<div
											ref={provider.innerRef}
											{...provider.droppableProps}
											key={index}
											style={{ height: "100%" }}
											className="list-group list-group-flush"
										>
											{taskListDetail.lstTaskDeTail.map((task, index) => {
												return (
													<Draggable
														key={task.taskId.toString()}
														index={index}
														draggableId={JSON.stringify({
															projectId: task.projectId,
															taskId: task.taskId,
															taskDetail: task,
														})}
													>
														{(provider) => {
															return (
																<div
																	key={index}
																	ref={provider.innerRef}
																	{...provider.draggableProps}
																	{...provider.dragHandleProps}
																	onClick={() => {
																		dispatch({
																			type: GET_TASK_DETAIL_SAGA,
																			taskId: task.taskId,
																		});
																	}}
																	className="list-group-item"
																	data-toggle="modal"
																	data-target="#infoModal"
																>
																	<p className="font-weight-normal">
																		{task.taskName}
																	</p>
																	<div
																		className="block"
																		style={{
																			display: "flex",
																			alignItems: "center",
																			justifyContent: "space-between",
																		}}
																	>
																		<div className="block-left d-flex">
																			<span>
																				{task.priorityTask.priority ===
																				"High" ? (
																					<ArrowUpOutlined
																						style={{
																							color: "red",
																							fontSize: "16px",
																							margin: "3px",
																						}}
																					/>
																				) : task.priorityTask.priority ===
																				  "Medium" ? (
																					<SwapOutlined
																						style={{
																							fontSize: "16px",
																							margin: "3px",
																						}}
																					/>
																				) : task.priorityTask.priority ===
																				  "Low" ? (
																					<ArrowDownOutlined
																						style={{
																							color: "yellow",
																							fontSize: "16px",
																							margin: "3px",
																						}}
																					/>
																				) : task.priorityTask.priority ===
																				  "Lowest" ? (
																					<VerticalAlignBottomOutlined
																						style={{
																							color: "green",
																							fontSize: "16px",
																							margin: "3px",
																						}}
																					/>
																				) : (
																					""
																				)}
																			</span>
																			<span>
																				{task.taskTypeDetail.taskType ===
																				"BUG" ? (
																					<BugOutlined
																						style={{
																							color: "blue",
																							fontSize: "16px",
																							margin: "3px",
																						}}
																					/>
																				) : task.taskTypeDetail.taskType ===
																				  "TASK" ? (
																					<FileTextOutlined
																						style={{
																							color: "#146870",
																							fontSize: "16px",
																							margin: "3px",
																						}}
																					/>
																				) : (
																					<PaperClipOutlined
																						style={{
																							color: "#6aba3c",
																							fontSize: "16px",
																							margin: "3px",
																						}}
																					/>
																				)}
																			</span>
																			<span>
																				<img
																					style={{
																						margin: "3px",
																						width: "20px",
																						height: "20px",
																						borderRadius: "50%",
																					}}
																					alt={task?.userReporter?.avatar}
																					src={task?.userReporter?.avatar}
																				></img>
																			</span>
																			{/* <i className="fa fa-bookmark" />
												<i className="fa fa-arrow-up" /> */}
																		</div>
																		<div className="block-right">
																			<div
																				className="avatar-group"
																				style={{
																					display: "flex",
																					flexWrap: "wrap",
																					justifyContent: "end",
																				}}
																			>
																				{task.assigness?.map((mem, index) => {
																					return (
																						<div key={index} className="avatar">
																							<img
																								style={{
																									width: "30px",
																									height: "30px",
																								}}
																								src={mem.avatar}
																								alt={mem.avatar}
																							/>
																						</div>
																					);
																				})}
																			</div>
																		</div>
																	</div>
																</div>
															);
														}}
													</Draggable>
												);
											})}

											{/* <li className="list-group-item">Vestibulum at eros</li> */}
											{provider.placeholder}
										</div>
									</div>
								);
							}}
						</Droppable>
					);
				})}
				;
			</DragDropContext>
		);
	};
	return (
		<div className="content" style={{ display: "flex" }}>
			{renderCardTaskList()}
		</div>
	);
}
