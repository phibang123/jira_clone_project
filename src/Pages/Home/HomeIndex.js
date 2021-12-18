import React, { memo, useState } from "react";
import { a, useTrail } from "@react-spring/web";

import { NavLink } from "react-router-dom";
import StyleHome from "./StyleHome.module.css";

//const Trail: React.FC<{ open: boolean }> = ({ open, children }) => {
const Trail = ({ open, children }) => {
	const items = React.Children.toArray(children);
	const trail = useTrail(items.length, {
		config: { mass: 5, tension: 2000, friction: 200 },
		opacity: open ? 1 : 0,
		x: open ? 0 : 1000,
		height: open ? 110 : 0,
		from: { opacity: 0, x: 50, height: 0 },
	});
	return (
		<div>
			{trail.map(({ height, ...style }, index) => (
				<a.div key={index} className={StyleHome.trailsText} style={style}>
					<a.div style={{ height }}>{items[index]}</a.div>
				</a.div>
			))}
		</div>
	);
};
 function HomeIndex() {
	const [open, set] = useState(true);
	return (
		<div  className={StyleHome.masthead}>
			<div className="container px-4 px-lg-5 text-center">
				<Trail open={open}>
					<h1 className="mb-1">Stylish Portfolio</h1>
					<h3 className="mb-5">
						<em>A Free Bootstrap Theme by Start Bootstrap</em>
					</h3>
				</Trail>
				<div
					className={StyleHome.container}
					onClick={() => set((state) => !state)}
				>
					<Trail open={open}>
						<span>Lorem</span>
						<span>Ipsum</span>
						<span>Dolor</span>
						<span>Sit</span>
					</Trail>
				</div>
        <NavLink
          style={{marginTop: '2rem'}}
					to="/projectmanagement"
					className="btn btn-dark   btn-xl"
					href="#about"
				>
					Find Out More
				</NavLink>
			</div>
		</div>
	);
}
export default memo(HomeIndex)