import {
	GET_ALL_TASK_API_SAGA,
	GET_PROJECT_DETAIL_API_SAGA,
} from "../../Redux/Constants/constants";
import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContentMain from "../../Components/Jira/Main/ContentMain";
import HeaderMain from "../../Components/Jira/Main/HeaderMain";
import InfoMain from "../../Components/Jira/Main/InfoMain";

function Index(props)
{
	const { projectId } = props.match.params;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({
			type: GET_PROJECT_DETAIL_API_SAGA,
			projectId,
		});
		dispatch({
			type: GET_ALL_TASK_API_SAGA,
			projectId,
		});
	}, [props]);
	const { projectDetail, TaskMyIssues } = useSelector(
		(state) => state.projectReducer
	);
	const { getAllTask } = useSelector((state) => state.TaskReducer);


	const useCallbackProjectDetail = useCallback(
		projectDetail,
		[projectDetail]
	);

  const useCallbackProjectId = useCallback(
		projectId,
		[projectId]
  );
  
  const useCallbackGetAllTask = useCallback(
		getAllTask,
		[getAllTask]
  );

  const useCallbackTaskMyIssues = useCallback(
		TaskMyIssues,
		[TaskMyIssues]
  );

	//khi người dùng link vào trang này = navLink thì tao sẻ lấy tham số từ url.params
	//gọi saga => call api => đưa vào reducer

	//useEffect thì gọi saga từ saga gọi  api => dưa lên reducer xong
	//useSelect là lấy tham số từ Reducer ra truyền vào Container

	return (
		<div className="main mt-3">
			<HeaderMain projectDetail={useCallbackProjectDetail}></HeaderMain>
			<InfoMain
				projectDetail={useCallbackProjectDetail}
				projectId={useCallbackProjectId}
				getAllTask={useCallbackGetAllTask}
				TaskMyIssues={useCallbackTaskMyIssues}
			></InfoMain>
			<ContentMain projectDetail={useCallbackProjectDetail}></ContentMain>
		</div>
	);
}

export default memo(Index);
