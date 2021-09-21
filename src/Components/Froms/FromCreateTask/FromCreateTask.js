import { Radio, Select, Slider } from "antd";
import React, { useRef, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
	children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
export default function FromCreateTask() {
	const editorRef = useRef(null);
	const [size, setSize] = React.useState("default");

	const handleChange = (value) => {
		console.log(`Selected: ${value}`);
	};
	const handleSizeChange = (e) => {
		setSize(e.target.value);
	};
	const hadnleEditorChange = (content, editor) => {
		// formik.setFieldValue('description',content)
	};
	return (
		<div className="container">
			<div className="form-group">
				<p>Project</p>
				<select name="projectId" className="form-control">
					<option>Project A</option>
					<option>Project B</option>
				</select>
			</div>
			<div className="form-group">
				<div className="row">
					<div className="col-6">
						<p>Priority</p>
						<select className="form-control" name="priorityId">
							<option>High Low</option>
							<option>Bugs</option>
						</select>
					</div>
					<div className="col-6">
						<p>Task Type</p>
						<select className="form-control" name="typeId">
							<option>New Task</option>
							<option>Bugs</option>
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
							// options={}
							placeholder="Please select"
							defaultValue={["a10", "c12"]}
							onChange={handleChange}
							style={{ width: "100%" }}
						>
							{children}
						</Select>
					</div>
					<div className="col-6 card">
						<p>TIME TRACKING</p>
            <Slider defaultValue={30} tooltipVisible />
            <div className='row'>
              <div className='col-6'>
                <p>Time spent (hours)</p>
                <input type='number' className='form-control' name='timeTrackingSpent'></input>
              </div>
              <div className='col-6'>
                <p>Time remaining (hours)</p>
                <input type='number' className='form-control' name='timeTrackingRemaining'></input>
              </div>
            </div>
					</div>
				</div>
			</div>
			<div className="form-group">
				<p>Description</p>
				<Editor
					apiKey="fljctmgnb3bhnix02044qlbuxoyf1onlwfbirols7rgblf1z"
					// onChange={handleChange}
					// onBlur={handleBlur}
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
					onEditorChange={hadnleEditorChange}
				/>
			</div>
		</div>
	);
}
