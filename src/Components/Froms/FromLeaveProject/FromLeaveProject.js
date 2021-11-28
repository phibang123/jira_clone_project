import { LEAVE_PROJECT_SAGA } from "../../../Redux/Constants/constants";
import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function FromLeaveProject(props) {
	const dispatch = useDispatch();
	console.log(props);
	let { projectName, id } = props.record;

	useEffect(() => {
		dispatch({
			type: "SET_LEAVE_PROJECT",
			Function: () => {
				dispatch({ type: LEAVE_PROJECT_SAGA, projectId: id });
			},
		});
	}, []);
	return (
		<div>
			<p style={{ fontSize: "20px", fontWeight: "300" }}>
				Do you want leave project:{" "}
				<span style={{ fontSize: "22px", fontWeight: "700" }}>
					{projectName}
				</span>{" "}
				?
			</p>
		</div>
	);
}
