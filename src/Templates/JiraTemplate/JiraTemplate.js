import "../../index.css";

import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { TOKEN_USER, USER_LOGIN } from "../../Utils/constants/settingSystem";

import ContentMain from '../../Components/Jira/Main/ContentMain'
import { EyeInvisibleOutlined } from '@ant-design/icons';
import HeaderMain from "../../Components/Jira/Main/HeaderMain";
import InfoMain from "../../Components/Jira/Main/InfoMain";
import { Layout } from "antd";
import MenuJira from "../../Components/Jira/MenuJira";
import ModelInfo from "../../Components/Jira/Model/ModelInfo";
import ModelSearch from "../../Components/Jira/Model/ModelSearch";
import { POST_AUTHOR } from "../../Redux/Constants/constants";
import SideBarJira from "../../Components/Jira/SideBarJira";
import {history} from '../../Utils/history'
import { openNotification } from "../../Utils/Notification/NotificationBox";
import { useDispatch } from "react-redux";

export default function JiraTemplate(props)
{
	const dispatch = useDispatch()

	if (!localStorage.getItem(TOKEN_USER))
	{
		openNotification(<EyeInvisibleOutlined twoToneColor="#eb2f96"/>,'Fages Status','You need Log in')

		return <Redirect to='/login'></Redirect>
	}
	let { Component, ...resRoute } = props;
	
	return (
		<Route
			{...resRoute}
			render={(propsRoute) => {
				return (
					<>
				
						<div className='jira' style={{width: '100%',position: 'relative'}}>
							<SideBarJira></SideBarJira>
							<MenuJira></MenuJira>
							<div style={{padding: '0px 32px 10px 420px',width: '100%',backgroundColor: '#fffff'}}> <Component  {...propsRoute}/></div>
							
							{/* <ModelSearch></ModelSearch> */}
							<ModelInfo></ModelInfo>
				 </div>
					</>
				);
			}}
		/>
	);
}
