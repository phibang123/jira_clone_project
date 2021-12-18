import { GET_ALL_TASK_API_SAGA, GET_PROJECT_DETAIL_API_SAGA } from "../../../Redux/Constants/constants";
import React, { useEffect } from "react";

import { UPDATE_TASK_STATUS_SAGA_DONE_TEXT } from "../../../Redux/Constants/taskType";
import { useDispatch } from "react-redux";

export default function FromConfirmTask(props) {
	console.log(props);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({
			type: "SET_DONE_TASK",
			Function: () => {
				dispatch({
					type: UPDATE_TASK_STATUS_SAGA_DONE_TEXT,
					taskUpdateStatus: props?.task,
				});
			},
			cancel: () => {
				dispatch({
					type: GET_PROJECT_DETAIL_API_SAGA,
					projectId: props?.task?.projectId,
				})
				dispatch({
					type: GET_ALL_TASK_API_SAGA,
					projectId: props?.task?.projectId,
				});
			},
		});
	}, []);
	return (
		<div>
			<p style={{ fontSize: "20px", fontWeight: "300" }}>
				Confirm Task <span style={{fontSize: "22px",fontWeight: "500"}}>{props?.task?.taskDetail?.taskName}</span> Completed
				<span style={{ fontSize: "22px", fontWeight: "700" }}></span> ?
			</p>
		</div>
	);
}
