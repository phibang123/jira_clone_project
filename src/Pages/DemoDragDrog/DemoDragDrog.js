import "./DemoDraDrop.css";

import React, { useRef, useState } from "react";
import { animated, useSpring } from 'react-spring'

const defaultValue = [
	{ id: 1, taskName: "mot" },
	{ id: 2, taskName: "hai " },
	{ id: 3, taskName: "ba" },
	{ id: 4, taskName: "bon " },
	{ id: 5, taskName: "nam" },
];
export default function DemoDragDrog(props) {
	const [taskList, setTaskList] = useState(defaultValue);

	const tagDrag = useRef([]);
	const tagDragEnter = useRef({});

	const [propsSpring, set, stop] = useSpring(() => ({
		from: { bottom: -25 },
    to: { bottom: 0 },
    config: { duration: 350 },
  
	}));

	const handleDragStart = (e, task, index) => {
	
		tagDrag.current = task;
	};
	const handleDragEnter = (e, taskDragEnter, index) => {
		//lưu giữ lại giá trị của task được kéo ngang qua

    set({bottom:0,reset:true})

		tagDragEnter.current = {...taskDragEnter};

		let taskListUpdate = [...taskList];

		//lấy ra index thằng đang kéo
		let indexDagTag = taskListUpdate.findIndex(
			(task) => task.id === tagDrag.current.id
		);
		//lấy index thằng bị kéo qua
		let indexDagEnter = taskListUpdate.findIndex(
			(task) => task.id === taskDragEnter.id
		);

		//biến chứa giá trị gdang9 kéo
		let temp = taskListUpdate[indexDagTag]; //tình huống mày hay gặp khi biến ở dưới đã gán giá trị cái mới mà qua cái sao mày muốn giá trị củ thì
		//ở trên đầu làm 1 biến sao chén nó qua thôi
		//lấy giá trị tại vị trí đang kéo gán = thằng kéo qua
		taskListUpdate[indexDagTag] = taskListUpdate[indexDagEnter];
		//lấy thằng kéo qua gán  = đang kéo
		taskListUpdate[indexDagEnter] = temp;

		setTaskList(taskListUpdate);
	};
	const handleDragOver = (e) => {
		console.log("drop", e.target);
	};
	const handleDragEnd = (e) => {
		tagDrag.current = {};
		setTaskList([...taskList]);
	};
	return (
    <div className="container" onDragOver={(e) =>
    {
      e.stopPropagation()
      e.preventDefault()
    }}
      onDrop={(e) =>
      {
        tagDrag.current = {}
        console.log('dragEnd')
        setTaskList([...taskList])
    }}>
			<div className="text-center display-4" >
				Task List
			</div>
			<div className="row">
				<div className="col-2"></div>
				<div className="bg-dark p-5 col-8">
					{taskList.map((task, index) => {
						let cssDragTag = task.id === tagDrag.current.id ? `dragTag` : "";

						if (task.id === tagDragEnter.current.id) {
							return (
                <animated.div
                  style={{
                    position: 'relative',
                    bottom: propsSpring.bottom.interpolate(numBottom => `${ numBottom }px`),
     
                  }}
									onDragEnd={(e) => {
										handleDragEnd(e);
									}}
									onDragEnter={(e) => {
										handleDragEnter(e, task, index);
									}}
									onDragStart={(e) => {
										handleDragStart(e, task, index);
									}}
									draggable="true"
									className={`bg-success text-white m-2 p-3`}
									key={index}
								>{task.taskName}</animated.div>
							);
            }
            else
						return (
              <div
              style={{
               
                bottom: propsSpring.bottom.interpolate(numBottom => `${numBottom}px` )
              }}
								onDragEnd={(e) => {
									handleDragEnd(e);
								}}
								onDragEnter={(e) => {
									handleDragEnter(e, task, index);
								}}
								onDragStart={(e) => {
									handleDragStart(e, task, index);
								}}
								draggable="true"
								className={`bg-success text-white m-2 p-3 ${cssDragTag}`}
								key={index}
							>
								{task.taskName}
							</div>
						);
					})}
				</div>
				<div className="col-2 bg-success"></div>
			</div>
		</div>
	);
}
