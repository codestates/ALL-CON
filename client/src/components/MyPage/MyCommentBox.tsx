/* Config import */
/* CSS import */
import shield from '../../images/shield.png';
import tripleDot from '../../images/tripleDot.png';
/* Store import */
import { RootState } from '../../index';
import { getCommentBtnType } from '../../store/MySlice';
import { setTarget, setAllConcerts } from '../../store/MainSlice';
import { setTargetArticle } from '../../store/ConChinSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MyCommentPagination from './MyCommentPagination';

function MyCommentBox() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const {concertCommentInfo, myTotalConcertComment, commentBtnType, articleCommentInfo} = useSelector((state: RootState) => state.my);
  
   /* 지역상태 - useState */
   /* useEffect */
   const [commentClick, setCommentClick] = useState<boolean>(false)

  /* handler 함수 (기능별 정렬) */
  // 콘서트 및 콘친 게시물 버튼 핸들러
  const handleCommentSelectionBtn = async (key: string) => {
    // 현재 댓글 버튼의 상태를 업데이트
    // ex) 콘서트 버튼을 누르면 => commentBtnType = '콘서트', 콘친 게시물 버튼을 누르면 => commentBtnType = '콘친'
    dispatch(getCommentBtnType(key));
  };

  // 마이페이지 - 내가 쓴 (콘서트) 댓글중 하나를 선택했을 때, 다음을 실행한다
  const handleConcertCommentSelected = async (id: number, concert_id: number, user_id: number) => {

    // articleCommentInfo가 빈 배열일 경우를 제외 (타입에러 처리)
    if (Array.isArray(articleCommentInfo)) {
      // 선택된 (콘서트) 나의 댓글에 대한 콘서트 정보를 불러온다
      const responseConcert = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${concert_id}`,
        { withCredentials: true },
        );

        // 현재 선택한 콘서트 업데이트 (target)
        dispatch(setTarget(responseConcert.data.data.concertInfo));
        // 메인페이지로 이동
        navigate('/main');
    }
  };

  // 마이페이지 - 내가 쓴 (콘친) 댓글중 하나를 선택했을 때, 다음을 실행한다
  const handleArticleCommentSelected = async (idx: number, id: number, article_id: number, user_id: number) => {

    // articleCommentInfo가 빈 배열일 경우를 제외 (타입에러 처리)
    if (Array.isArray(articleCommentInfo)) {
      // 선택된 (콘친 게시물) 나의 댓글에 대한 콘서트 정보를 불러온다
      const responseConcert = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${articleCommentInfo[idx].Article.concert_id}`,
        { withCredentials: true },
        );
        
        // 선택한 (콘친 게시물) 나의 댓글에 대한 게시물에 대한 정보를 불러온다
        const responseArticle = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/${articleCommentInfo[idx].Article.concert_id}/article/${article_id}`,
          { withCredentials: true },
          );
          
          // 현재 선택한 콘서트 업데이트 (target)
          dispatch(setTarget(responseConcert.data.data.concertInfo));
          // 현재 선택한 게시물 업데이트 (target)
          dispatch(setTargetArticle(responseArticle.data.data.articleInfo));
          // 콘친페이지로 이동
          navigate('/conchin');
    };
  };

  // 댓글 수정하기 버튼 핸들러
  const handleEditBtn = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(' 댓글 버튼을 클릭했습니다.')
  }

  return (
    <div id='myCommentBox'>
      <div id='titleWrapper'>
        <p className='title'>내가 쓴 댓글</p>
      </div>
      <div id='commentWrapper'>
        <div id='commentBox'>
          <div id='myCountWrapper'>
            <h1 className='count'>{myTotalConcertComment}개의 댓글</h1>
            {/* <div id='bottomLineOrderBox'> */}
              <p className='myOrder' onClick={() => handleCommentSelectionBtn('콘서트')}> 콘서트 </p>
              <p className='myOrder' onClick={() => handleCommentSelectionBtn('콘친')}> 콘친 게시물 </p>
          </div>
          {/* 어떤 버튼 (콘서트 / 콘친 게시물)이 눌림에 따라 댓글이 달라진다 */}
          {commentBtnType === '콘서트'
            ? Array.isArray(concertCommentInfo)
              ? concertCommentInfo.map((el: any, idx: number) => {
                  return (
                    <div
                      className='box'
                      onClick={() =>
                        handleConcertCommentSelected(
                          el.id,
                          el.concert_id,
                          el.user_id,
                        )
                      }
                    >
                      <div className='dateBox'>
                        <p className='nickNameAndDate'>
                          {' '}
                          {userInfo.username} | {el.updatedAt.substring(0, 10)}{' '}
                        </p>
                <div className='optionWrapper'>
                        <div
                       className='optionBtn'
                      onClick={() => {}}>
                       수정하기
                     </div>
                     <div
                       className='optionBtn'
                      onClick={() => {}}>
                       삭제하기
                     </div>
                </div>
                      </div>
                      <div id='imgAndText'>
                        <div className='imgWrapper'>
                          <img
                            className='img'
                            src={userInfo.image}
                            alt='profileImage'
                          />
                          {userInfo.role === 2 ? (
                            <img className='shield' src={shield} alt='shield' />
                          ) : null}
                        </div >
                        <div className='textWrapper'>
                        <p id='textComment'> {el.content} </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null
            : Array.isArray(articleCommentInfo)
            ? articleCommentInfo.map((el: any, idx: number) => {
                return (
                  <div
                    className='box'
                    onClick={() =>
                      handleArticleCommentSelected(
                        idx,
                        el.id,
                        el.article_id,
                        el.user_id,
                      )
                    }
                  >
                    <div className='dateBox'>
                      <p className='nickNameAndDate'>
                        {' '}
                        {userInfo.username} | {el.updatedAt}{' '}
                      </p>
                      {/* <div className='dotWrapper'>
                        <img className='dot' src={tripleDot} alt='tripleDot' />
                      </div> */}
                      <div
                      className='myCommentOptionBtn'
                      onClick={() => {
                        // setClickId(el.id);
                        // dispatch(setComment(el));
                        // setEditComment(el.content);
                      }}
                      >
                       수정하기
                     </div>
                    </div>
                    <div id='imgAndText'>
                      <div className='imgWrapper'>
                        <img
                          className='img'
                          src={userInfo.image}
                          alt='profileImage'
                        />
                        {userInfo.role === 2 ? (
                          <img className='shield' src={shield} alt='shield' />
                        ) : null}
                      </div>
                      {/* 수정버튼 유무에 따른... */}
                      { commentClick 
                          ? <textarea
                             id='text'
                             placeholder='수정확인'
                             onChange={handleEditBtn}
                             />
                          : <p id='text'> {el.content} </p>
                      }
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <div id='paginationWrapper'>
        <MyCommentPagination />
      </div>
    </div>
  );
}

export default MyCommentBox;
