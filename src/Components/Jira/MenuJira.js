import { NavLink } from "react-router-dom";
import React from "react";

export default function MenuJira() {
	return (
		<div className="menu">
			<div className="account">
				<div className="avatar">
					<img src="https://picsum.photos/50/50" alt='..' />
				</div>
				<div className="account-info">
					<p>CyberLearn.vn</p>
					<p>Report bugs</p>
				</div>
			</div>
			<div className="control">
				<div>
					<i className="fa fa-credit-card" />
					<NavLink
						className="text-dark"
						exact
						activeClassName="actice font-weight-bold"
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
						activeClassName="actice font-weight-bold"
						to="/createproject"
					>
						Create Project
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
