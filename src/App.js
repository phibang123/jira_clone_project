import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import CreateProject from "./Pages/CreateProject/CreateProject";
import DemoDragDrog from "./Pages/DemoDragDrog/DemoDragDrog";
import DemoDragDropDnd from "./Pages/DemoDragDropDnd/DemoDragDropDnd";
import DrawerComponent from "./HOC/Drawer/DrawerComponent";
import Index from "./Pages/ProjectDetail/Index";
import JiraTemplate from "./Templates/JiraTemplate/JiraTemplate";
import LoadingComponent from "./Components/GlobalSetting/LoadingComponent";
import Login from "./Pages/Login/Login";
import ModalComponent from "./HOC/Modal/ModalComponent";
import ProfileUser from "./Pages/ProfileUser.js/ProfileUser";
import ProjectManagement from "./Pages/ProjectManagement/ProjectManagement";
import SignUp from "./Pages/SignUp/SignUp";
import UserLoginTemplate from "./Templates/LoginTemplate/UserLoginTemplate";
import { useDispatch } from "react-redux";

function App() {
	return (
		<>
			<LoadingComponent />
			<ModalComponent></ModalComponent>
			<DrawerComponent></DrawerComponent>
			<Switch>
				<JiraTemplate exact path="/jira" Component={Index}></JiraTemplate>

				<JiraTemplate
					exact
					path="/createproject"
					Component={CreateProject}
				></JiraTemplate>
				<UserLoginTemplate
					exact
					path="/login"
					Component={Login}
				></UserLoginTemplate>
				<UserLoginTemplate
					exact
					path="/signup"
					Component={SignUp}
				></UserLoginTemplate>
				<JiraTemplate
					exact
					path="/projectmanagement"
					Component={ProjectManagement}
				></JiraTemplate>
				<JiraTemplate
					exact
					path="/projectdetail/:projectId"
					Component={Index}
				></JiraTemplate>

				<JiraTemplate
					exact
					path="/dragdrop"
					Component={DemoDragDrog}
				></JiraTemplate>

				<JiraTemplate
					exact
					path="/dragdropdnd"
					Component={DemoDragDropDnd}
				></JiraTemplate>
					<JiraTemplate
					exact
					path="/profile"
					Component={ProfileUser}
				></JiraTemplate>
				<JiraTemplate exact path="/" Component={Index}></JiraTemplate>
			</Switch>
		</>
	);
}

export default App;
