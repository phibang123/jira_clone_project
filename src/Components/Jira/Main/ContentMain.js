import { ArrowDownOutlined, ArrowUpOutlined, BugOutlined, FileTextOutlined, MinusOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';

import { GET_TASK_DETAIL_SAGA } from '../../../Redux/Constants/constants';
import React from "react";
import { useDispatch } from 'react-redux';

export default function ContentMain(props) {
	const { projectDetail } = props;
  const dispatch = useDispatch()

	const renderCardTaskList = () => {
		return projectDetail.lstTask?.map((taskListDetail, index) => {
			return (
				<div  key={index} className="card" style={{ width: "17rem", minHeight: "25rem" ,height: 'auto'}}>
					<div className="card-header">{taskListDetail.statusName}</div>
					<ul className="list-group list-group-flush">
						{taskListDetail.lstTaskDeTail.map((task, index) => {
							return (
								<li
								onClick={() =>
									{
										dispatch({
											type: GET_TASK_DETAIL_SAGA,
											taskId: task.taskId
										})
									}}
                  style={{height: 'auto',padding: '2px',    overflowAnchor: 'none'}}
                  key={index}
									className="list-group-item"
									data-toggle="modal"
									data-target="#infoModal"
									style={{ cursor: "pointer" }}
								>
                  <p className='font-wieght-bold'>{task.taskName}</p>
									<div className="block" style={{ display: "flex" }}>
                    <div className="block-left d-flex">   
											<p>{task.priorityTask.priority === 'High' ? <ArrowUpOutlined style={{color: 'red',fontSize:'16px' ,margin: '3px'}}/> : task.priorityTask.priority === 'Medium' ? <MinusOutlined /> :  task.priorityTask.priority === 'Low' ? <ArrowDownOutlined style={{color: 'yellow',fontSize:'16px',margin: '3px'}} /> : task.priorityTask.priority === 'Lowest' ?  <VerticalAlignBottomOutlined style={{color: 'green',fontSize:'16px',margin: '3px'}} /> : ''}</p>
											<p>{task.taskTypeDetail.taskType === 'bug' ? <BugOutlined  style={{color: 'blue',fontSize:'16px',margin: '3px'}}/> :  <FileTextOutlined style={{color: '#146870',fontSize:'16px',margin: '3px'}}/>}</p>
											{/* <i className="fa fa-bookmark" />
											<i className="fa fa-arrow-up" /> */}
										</div>
										<div className="block-right">
											<div className="avatar-group" style={{ display: "flex" }}>
                        {task.assigness?.map((mem, index) =>
                        {
                          return <div key={index} className="avatar">
													<img src={mem.avatar} alt={mem.avatar} />
												</div>
												
                        })}
											</div>
										</div>
									</div>
								</li>
							);
						})}

						<li className="list-group-item">Vestibulum at eros</li>
					</ul>
				</div>
			);
		});
	};
	return (
		<div className="content" style={{ display: "flex" }}>
			{renderCardTaskList()}
		</div>
	);
}

	
