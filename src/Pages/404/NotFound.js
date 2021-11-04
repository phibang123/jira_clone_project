import   '../../Pages/404/NotFound.css'

import { NavLink } from 'react-router-dom';
import React from 'react'

export default function NotFound() {
  return (
		<div className="main-wrapper">
			<div className="preloader">
				<div className="lds-ripple">
					<div className="lds-pos"></div>
					<div className="lds-pos"></div>
				</div>
			</div>

			<div className="error-box">
				<div className="error-body text-center">
					<h1 className="error-title ">404</h1>
					<h3 className="text-uppercase error-subtitle">PAGE NOT FOUND !</h3>
					<p className="text-muted mt-4 mb-4">
						YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
					</p>
					<NavLink to='/'
						href="dashboard.html"
						className="btn btn-warning btn-rounded waves-effect waves-light mb-5 text-white"
					>
						Back to home
					</NavLink>
				</div>
			</div>
		</div>
	);
}
