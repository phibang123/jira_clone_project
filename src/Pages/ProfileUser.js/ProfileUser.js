import React from "react";
import { useSelector } from "react-redux";

export default function ProfileUser(props) {
	const { userLogin } = useSelector((state) => state.userReducer);
	return (
		<div className="container ">
			<h2 style={{ textAlign: "center" }}>User Profile Card</h2>

			<div
				style={{
					boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
					maxWidth: "450px",
					textAlign: "center",
					margin: "auto",
				}}
				className="card w-75"
			>
				<div >
					<img src={userLogin.avatar} alt="" style={{ width: "100%" }} />
				</div>
        <h1>{userLogin.name}</h1>
				<p className="title">CEO &amp; Founder, Example</p>
				<p>Harvard University</p>
				<div style={{ margin: "24px 0" }}>
					<a href="#">
						<i className="fa fa-dribbble" />
					</a>
					<a href="#">
						<i className="fa fa-twitter" />
					</a>
					<a href="#">
						<i className="fa fa-linkedin" />
					</a>
					<a href="#">
						<i className="fa fa-facebook" />
					</a>
				</div>
				<p>
					<button>Contact</button>
				</p>
			</div>
		</div>
	);
}
