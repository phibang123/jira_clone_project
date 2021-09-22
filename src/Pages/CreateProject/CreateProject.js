import * as Yup from "yup";

import { Button, Input, Select } from "antd";
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../Redux/Constants/constants";
import React, { useRef } from "react";
import { setNestedObjectValues, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { Editor } from "@tinymce/tinymce-react";
import { useEffect } from "react";

const { Option } = Select;

export default function CreateProject() {
	const editorRef = useRef(null);

	const { arrProjectCategory } = useSelector((state) => state.projectCategoryReducer);

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
			categoryId:  arrProjectCategory[0]?.id,
		},
		validationSchema: Yup.object({
			projectName: Yup.string().required("Name project not required"),
		}),
		onSubmit: (values) => {
			//const action = dangKyAsynAction(values);
			// dispatch(signin_action(values,props))
			//thành công => chuyển hướng trang
			dispatch({
				type: CREATE_PROJECT_SAGA,
				newProject: values
			})
		},
	});

	const hadnleEditorChange = (content, editor) =>
	{
	  formik.setFieldValue('description',content)
  }
	return (
		<div className="main container  d-flex justify-content-center">
			<div className="w-75">
			<h3>Create Project</h3>
				<form onSubmit={formik.handleSubmit}>
				<div className="form-group">
						<p>Name</p>

						<input
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							name="projectName"
							className='form-control'
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
							apiKey="fljctmgnb3bhnix02044qlbuxoyf1onlwfbirols7rgblf1z"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							name="description"
							onInit={(evt, editor) => (editorRef.current = editor)}
							initialValue="Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software."
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
							onEditorChange={hadnleEditorChange	}
						/>
					</div>
					<div className="text-danger">
						{formik.errors.description && formik.touched.description ? (
							<>{formik.errors.description}</>
						) : null}
					</div>
					<div className="form-group">
						<p>Project Category</p>
						<select
				      placeholder = "Select Project Category"
					    className='form-control'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
				      value= ''
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
				
					<Button htmlType="submit"  type="primary">
						Save Changes
					</Button>
				</form>
			</div>
		</div>
	);
}