import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "antd";
import { NavLink } from "react-router-dom";

export default function MenuJira() {
	const { userLogin } = useSelector((state) => state.userReducer);

	return (
		<div className="menu" style={{position: 'fixed',left: '80px'}}>
			<div className="account">
				<div className="avatar">
					<NavLink to="/profile">
						<img src={userLogin?.avatar} alt=".." />
					</NavLink>
				</div>
				<div className="account-info">
					<p>{userLogin?.email}</p>
					<p>{userLogin?.name}</p>
				</div>
			</div>
		
			<div className="control">
				<div>
					<i className="fa fa-credit-card" />
					<NavLink
						className="text-dark"
						exact
						activeClassName=" font-weight-bold"
						to="/"
					>
						Cyber Board
					</NavLink>
				</div>
				<div>
					<i className="fa fa-cog" />
					<NavLink
						className="text-dark"
						exact
						activeClassName=" font-weight-bold"
						to="/createproject"
					>
						Index
					</NavLink>
				</div>
				<div>
					<i className="fas fa-tasks"></i>
					<NavLink
						className="text-dark"
						exact
						activeClassName="actice font-weight-bold"
						to="/projectmanagement"
					>
						Project Manage
					</NavLink>
				</div>
			</div>
			<div className="feature">
				<div>
					<i className="fa fa-truck" />
					<span>Releases</span>
				</div>
				<div>
					<i className="fa fa-equals" />
					<span>Issues and filters</span>
				</div>
				<div>
					<i className="fa fa-paste" />
					<span>Pages</span>
				</div>
				<div>
					<i className="fa fa-location-arrow" />
					<span>Reports</span>
				</div>
				<div>
					<i className="fa fa-box" />
					<span>Components</span>
				</div>
			</div>
		</div>
	);
}
