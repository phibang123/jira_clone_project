import React, { memo, useEffect } from "react";

import { AntDesignOutlined } from "@ant-design/icons";
import angular from "../../../Assets/Img/icons/angularjs.png";
import bangbang from "../../../Assets/Img/Avatar/bangbang.jpg";
import bootstrap from "../../../Assets/Img/icons/bootstrap.png";
import cyber from "../../../Assets/Img/icons/cyber.png";
import facebook from "../../../Assets/Img/icons/facebook.png";
import githud from "../../../Assets/Img/icons/github.png";
import gmail from "../../../Assets/Img/icons/gmail.png";
import graphql from "../../../Assets/Img/icons/graphql.png";
import javascript from "../../../Assets/Img/icons/javascript.png";
import next from "../../../Assets/Img/icons/nextjs.png";
import nodejs from "../../../Assets/Img/icons/nodejs.png";
import reactjs from "../../../Assets/Img/icons/react.png";
import tailwind from "../../../Assets/Img/icons/tailwind.png";
import typescript from "../../../Assets/Img/icons/typescript.png";
import udemi from "../../../Assets/Img/icons/udemy.png";
import { useDispatch } from "react-redux";
import youtube from "../../../Assets/Img/icons/youtube.png";

function FromAboutJira()
{
	const dispatch = useDispatch()
  useEffect(() => {
		dispatch({
			type: "SET_NONE",		
		});
	}, []);
	return (
		<div className="row py-5" style={{ backgroundColor: "#e2e8f0" }}>
			<div className="col-6 ">
				<div
					className="text-center col-12  rounded  list-group-item"
					style={{ border: "0 solid rgba(0,0,0,.125)" }}
				>
					<img
						src={bangbang}
						alt="..."
						className="w-25 h-25 rounded-circle mb-2"
					></img>
					<h4>Trần Vũ Phi Bằng</h4>
					<p className="text-secondary mb-1">Full Stack Developer</p>
					<p className="text-muted font-size-sm">
						Sinh viên Hutech(Đại học công nghệ th.HCM)
					</p>
				</div>
			</div>
			<div className="col-6 rounded">
				<ul className="list-group list-group-flush  bg-light rounded my-1 ">
					<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap rounded">
						<h6 className="mb-0 ">studying</h6>
						<span className=" " style={{ fontSize: "21px" }}>
							<img
								className="mx-2"
								alt=""
								src={nodejs}
								style={{ maxHeight: "35px", maxWidth: "35px" }}
							></img>
							<img
								className="mx-2"
								alt=""
								src={reactjs}
								style={{ maxHeight: "35px", maxWidth: "35px" }}
							></img>
						</span>
					</li>
				</ul>

				<ul className="list-group list-group-flush  bg-light rounded my-3  ">
					<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap rounded">
						<h6 className="mb-0 ">going to study</h6>
						<span className=" " style={{ fontSize: "21px" }}>
							<img
								className="mx-2"
								alt=""
								src={graphql}
								style={{ maxHeight: "35px", maxWidth: "35px" }}
							></img>
							<img
								className="mx-2"
								alt=""
								src={typescript}
								style={{ maxHeight: "35px", maxWidth: "35px" }}
							></img>
							<img
								className="mx-2"
								alt="angular"
								src={angular}
								style={{ maxHeight: "35px", maxWidth: "35px" }}
							></img>	<img
								className="mx-2"
								alt="next"
								src={next}
								style={{ maxHeight: "35px", maxWidth: "35px" }}
							></img>
						</span>
					</li>
				</ul>
				<ul className="list-group list-group-flush  bg-light rounded my-2  ">
					<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap rounded">
						<h6 className="mb-0 ">skill</h6>
						<span className=" " style={{ fontSize: "21px" }}>
							<img
								alt="javascript"
								src={javascript}
								style={{ maxHeight: "40px", maxWidth: "40px" }}
							></img>
							<img
								className="mx-2"
								alt="bootstrap"
								src={bootstrap}
								style={{ maxHeight: "40px", maxWidth: "40px" }}
              ></img>
              <img
				
								alt="githud"
								src={githud}
								style={{ maxHeight: "40px", maxWidth: "40px" }}
							></img> <img
				
								alt="tailwind"
								src={tailwind}
								style={{ maxHeight: "40px", maxWidth: "40px" }}
							></img>
						</span>
					</li>
				</ul>
      </div>
      <div className="col-12">
      <div
					className="text-center  mt-2 rounded  list-group-item"
        >
          
          
				<ul className="list-group  rounded  ">
					<li className=" d-flex justify-content-between align-items-center">
						<h6 className="mb-0 ">Where I'm study</h6>
						<span className=" " style={{ fontSize: "21px" }}>
            <img
								className="mx-2"
								alt="youtube"
								src={youtube}
								style={{ maxHeight: "40px", maxWidth: "40px" }}
                ></img>
                <img
								className="mx-2"
								alt="udemi"
								src={udemi}
								style={{ maxHeight: "40px", maxWidth: "40px" }}
							></img> <img
								className="mx-2"
								alt="cyber"
								src={cyber}
								style={{ maxHeight: "50px", maxWidth: "100px" }}
							></img>
						</span>
					</li>
				</ul>
          </div>
      </div>
      <div className="col-12">
      <div
					className="text-center  mt-2 rounded  list-group-item"
        >
          
          
				<ul className="list-group  rounded  ">
					<li className=" d-flex justify-content-between py-2 align-items-center">
						<h6 className="mb-0 ">About</h6>
						<span className=" " style={{ fontSize: "15px" }}>
            This simplified Jira clone is built with React on the front-end and Node on the back-end .
						</span>
					</li>
				</ul>
          </div>
      </div>
      <div className="col-12">
      <div
					className="text-center  mt-2 rounded  list-group-item"
        >
          
          
				<ul className="list-group  rounded  ">
					<li className=" d-flex justify-content-between py-2 align-items-center">
						<h6 className="mb-0 ">FaceBook</h6>
						<span className=" " style={{ fontSize: "21px" }}>
             <a href='https://www.facebook.com/profile.php?id=100014977260425' alt='fabook'> https://www.facebook.com/profile.php?id=100014977260425</a>
              
						</span>
					</li>
				</ul>
          </div>
      </div>
      <div className="col-12">
      <div
					className="text-center  mt-2 rounded  list-group-item"
        >
          
          
				<ul className="list-group  rounded  ">
					<li className=" d-flex justify-content-between py-2 align-items-center">
						<h6 className="mb-0 ">Git hub</h6>
            <span className=" " style={{ fontSize: "21px" }}>
             <a href='https://github.com/phibang123' alt='fabook'> https://github.com/phibang123</a>
              
						</span>
					</li>
				</ul>
          </div>
      </div>
      <div className="col-12">
      <div
					className="text-center  mt-2 rounded  list-group-item"
        >
          
          
				<ul className="list-group  rounded  ">
					<li className=" d-flex justify-content-between py-2 align-items-center">
						<h6 className="mb-0 ">Gmail</h6>
						<span className=" " style={{ fontSize: "21px" }}>
             phibang7899@gmail.com
						</span>
					</li>
				</ul>
          </div>
      </div>
		</div>
	);
}
export default memo(FromAboutJira)