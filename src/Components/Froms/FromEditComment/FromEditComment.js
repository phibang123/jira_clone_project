import * as Yup from "yup";

import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import { Input } from "antd";

export default function FromEditComment() {
	const { commentUser } = useSelector((state) => state.CommentReducer);
	//console.log(commentUser);
	useEffect(() => {}, []);

	return (
		<>
		<Input placeholder="Basic usage" />
		</>
	);
}
