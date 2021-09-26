import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ContentMain from '../../Components/Jira/Main/ContentMain'
import { GET_PROJECT_DETAIL_API_SAGA } from '../../Redux/Constants/constants'
import HeaderMain from '../../Components/Jira/Main/HeaderMain'
import InfoMain from '../../Components/Jira/Main/InfoMain'

export default function Index(props)
{
  const { projectDetail } = useSelector(state => state.projectReducer)


  //khi người dùng link vào trang này = navLink thì tao sẻ lấy tham số từ url.params 
  //gọi saga => call api => đưa vào reducer
  
  //useEffect thì gọi saga từ saga gọi  api => dưa lên reducer xong
  //useSelect là lấy tham số từ Reducer ra truyền vào Container
  const dispatch = useDispatch()
  useEffect(() => {
    const {projectId} = props.match.params;
    dispatch({
      type: GET_PROJECT_DETAIL_API_SAGA,
      projectId
    })
  }, [])
  return (
    <div className='main mt-3'>
						
    <HeaderMain projectDetail={projectDetail}></HeaderMain>
    <InfoMain projectDetail={projectDetail}></InfoMain>
    <ContentMain projectDetail={projectDetail}></ContentMain>
  
  </div>
  )
}
