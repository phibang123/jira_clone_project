import ProfileCss from "./Profile.module.css";
import React from "react";
import { useSelector } from "react-redux";

export default function ProfileUser(props) {
	const { userLogin } = useSelector((state) => state.userReducer);

	return (
		<>
			<div
				style={{ margin: 0, padding: 0, backgroundColor: "#000000",height: '90vh',borderRadius: '10px' }}
				className="container mt-4 mb-4 p-3 d-flex justify-content-center"
			>
				<div
					className="card p-4"
					style={{
						width: "350px",
						backgroundColor: " #efefef",
						border: "none",
						cursor: "pointer",
						transition: "all 0.5s",
					}}
				>
					<div className=" image d-flex flex-column justify-content-center align-items-center">
						{" "}
						<button className="btn btn-secondary rounded-circle">
							{" "}
							<img
								className={ProfileCss.img}
							 
								src={userLogin.avatar}
								height={100}
								width={100}
								alt='..'
							/>
						</button>{" "}
				
						<div className=" px-2 rounded mt-4 date ">
							{" "}
							<h2 className="text-center">{userLogin.name }</h2>
							<p className="text-center mb-0">Id: {userLogin.id }</p>
							<p className="text-center">Gmail: {userLogin.email }</p>
							<h5 className='text-left mt-5'>Phone: +(84){userLogin.phoneNumber }</h5>
							<h5 className='text-left mb-5'>passwrod: ****************</h5>
							<div className='text-center'><button class="btn1 btn-dark btn mt-5">Edit Profile</button></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
