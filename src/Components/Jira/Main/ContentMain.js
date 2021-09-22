import React from "react";

export default function ContentMain(props) {
	const { projectDetail } = props;
 
  console.log('task',projectDetail.lstTask)
	const renderCardTaskList = () => {
		return projectDetail.lstTask?.map((taskListDetail, index) => {
			return (
				<div key={index} className="card" style={{ width: "17rem", minHeight: "25rem" ,height: 'auto'}}>
					<div className="card-header">{taskListDetail.statusName}</div>
					<ul className="list-group list-group-flush">
						{taskListDetail.lstTaskDeTail.map((task, index) => {
							return (
                <li
                  style={{height: 'auto',padding: '2px',    overflowAnchor: 'none'}}
                  key={index}
									className="list-group-item"
									data-toggle="modal"
									data-target="#infoModal"
									style={{ cursor: "pointer" }}
								>
                  <p className='font-wieght-bold'>{task.taskName}</p>
									<div className="block" style={{ display: "flex" }}>
                    <div className="block-left">
                    <p>{task.priorityTask.priority}</p>
                    
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
{
	/* <li className="list-group-item">
          <p>
            Each issue has a single reporter but can have multiple assignees
          </p>
          <div className="block" style={{ display: "flex" }}>
            <div className="block-left">
              <i className="fa fa-check-square" />
              <i className="fa fa-arrow-up" />
            </div>
            <div className="block-right">
              <div className="avatar-group" style={{ display: "flex" }}>
                <div className="avatar">
                  <img src="https://picsum.photos/50/50" alt="" />
                </div>
                <div className="avatar">
                  <img src="https://picsum.photos/50/50" alt="" />
                </div>
              </div>
            </div>
          </div>
        </li> */
}
{
	/* <div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">IN PROGRESS 2</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card" style={{ width: "17rem", height: "25rem" }}>
<div className="card-header">DONE 3</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */
}
