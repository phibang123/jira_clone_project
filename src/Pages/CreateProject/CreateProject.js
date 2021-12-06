import * as Yup from "yup";

import { Button, Input, Select } from "antd";
import {
	CREATE_PROJECT_SAGA,
	GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../Redux/Constants/constants";
import React, { useRef } from "react";
import { setNestedObjectValues, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { Editor } from "@tinymce/tinymce-react";
import { useEffect } from "react";

const { Option } = Select;

export default function CreateProject() {
	const editorRef = useRef(null);

	const { arrProjectCategory } = useSelector(
		(state) => state.projectCategoryReducer
	);

	const dispatch = useDispatch();
	useEffect(() => {
		//Gọi api để lấy dử liệu từ thẻ select
		dispatch({
			type: GET_ALL_PROJECT_CATEGORY_SAGA,
		});
	}, []);

	// const log = (setFieldValue) => {
	// 	if (editorRef.current)
	// 	{
	// 		setFieldValue('description',editorRef.current.getContent())
	// 		console.log(editorRef.current.getContent());
	// 	}
	// };

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			//tên gằn liền name

			projectName: "",
			description: "",
			categoryId: arrProjectCategory[0]?.id,
		},
		validationSchema: Yup.object({
			projectName: Yup.string().required("Name project not required"),
			description: Yup.string().required("Description project not required"),
		}),
		onSubmit: (values) => {
			//const action = dangKyAsynAction(values);
			// dispatch(signin_action(values,props))
			//thành công => chuyển hướng trang
			dispatch({
				type: CREATE_PROJECT_SAGA,
				newProject: values,
			});
		},
	});

	const hadnleEditorChange = (content, editor) => {
		formik.setFieldValue("description", content);
	};
	return (
		<div className="main mb-5 container mt-5  d-flex justify-content-center">
			<div className="w-75">
				<h3>Create Project</h3>
				<form onSubmit={formik.handleSubmit}>
					<div className="form-group">
						<p>Name</p>

						<input
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							name="projectName"
							className="form-control"
							placeholder="Project Name"
						/>
					</div>
					<div className="text-danger">
						{formik.errors.projectName && formik.touched.projectName ? (
							<>{formik.errors.projectName}</>
						) : null}
					</div>
					<div className="form-group">
						<p>Description</p>
						<Editor
							apiKey="yxpqqmnqzrl7wgziqhdogk4zkczzwllqhbsnkx9msyqopftl"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							name="description"
							onInit={(evt, editor) => (editorRef.current = editor)}
							initialValue="Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software."
							init={{
								height: 300,
								selector: "textarea",
							
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
			
					<div className="form-group">
						<p>Project Category</p>
						<select
							placeholder="Select Project Category"
							className="form-control"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}

							style={{ width: "100%" }}
							name="categoryId"
						>
							{arrProjectCategory.map((item, index) => {
								return (
									<option key={index} value={item.id}>
										{item.projectCategoryName}
									</option>
								);
							})}
						</select>
					</div>

					<Button style={{ backgroundColor:"#87AAAA" ,border: "none", borderRadius: "5px" }}htmlType="submit" type="primary">
						Create Project
					</Button>
				</form>
			</div>
		</div>
	);
}
