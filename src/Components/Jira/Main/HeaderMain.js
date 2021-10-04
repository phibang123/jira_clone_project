import { NavLink } from "react-router-dom";
import React from "react";

export default function HeaderMain(props)
{
  const {projectName} = props.projectDetail
	return (
		<div className="header">
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb" style={{ backgroundColor: "white" }}>
					<li className="breadcrumb-item">Project</li>
					<li className="breadcrumb-item"><NavLink to='/projectmanagement' style={{color: 'black'}}>Project Management</NavLink></li>
					<li className="breadcrumb-item active" aria-current="page">
						{projectName}
					</li>
				</ol>
			</nav>
		</div>
	);
}
