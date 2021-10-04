import * as Yup from "yup";

import {
	CREATE_PROJECT_SAGA,
	GET_ALL_PROJECT_CATEGORY_SAGA,
	SET_SUBMIT_EDIT_PROJECT,
	UPDATE_PROJECT_SAGA,
} from "../../../Redux/Constants/constants";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useFormik, withFormik } from "formik";

import { Editor } from "@tinymce/tinymce-react";

function FromEditProject(props) {
	const {
		values,
		touched,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		setFieldValue,
	} = props;

	const editorRef = useRef(null);

	const dispatch = useDispatch();

	const { arrProjectCategory } = useSelector(
		(state) => state.projectCategoryReducer
	);

	useEffect(() => {
		//Gọi api để lấy dử liệu từ thẻ select
		dispatch({
			type: GET_ALL_PROJECT_CATEGORY_SAGA,
		});

		//đưa nút submit lên drawer nút submit
		dispatch({
			type: SET_SUBMIT_EDIT_PROJECT,
			submitFunction: handleSubmit,
		});
	}, []);

	const hadnleEditorChange = (content, editor) => {
		setFieldValue("description", content);
	};

	return (
		<form className="container-fuild">
			<div className="row">
				<div className="col-4">
					<div className="form-group">
						<p className="font-weight-bold">Project id</p>
						<input
							type="text"
							disabled
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.id}
							className="form-control"
							name="id"
						></input>
					</div>
				</div>

				<div className="col-4">
					<div className="form-group">
						<p className="font-weight-bold">Project Name</p>
						<input
							className="form-control"
							type="text"
							value={values.projectName}
							onChange={handleChange}
							name="projectName"
						/>
					</div>
				</div>
				<div className="col-4">
					<div className="form-group">
						<p className="font-weight-bold">Caterogy</p>
						<select
							placeholder="Select Project Category"
							className="form-control"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.categoryId}
							style={{ width: "100%" }}
							name="categoryId"
						>
							{arrProjectCategory?.map((item, index) => {
								return (
									<option key={index} value={item.id}>
										{item.projectCategoryName}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className="col-12">
					<div className="form-group">
						<p>Description</p>
						<Editor
							name="description"
							onInit={(evt, editor) => (editorRef.current = editor)}
							initialValue={values.description}
							init={{
								height: 300,
								selector: "textarea",
								document_base_url: "https://jiraclonebonlang.herokuapp.com/projectmanagement",
								plugins:
									"a11ychecker advcode casechange export formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker",
								toolbar:
									"a11ycheck addcomment showcomments casechange checklist code export formatpainter pageembed permanentpen table",
								toolbar_mode: "floating",
								tinycomments_mode: "embedded",
								tinycomments_author: "Author name",
							}}
							onEditorChange={hadnleEditorChange}
						/>
					</div>
				</div>
			</div>
		</form>
	);
}
const EditPrjectForm = withFormik({
	enableReinitialize: true,
	mapPropsToValues: (props) => {
		const { projectEdit } = props;

		return {
			id: projectEdit?.id,
			projectName: projectEdit?.projectName,
			description: projectEdit?.description,
			categoryId: projectEdit?.categoryId,
		};
	},
	validationSchema: Yup.object({
		projectName: Yup.string().required("Name project not required"),
	}),
	handleSubmit: (values, { props, setSubmitting }) => {
		//khi người dùng submit dưa dử liệu lên api
		// console.log('values',values)

		props.dispatch({
			type: UPDATE_PROJECT_SAGA,
			projectUpdate: values,
		});
	},
})(FromEditProject);

const mapStateToProps = (state) => ({
	projectEdit: state.projectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditPrjectForm);
