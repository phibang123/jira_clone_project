import "../../index.css";

import React, { useEffect, useState } from "react";

import ContentMain from '../../Components/Jira/Main/ContentMain'
import HeaderMain from "../../Components/Jira/Main/HeaderMain";
import InfoMain from "../../Components/Jira/Main/InfoMain";
import { Layout } from "antd";
import MenuJira from "../../Components/Jira/MenuJira";
import ModelInfo from "../../Components/Jira/Model/ModelInfo";
import ModelSearch from "../../Components/Jira/Model/ModelSearch";
import { Route } from "react-router";
import SideBarJira from "../../Components/Jira/SideBarJira";

export default function JiraTemplate(props) {
	let { Component, ...resRoute } = props;
	return (
		<Route
			{...resRoute}
			render={(propsRoute) => {
				return (
					<>
				
						<div className='jira'>
							<SideBarJira></SideBarJira>
							<MenuJira></MenuJira>
							<Component {...propsRoute}/>
							<ModelSearch></ModelSearch>
							<ModelInfo></ModelInfo>
				 </div>
					</>
				);
			}}
		/>
	);
}
