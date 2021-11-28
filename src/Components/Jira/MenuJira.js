import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BarChartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

export default function MenuJira() {
	const { userLogin } = useSelector((state) => state.userReducer);

	return (
		<div
			className="menu"
			style={{ position: "fixed", left: "80px", fontSize: "15px" }}
		>
			
			<div className="account">

				<div className="avatar">
					<NavLink to="/profile">
						<img src={userLogin?.avatar} alt=".." />
					</NavLink>
				</div>
				<div className="account-info w-100">
					<div className="ml-2">
					<p>{userLogin?.email}</p>
					<div className="d-flex justify-content-between  align-items-center">
						<span>{userLogin?.name}</span>
					</div>
					</div>
				</div>
			</div>

			<div className="control">
				<div>
					<i className="fa fa-credit-card" />
					<NavLink
						className="text-dark ml-2"
						exact
						activeClassName=" font-weight-bold"
						to="/"
					>
						Index
					</NavLink>
				</div>

				<div>
					<i className="fa fa-user-cog"></i>
					<NavLink
						className="text-dark ml-2"
						exact
						activeClassName=" font-weight-bold"
						to="/profile"
					>
						View Profile
					</NavLink>
				</div>

				<div>
					<i className="fa fa-cog" />
					<NavLink
						className="text-dark  ml-2"
						exact
						activeClassName=" font-weight-bold"
						to="/createproject"
					>
						Create Project
					</NavLink>
				</div>	<div>
					<i className="fa fa-server"></i>
					<NavLink
						className="text-dark  ml-2"
						exact
						activeClassName="actice font-weight-bold"
						to="/projectmyissues"
					>
						Project My Issues
					</NavLink>
				</div>
				<div>
					<i className="fas fa-tasks"></i>
					<NavLink
						className="text-dark  ml-2"
						exact
						activeClassName="actice font-weight-bold"
						to="/projectmanagement"
					>
						Project Manage
					</NavLink>
				</div>
			
			</div>
			<div className="feature">
				<div style={{ cursor: "not-allowed" }}>
					<i className="fa fa-truck" />
					<span className="ml-2">Releases</span>
				</div>
				<div style={{ cursor: "not-allowed" }}>
					<i className="fa fa-equals" />
					<span className="ml-2">Issues and filters</span>
				</div>
				<div style={{ cursor: "not-allowed" }}>
					<i className="fa fa-paste" />
					<span className="ml-2">Pages</span>
				</div>
				<div style={{ cursor: "not-allowed" }}>
					<i className="fa fa-location-arrow" />
					<span className="ml-2">Reports</span>
				</div>
				<div style={{ cursor: "not-allowed" }}>
					<i className="fa fa-box" />
					<span className="ml-2">Components</span>
				</div>
			</div>
		</div>
	);
}
