import "../../index.css";

import React, { useEffect, useState } from "react";
import { TOKEN_USER, USER_LOGIN } from "../../Utils/constants/settingSystem";

import ContentMain from '../../Components/Jira/Main/ContentMain'
import HeaderMain from "../../Components/Jira/Main/HeaderMain";
import InfoMain from "../../Components/Jira/Main/InfoMain";
import { Layout } from "antd";
import MenuJira from "../../Components/Jira/MenuJira";
import ModelInfo from "../../Components/Jira/Model/ModelInfo";
import ModelSearch from "../../Components/Jira/Model/ModelSearch";
import { POST_AUTHOR } from "../../Redux/Constants/constants";
import { Route } from "react-router";
import SideBarJira from "../../Components/Jira/SideBarJira";
import {history} from '../../Utils/history'
import { useDispatch } from "react-redux";

export default function JiraTemplate(props) {
	let { Component, ...resRoute } = props;
	const dispatch = useDispatch()
	useEffect(() => {
		let usLogin = JSON.parse(localStorage.getItem(USER_LOGIN,TOKEN_USER));
		
		if (!usLogin)
		{
			history.push("/login");
			localStorage.removeItem(TOKEN_USER);
	   	localStorage.removeItem(USER_LOGIN);
		}
		
	}, [])
	return (
		<Route
			{...resRoute}
			render={(propsRoute) => {
				return (
					<>
				
						<div className='jira' style={{width: '100%',position: 'relative'}}>
							<SideBarJira></SideBarJira>
							<MenuJira></MenuJira>
							<div style={{padding: '0px 32px 10px 420px',width: '100%'}}> <Component  {...propsRoute}/></div>
							
							<ModelSearch></ModelSearch>
							<ModelInfo></ModelInfo>
				 </div>
					</>
				);
			}}
		/>
	);
}
