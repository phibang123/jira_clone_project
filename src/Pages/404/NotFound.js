import   '../../Pages/404/NotFound.css'

import { NavLink } from 'react-router-dom';
import React from 'react'

export default function NotFound() {
  return (
		<div class="main-wrapper">
			<div class="preloader">
				<div class="lds-ripple">
					<div class="lds-pos"></div>
					<div class="lds-pos"></div>
				</div>
			</div>

			<div class="error-box">
				<div class="error-body text-center">
					<h1 class="error-title ">404</h1>
					<h3 class="text-uppercase error-subtitle">PAGE NOT FOUND !</h3>
					<p class="text-muted mt-4 mb-4">
						YOU SEEM TO BE TRYING TO FIND HIS WAY HOME
					</p>
					<NavLink to='/'
						href="dashboard.html"
						class="btn btn-warning btn-rounded waves-effect waves-light mb-5 text-white"
					>
						Back to home
					</NavLink>
				</div>
			</div>
		</div>
	);
}
