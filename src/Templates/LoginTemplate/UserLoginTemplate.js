import React, { useEffect, useState } from "react";

import { Layout } from "antd";
import { Route } from "react-router";
import { USER_LOGIN } from "../../Utils/constants/settingSystem";

const { Header, Footer, Sider, Content } = Layout;
export default function UserLoginTemplate(props) {
	const [{ width, height }, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		window.onresize = () => {
			setSize({
				width: Math.round(window.innerWidth),
				height: Math.round(window.innerHeight),
			});
		};
		
	}, []);

	let { Component, ...resRoute } = props;
	return (
		<Route
			{...resRoute}
			render={(propsRoute) => {
				return (
					<>
						<Layout>
							<Sider
								width={Math.round(width / 2)}
								style={{
									height: height,
									backgroundImage: `url(https://picsum.photos/${Math.round(width)}/${Math.round(height)})`,
									backgroundSize: "100%",
								}}
							></Sider>
							<Content>
								<Component {...propsRoute}></Component>
							</Content>
						</Layout>
					</>
				);
			}}
		/>
	);
}
