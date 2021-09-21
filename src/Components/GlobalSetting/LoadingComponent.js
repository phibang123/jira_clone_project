import Loading from "../../Assets/Img/Loading/loading-92.gif";
import React from 'react'
import styleLoading from "./LoadingComponent.module.css";
import { useSelector } from 'react-redux';

export default function LoadingComponent() {
    const { isLoading } = useSelector((state) => state.loadingReducer);

	if (isLoading) {
		return (
			<div className={styleLoading.bgLoading} >
				<img style={{ width: '100%' }} src={Loading} alt=".."></img>
				
			</div>
		);
    }
    else
    {
        return ''
	}
}
