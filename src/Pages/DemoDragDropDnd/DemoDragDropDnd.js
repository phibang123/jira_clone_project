import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";

import { Provider } from "react-redux";
import _ from "lodash";

export default function DemoDragDropDnd() {
	const [state, setstate] = useState({
		toDo: {
			id: "toDo",
			items: [
				{ id: "1", taskName: "Task 1" },
				{ id: "2", taskName: "Task 2" },
				{ id: "3", taskName: "Task 3" },
				{ id: "4", taskName: "Task 4" },
			],
		},
		inProgress: {
			id: "inProgress",
			items: [
				{ id: "5", taskName: "Task 5" },
				{ id: "6", taskName: "Task 6" },
			],
		},
		done: {
			id: "done",
			items: [
				{ id: "7", taskName: "Task 7" },
				{ id: "8", taskName: "Task 8" },
			],
		},
  });
  const handleDragEnd = (result) =>
  {
    console.log('result',result)
    
    let { destination, source } = result;
    if (!destination)
    {
      return
    }
    else if (destination.index === source.index && destination.droppableId === source.droppableId)
    {
      return
    }


    //tạo ra 1 drag
    let itemCopy = { ...state[source.droppableId].items[source.index] }
    
    console.log('itemCopy',itemCopy)

    console.log('destinatiion',destination)
    console.log('source', source)
    


    //drop bắt đẩu kéo  //tìm xem nó có trong đó không
    let index = state[source.droppableId].items.findIndex(item => item.id == itemCopy.id)
    state[source.droppableId].items.splice(index,1)
    

    //drop thả vào  //chèn itemcopy vào điểm đên
    let dropDestination = state[destination.droppableId].items
    dropDestination.splice(destination.index, 0, itemCopy) //chèn vào vị trí nào, bao nhiêu phần tữ, và chèn ai
    console.log('dropDestination', dropDestination)
    console.log('destination.index',destination.index)
    
    setstate(
      state

     
    )
    
    
  }
	return (
		<div className="container">
			<h3 className="text-center display-4">Demo DraggAndDrop DND</h3>
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="row">
					{_.map(state, (statusTask, index) => {
						return (
							<Droppable droppableId={statusTask.id} key={index}>
								{(provider) => {
                  return (
                    
                    <div className="col-4 p-5">
                      
											<div
												className="bg-dark p-5"
												key={index}
												ref={provider.innerRef}
												{...provider.droppableProps}
                      >
                        <h3 className='text-white text-center'>{statusTask.id}</h3>
												{statusTask.items.map((item, index) => {
													return (
														<Draggable
															key={item.id}
															index={index}
															draggableId={item.id}
														>
															{(provider) => {
																return (
																	<div
																		ref={provider.innerRef}
																		{...provider.draggableProps}
																		{...provider.dragHandleProps}
																		className="mt-2 p-3 bg-white text-center"
																	>
																		{item.taskName}
																	</div>
																);
															}}
														</Draggable>
													);
												})}
												{provider.placeholder}
											</div>
										</div>
									);
								}}
							</Droppable>
						);
					})}
				</div>
			</DragDropContext>
		</div>
	);
}
