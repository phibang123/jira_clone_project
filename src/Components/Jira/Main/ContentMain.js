import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	BugOutlined,
	FileTextOutlined,
	MinusOutlined,
	VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GET_TASK_DETAIL_SAGA, UPDATE_TASK_STATUS_SAGA_TEXT } from "../../../Redux/Constants/constants";

import React from "react";
import { useDispatch } from "react-redux";

export default function ContentMain(props) {
	const { projectDetail } = props;
	const dispatch = useDispatch();

	const handleDragEnd = (result) =>
	{
		let{projectId,taskId} = JSON.parse(result.draggableId)  //vì ở dướ chỉ sổ ra chuỗi mà mình muốn đưa ra 1 object nên chúng ta phải làm vậy
		console.log("result", result);

		let {source,destination} = result
		///gọi api cập nhập lại status
		if (!destination)
		{
			return
		}
		else if (source.index === destination.index && source.droppableId === destination.droppableId)
		{
			return 
		}
		console.log(result.draggableId,'result.draggableId')
		console.log(destination.droppableId,'destination.draggableId')
		dispatch({
			type: UPDATE_TASK_STATUS_SAGA_TEXT,
			taskUpdateStatus: {
				"taskId": taskId,
				"statusId": destination.droppableId,
				"projectId": projectId
			}
		})
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
											style={{height: '100%'}}
											className="list-group list-group-flush"
										>
											{taskListDetail.lstTaskDeTail.map((task, index) => {
												return (
													<Draggable
														key={task.taskId.toString()}
														index={index}
														draggableId={JSON.stringify({projectId: task.projectId,taskId: task.taskId})}
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
																	<p className="font-wieght-bold">
																		{task.taskName}
																	</p>
																	<div
																		className="block"
																		style={{ display: "flex" }}
																	>
																		<div className="block-left d-flex">
																			<p>
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
																					<MinusOutlined />
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
																			</p>
																			<p>
																				{task.taskTypeDetail.taskType ===
																				"bug" ? (
																					<BugOutlined
																						style={{
																							color: "blue",
																							fontSize: "16px",
																							margin: "3px",
																						}}
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
																			{/* <i className="fa fa-bookmark" />
												<i className="fa fa-arrow-up" /> */}
																		</div>
																		<div className="block-right">
																			<div
																				className="avatar-group"
																				style={{ display: "flex" }}
																			>
																				{task.assigness?.map((mem, index) => {
																					return (
																						<div key={index} className="avatar">
																							<img
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
