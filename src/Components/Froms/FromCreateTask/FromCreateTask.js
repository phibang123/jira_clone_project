import * as Yup from "yup";

import {
	CREATE_TASK_SAGA,
	GET_LIST_PROJECT_SAGA,
	GET_LIST_PROJECT_SAGA_ISSUES,
	GET_USER_BY_PROJECT_ID_SAGA,
	GET_USER_SAGA_API,
} from "../../../Redux/Constants/constants";
import React, { useEffect, useRef, useState } from "react";
import { Select, Slider } from "antd";
import { connect, useDispatch } from "react-redux";

import { Editor } from "@tinymce/tinymce-react";
import { GELL_ALL_TASK_TYPE_SAGA } from "../../../Redux/Constants/taskType";
import { GET_ALL_PRIORITY_SAGA } from "../../../Redux/Constants/priority";
import { GET_ALL_STATUS_API_SAGA } from "../../../Redux/Constants/status";
import { useSelector } from "react-redux";
import { withFormik } from "formik";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
	children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function FromCreateTask(props) {
	const {
		values,
		touched,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
		resetForm,
	} = props;

	const dispatch = useDispatch();

	const { projectList, projectUserAddTask } = useSelector(
		(state) => state.ProjectIssuesReducer
	);

	const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
	const { arrPriority } = useSelector((state) => state.PriorityReducer);
	const { arrStatus } = useSelector((state) => state.StatusReducer);
	const { arrUser } = useSelector((state) => state.userReducer);
	// hàm biền dổi option trên thẻ select

	const userOption =
		arrUser?.length > 0
			? arrUser?.map((item, index) => {
					return { value: item.userId, label: item.name };
			  })
			: [];

	const editorRef = useRef(null);
	const [size, setSize] = React.useState("default");

	


	const [timeTracking, setTimeTracking] = useState({
		timeTrackingSpent: 0,
		timeTrackingRemaining: 0,
	});

	useEffect(() => {
		dispatch({
			type: GET_LIST_PROJECT_SAGA_ISSUES,
		});
		dispatch({
			type: GELL_ALL_TASK_TYPE_SAGA,
		});
		dispatch({
			type: GET_ALL_PRIORITY_SAGA,
		});
		dispatch({
			type: GET_USER_SAGA_API,
			keyWord: "",
		});
		// dispatch({
		// 	type: GET_ALL_STATUS_API_SAGA
		// });

		// đưa hàm handle submit lên modal reducer để cập nhật lại sự kiện cho nút submit

		dispatch({
			type: "SET_SUBMIT_CREATE_TASK",
			submitFunction: handleSubmit,
			resetForm: resetForm,
			
		});
	}, []);

	// const handleSizeChange = (e) => {
	// 	setSize(e.target.value);
	// };

	return (
		<div>
			{projectList?.length > 0 ? (
				<form className="container" onSubmit={handleSubmit}>
					<div className="form-group">
						<p>Project</p>
						<select
							name="projectId"
							className="form-control"
							onChange={(e) => {
								let { value } = e.target;
								console.log(value);
								dispatch({
									type: GET_USER_BY_PROJECT_ID_SAGA,
									idProject: value,
								});
								//cập nhập giá trị cho projectId
								setFieldValue("projectId", e.target.value);
								//đồng thời dispath giá trị thay đổi user
							}}
						>
							{projectUserAddTask?.map((project, index) => {
								return (
									<option key={index} value={project.id}>
										{project.projectName}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group">
						<p>Task Name</p>
						<input
							className="form-control"
							name="taskName"
							onBlur={handleBlur}
							onChange={handleChange}
						></input>
						<div className="text-danger">
							{errors.taskName && touched.taskName ? (
								<>{errors.taskName}</>
							) : null}
						</div>
					</div>
				
					
					{/* <div className="form-group">
					 <p>Status</p>
					 <select className='form-control' name='statusID' onChange={handleChange}>
						 {arrStatus?.slice(0,3).map((statusItem, index) =>
						 {
							 return <option key={index} value={statusItem.statusId}>{statusItem.statusName}</option>
								})}
					 </select>
					 
				 </div> */}
					<div className="form-group">
						<div className="row">
							<div className="col-6">
								<p>Priority</p>
								<select
									className="form-control"
									onChange={handleChange}
									name="priorityId"
								>
									{arrPriority?.map((priority, index) => {
										return (
											<option value={priority.id} key={index}>
												{priority.priority}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-6">
								<p>Task Type</p>
								<select
									className="form-control"
									name="typeId"
									onChange={handleChange}
								>
									{arrTaskType?.map((taskType, index) => {
										return (
											<option key={index} value={taskType.id}>
												{taskType.taskType}
											</option>
										);
									})}
								</select>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-6">
								<p>Assignees</p>
								<Select
									mode="multiple"
									size={size}
									onBlur={handleBlur}
									optionFilterProp="label"
									options={userOption}
									placeholder="Please select"
									// defaultValue={["a10", "c12"]}
									onChange={(values) => {
										//dispatch thay đổi dử liệu api
										//set lại giá trị cho list userAsign
										setFieldValue("listUserAsign", values);
									}}
									onSearch={(value) => {}}
									style={{ width: "100%" }}
									name="listUserAsign"
								>
									{children}
								</Select>

								<div className="row mt-3">
									<div className="col-12">
										<p>Original Estimate</p>
										<input
											onChange={handleChange}
											type="number"
											min="0"
											name="originalEstimate"
											defaultValue="0"
											className="form-control"
											height="30"
										></input>
									</div>
								</div>
							</div>
							<div className="col-6">
								<p>TIME TRACKING</p>
								<Slider
									value={timeTracking.timeTrackingSpent}
									max={
										Number(timeTracking.timeTrackingSpent) +
										Number(timeTracking.timeTrackingRemaining)
									}
									defaultValue={30}
								/>
								<div className="row">
									<div className="col-6 text-righ font-weight-bold">
										{timeTracking.timeTrackingSpent}h logged
									</div>
									<div className="col-6 text-left font-weight-bold	">
										{timeTracking.timeTrackingRemaining}h estimated{" "}
									</div>
								</div>
								<div className="row" style={{ marginTop: 5 }}>
									<div className="col-6">
										<p>Time spent (hours)</p>
										<input
											type="number"
											className="form-control"
											name="timeTrackingSpent"
											onChange={(e) => {
												setTimeTracking({
													...timeTracking,
													timeTrackingSpent: e.target.value,
												});
												setFieldValue("timeTrackingSpent", e.target.value);
											}}
										></input>
									</div>
									<div className="col-6">
										<p>Time remaining (hours)</p>
										<input
											type="number"
											className="form-control"
											name="timeTrackingRemaining"
											onChange={(e) => {
												setTimeTracking({
													...timeTracking,
													timeTrackingRemaining: e.target.value,
												});
												setFieldValue("timeTrackingRemaining", e.target.value);
											}}
										></input>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="form-group">
						<p>Description</p>
						<Editor
							name="description2"
							// onChange={handleChange}
							// onBlur={handleBlur}

							onInit={(evt, editor) => (editorRef.current = editor)}
							initialValue="Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software."
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
								setFieldValue("description", content);
							}}
						/>
					</div>
				</form>
			) : (
				<form onSubmit={handleSubmit}>You Don't have Project</form>
			)}
		</div>
	);
}
const FrmCreateTask = withFormik({
	enableReinitialize: true,
	mapPropsToValues: (props) => {
		const { arrPriority, arrStatus, arrTaskType, projectList } = props;

		return {
			listUserAsign: [],
			taskName: "",
			description: "",
			statusId: arrStatus[0]?.statusId,
			originalEstimate: 1,
			timeTrackingSpent: 0,
			timeTrackingRemaining: 0,
			projectId: projectList[0]?.id,
			typeId: arrTaskType[0]?.id,
			priorityId: arrPriority[0]?.id,
		};
	},
	validationSchema: Yup.object({
		taskName: Yup.string().required("Task Name project not required"),
	}),

	handleSubmit: (values, { props, setSubmitting }) => {
		//projectList?.length === 0 ? props.dispatch({}) :
		props.dispatch({ type: CREATE_TASK_SAGA, taskObject: values });
	},
})(FromCreateTask);

const mapStateToProps = (state) => ({
	// const { projectList } = useSelector((state) => state.projectManageReducer);
	// const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
	// const { arrPriority } = useSelector((state) => state.PriorityReducer);
	// const {arrStatus} = useSelector(state => state.StatusReducer)
	// const { userSearch } = useSelector((state) => state.userReducer);
	arrStatus: state.StatusReducer.arrStatus,
	arrTaskType: state.TaskTypeReducer.arrTaskType,
	arrPriority: state.PriorityReducer.arrPriority,
	projectList: state.ProjectIssuesReducer.projectList,
});
export default connect(mapStateToProps)(FrmCreateTask);
