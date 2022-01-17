import profileImage from '../../images/taeyang.png';
import articleImage from '../../images/inseong.png';
import shield from '../../images/shield.png';
import tripleDot from '../../images/tripleDot.png';
import MyCommentPagination from './MyCommentPagination';

/* Store import */
import { RootState } from '../../index';
import { logout, getUserInfo } from '../../store/AuthSlice';
import { getMyConcertCommentInfo, getMyConcertCommentTotalPage, getCommentBtnType } from '../../store/MySlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function MyCommentBox() {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { concertCommentInfo, myConcertCommentTotalPage, myTotalConcertComment, commentBtnType, articleCommentInfo } = useSelector((state: RootState) => state.my);

  console.log('----------------articleCommentInfo --------------------', articleCommentInfo)
  if(Array.isArray(articleCommentInfo)) {
    console.log(' &&&&&&&&&&&&&&&&&&&&&&&&&&&&&', articleCommentInfo[0].Article, articleCommentInfo[0].Article.concert_id)
  }

  // 콘서트 및 콘친 게시물 버튼 핸들러
  const handleCommentSelectionBtn = async (key: string) => {
    // 현재 댓글 버튼의 상태를 업데이트
    // ex) 콘서트 버튼을 누르면 => commentBtnType = '콘서트', 콘친 게시물 버튼을 누르면 => commentBtnType = '콘친'
    dispatch(getCommentBtnType(key));
  }

  
  const handleConcertCommentSelected = async (id: number, concert_id: number, user_id: number) => {

    console.log('콘서트 - 나의 댓글을 선택했습니다!')
  
    // // 선택한 게시물에 해당하는 콘서트에 대한 정보를 불러온다
    // const responseConcert = await axios.get(
    //   `${process.env.REACT_APP_API_URL}/concert/${concert_id}`,
    //   { withCredentials: true },
    //   );

    // // 선택한 게시물에 대한 정보를 불러온다
    // const responseArticle = await axios.get(
    //   `${process.env.REACT_APP_API_URL}/concert/${concert_id}/article/${id}`,
    //   { withCredentials: true },
    //   );  
    
    // // 현재 선택한 콘서트 업데이트 (target)
    // dispatch(setTarget(responseConcert.data.data))
    // // 현재 선택한 게시물 업데이트 (target)
    // dispatch(setTargetArticle(responseArticle.data.data))
    // navigate('/conchin')

  }

  // 주의! concertid를 알아야 이동할텐데... 현재는 concertid를 알 방법이 없다!
  const handleArticleCommentSelected = async (id: number, article_id: number, user_id: number) => {

    console.log('콘친 게시물 - 나의 댓글을 선택했습니다!')
    
  
    // // 선택한 게시물에 해당하는 콘서트에 대한 정보를 불러온다
    // const responseConcert = await axios.get(
    //   `${process.env.REACT_APP_API_URL}/concert/${concert_id}`,
    //   { withCredentials: true },
    //   );

    
    
    // // 현재 선택한 콘서트 업데이트 (target)
    // dispatch(setTarget(responseConcert.data.data))
    // // 현재 선택한 게시물 업데이트 (target)
    // dispatch(setTargetArticle(responseArticle.data.data))
    // navigate('/conchin')

  }

  return (
    <div id='myCommentBox'>
      <div id='titleWrapper'>
        <p className='title'>내가 쓴 댓글</p>
      </div>
      <div id='commentWrapper'>
        <div id='commentBox'>
          <div id='countWrapper'>
            <h1 className='count'>{myTotalConcertComment}개의 댓글</h1>
            <button onClick={() => handleCommentSelectionBtn('콘서트')}>콘서트</button>
            <button onClick={() => handleCommentSelectionBtn('콘친')}>콘친 게시물</button>
          </div>
          {/* 어떤 버튼 (콘서트 / 콘친 게시물)이 눌림에 따라 댓글이 달라진다 */}
          { 
            commentBtnType === '콘서트'
            ? 
             ( Array.isArray(concertCommentInfo)
              ? concertCommentInfo.map((el: any) => {
                return (
                <div className='box' onClick={() => handleConcertCommentSelected(el.id, el.concert_id, el.user_id)}>
                  <div className='dateBox'>
                    <p className='nickNameAndDate'> {userInfo.username} | {el.updatedAt} </p>
                    <div className='dotWrapper'>
                      <img className='dot' src={tripleDot} alt='tripleDot' />
                    </div>
                  </div>
                      <div id='imgAndText'>
                        <div className='imgWrapper'>
                          <img className='img' src={userInfo.image} alt='profileImage' />
                          {userInfo.role === 2 ? <img className='shield' src={shield} alt='shield' /> : null}
                        </div>
                        <p id='text'> {el.content} </p>
                     </div>
                 </div>
                )
              })
              : null
             )
            :
              ( Array.isArray(articleCommentInfo)
                ? articleCommentInfo.map((el: any) => {
                  return (
                  <div className='box' onClick={() => handleArticleCommentSelected(el.id, el.article_id, el.user_id)}>
                    <div className='dateBox'>
                      <p className='nickNameAndDate'> {userInfo.username} | {el.updatedAt} </p>
                      <div className='dotWrapper'>
                        <img className='dot' src={tripleDot} alt='tripleDot' />
                      </div>
                    </div>
                        <div id='imgAndText'>
                          <div className='imgWrapper'>
                            <img className='img' src={userInfo.image} alt='profileImage' />
                            {userInfo.role === 2 ? <img className='shield' src={shield} alt='shield' /> : null}
                          </div>
                          <p id='text'> {el.content} </p>
                       </div>
                   </div>
                  )
                })
                : null
              )
           }
        </div>
      </div>

      <div id='paginationWrapper'>
        <MyCommentPagination />
      </div>
    </div>
  );
}

export default MyCommentBox;
