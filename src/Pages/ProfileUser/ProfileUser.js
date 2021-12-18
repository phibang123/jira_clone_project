import * as Yup from "yup";

import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EDIT_USER_API_SAGA } from "../../Redux/Constants/constants";
import { Formik } from "formik";
import ProfileCss from "./Profile.module.css";
import { useState } from "react";

function ProfileUser(props) {
	const { userLogin } = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	//console.log(userLogin)

	const [edit, setEdit] = useState(false);

	return (
		<>
			<div
				style={{
					margin: 0,
					padding: 0,
					backgroundColor: "#343a40",
					height: "93vh",
					borderRadius: "10px",
				}}
				className="container mt-4 mb-4 p-3 d-flex justify-content-center"
			>
				<div
					className={ProfileCss.card}
					style={{
						width: "350px",

						border: "none",
						cursor: "pointer",
						transition: "all 0.5s",
					}}
				>
					<div className=" image d-flex flex-column justify-content-center align-items-center">
						{!edit ? (
							<button className="btn btn-secondary rounded-circle">
								<img
									className={ProfileCss.img}
									src={userLogin.avatar}
									height={100}
									width={100}
									alt=".."
								/>
							</button>
						) : (
							<h3>Edit Profile</h3>
						)}
						<div className=" px-2 rounded mt-4 date ">
							{!edit ? (
								<>
									<h2 className="text-center">{userLogin.name}</h2>
									<p className="text-center mb-0">Id: {userLogin.id}</p>
									<p className="text-center">Gmail: {userLogin.email}</p>
									<h5 className="text-left mt-5">
										Phone: +(84).{userLogin.phoneNumber}
									</h5>
									<h5 className="text-left mb-5">passwrod: ****************</h5>
									<div className="text-center">
										<button
											className="btn1 btn-dark btn mt-5"
											onClick={() => {
												setEdit(true);
											}}
										>
											Edit Profile
										</button>
									</div>
								</>
							) : (
								<Formik
									initialValues={{
										email: userLogin.email,
										password: "",
										name: userLogin.name,
										phoneNumber: userLogin.phoneNumber,
									}}
									validationSchema={Yup.object({
										password: Yup.string()
											.required("password is required")
											.min(6, "Paswword must than 6 letter"),
										email: Yup.string()
											.email("Invalid email address")
											.required("Required"),
										passwordConfirmation: Yup.string().oneOf(
											[Yup.ref("password"), null],
											"Passwords must match"
										),
										name: Yup.string().required("Name not require"),
										phoneNumber: Yup.string().min(
											6,
											"Phone must than 6 number"
										),
									})}
									onSubmit={(values, { setSubmitting }) => {
										setTimeout(() => {
											dispatch({
												type: EDIT_USER_API_SAGA,
												editUser: {
													id: userLogin.id,
													password: values.password,
													email: values.email,
													name: values.name,
													phoneNumber: values.phoneNumber,
												},
											});

											setSubmitting(false);
										}, 400);
									}}
								>
									{({
										values,
										errors,
										touched,
										handleChange,
										handleBlur,
										handleReset,
										handleSubmit,
										isSubmitting,
										/* and other goodies */
									}) => (
										<form onSubmit={handleSubmit}>
											<div className="form-group">
												<p>Name User</p>
												<input
													className="form-control"
													type="name"
													name="name"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.name}
												/>
												<div className="text-danger">
													{errors.name && touched.name ? (
														<>{errors.name}</>
													) : null}
												</div>
											</div>
											<div className="form-group">
												<p>Email</p>
												<input
													className="form-control"
													type="email"
													name="email"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.email}
												/>
												<div className="text-danger">
													{errors.email && touched.email ? (
														<>{errors.email}</>
													) : null}
												</div>
											</div>

											<div className="form-group">
												<p>Phone</p>
												<input
													className="form-control"
													name="phoneNumber"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.phoneNumber}
												/>
												<div className="text-danger">
													{errors.phoneNumber && touched.phoneNumber ? (
														<>{errors.phoneNumber}</>
													) : null}
												</div>
											</div>

											<div className="form-group">
												<p>password</p>
												<input
													type="password"
													className="form-control"
													name="password"
													placeholder="password"
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<div className="text-danger">
													{errors.password && touched.password ? (
														<>{errors.password}</>
													) : null}
												</div>
											</div>

											<div className="form-group">
												<p>password Confirm</p>
												<input
													type="password"
													placeholder="password Confirm"
													className="form-control"
													name="passwordConfirmation"
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												<div className="text-danger">
													{errors.passwordConfirmation &&
													touched.passwordConfirmation ? (
														<>{errors.passwordConfirmation}</>
													) : null}
												</div>
											</div>
											<div className="text-center">
												{" "}
												<button
													type="submit"
													disabled={isSubmitting}
													onClick={() => {
														setTimeout(() => {
															setEdit(false);
														}, 600);
													}}
													className="btn btn-dark text-center"
												>
													Submit
												</button>
											</div>
										</form>
									)}
								</Formik>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


export default memo(ProfileUser)