/* Config import */
/* CSS import */
import noCommentImg from '../../images/no_comment_img.png'
/* Store import */
import { RootState } from '../../index';
import {
  getCommentBtnType,
  getMyConcertCommentCurrentPage,
  getMyArticleCommentCurrentPage,
  getMyConcertCommentInfo,
  getMyArticleCommentInfo,
} from '../../store/MySlice';
import { setConChinPageNum } from '../../store/ConChinCommentSlice';
import { setPageNum } from '../../store/ConcertCommentSlice';
import { setTarget, setTargetIdx, setIsRendering, setOrder } from '../../store/MainSlice';
import { setTargetArticle } from '../../store/ConChinSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MyCommentPagination from './MyCommentPagination';

function MyCommentBox() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const {
    concertCommentInfo,
    myTotalConcertComment,
    commentBtnType,
    articleCommentInfo,
    myConcertCommentCurrentPage,
    myConcertCommentCurrentComment,
    myTotalArticleComment,
    myArticleCommentCurrentPage,
    myArticleCommentCurrentComment,
  } = useSelector((state: RootState) => state.my);
  const { allConcerts, target, targetIdx } = useSelector((state: RootState) => state.main)

  /* 지역상태 - useState */
  const [commentClick, setCommentClick] = useState<boolean>(false);
  const [conchinCommentClick, setConchinCommentClick] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<string>('');

  const [myArticle, setMyArticle] = useState<any[]>([]);
  /* useEffect */
 

  /* handler 함수 (기능별 정렬) */
  // 콘서트 및 콘친 게시물 버튼 핸들러
  const handleCommentSelectionBtn = async (key: string) => {
    // 현재 댓글 버튼의 상태를 업데이트
    // ex) 콘서트 버튼을 누르면 => commentBtnType = '콘서트', 콘친 게시물 버튼을 누르면 => commentBtnType = '콘친'
    dispatch(getCommentBtnType(key));
    if(key === '콘서트') {
      setCommentClick(false);
      //
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/mycomment?pageNum=1&comment_type=article`,
        { withCredentials: true },
      );

      dispatch(getMyArticleCommentInfo(response.data.data));

      // 콘친 댓글의 현재 페이지를 1로 업데이트
      dispatch(getMyArticleCommentCurrentPage(1))
    }
    else if(key === '콘친') {
      setConchinCommentClick(false);
      //
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/mycomment?pageNum=1`,
        { withCredentials: true },
      );

      dispatch(getMyConcertCommentInfo(response.data.data));
      
      // 콘친 댓글의 현재 페이지를 1로 업데이트
      dispatch(getMyConcertCommentCurrentPage(1))
    }
  };

  // 마이페이지 - 내가 쓴 (콘서트) 댓글중 하나를 선택했을 때, 다음을 실행한다
  const handleConcertCommentSelected = async (
    id: number,
    concert_id: number,
    user_id: number,
  ) => {
    // articleCommentInfo가 빈 배열일 경우를 제외 (타입에러 처리)
    if (Array.isArray(articleCommentInfo)) {
      // 선택된 (콘서트) 나의 댓글에 대한 콘서트 정보를 불러온다
      const responseConcert = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${concert_id}`,
        { withCredentials: true },
      );

      // 현재 선택한 콘서트 업데이트 (target)
      dispatch(setTarget(responseConcert.data.data.concertInfo));
      /* 마이페이지로 가기위한 상태 설정 */
      dispatch(setIsRendering(false));
      dispatch(setOrder('view'));
      dispatch(setPageNum(1));
      dispatch(setTargetIdx(allConcerts.findIndex(concert => concert.id === responseConcert.data.data.concertInfo.id)));
      // 메인페이지로 이동
      navigate('/main');
    }
  };

  // 마이페이지 - 내가 쓴 (콘친) 댓글중 하나를 선택했을 때, 다음을 실행한다
  const handleArticleCommentSelected = async (
    idx: number,
    id: number,
    article_id: number,
    user_id: number,
  ) => {
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
      dispatch(setConChinPageNum(1));
    }
  };



  // 페이지를 바꾸면 수정 비활성화 핸들러
  const deactivateEditTextarea = async (key?: string) => {
    // 수정이 활성화된 상태에서 페이지를 누르면, 수정을 비활성화 시킨다
    if(key === '콘서트') setCommentClick(false)
    else if(key === '콘친') setConchinCommentClick(false)
  }

  return (
    <div id='myCommentBox'>
      <div id='titleWrapper'>
        <p className='title'>내가 쓴 댓글</p>
      </div>
      <div id='commentWrapper'>
        <div id='commentBox'>
          <div id='myCountWrapper'>
            <h1 className='myCount'>
              {commentBtnType === '콘서트'
                ? myTotalConcertComment
                : myTotalArticleComment}
              개의 댓글
            </h1>

            <p
              className={commentBtnType === '콘서트' ? 'myOrderChosen' : 'myOrder'}
              onClick={() => handleCommentSelectionBtn('콘서트')}>
              콘서트
            </p>
            <p
              className={commentBtnType === '콘친' ? 'myOrderChosen' : 'myOrder'}
              onClick={() => handleCommentSelectionBtn('콘친')}>
              콘친 게시물
            </p>
          </div>
          {/* 어떤 버튼 (콘서트 / 콘친 게시물)이 눌림에 따라 댓글이 달라진다 */}
          {commentBtnType === '콘서트'
            ? Array.isArray(concertCommentInfo)
              ? concertCommentInfo.map((el: any, idx: number) => {
                  return (
                    <div
                      className='box'
                    >
                      <div className='myDateBox'>
                        {/* 날짜와 작성자 */}
                        <p className='myNickNameAndDate'>
                          {' '}
                          <b>{el.Concert.title}</b> | {el.updatedAt.substring(0, 10)}{' '}
                        </p>
                        {/* <div className='myOptionWrapper'> */}
                          {/* 콘서트 댓글 수정하기 */}
                          {/* { commentClick && myConcertCommentCurrentComment === el.id
                              ? <div
                                  className='myOptionBtn'
                                  onClick={() =>
                                    handleEditCommentConfirm(
                                    '콘서트',
                                     el.id,
                                     el.concert_id,
                                     el.content,
                                    )}>
                                    수정
                                </div>
                                : <div
                                    className='myOptionBtn'
                                    onClick={() => {
                                      // handleEditBtn(el.id);
                                      handleEditBtn('콘서트');
                                      dispatch(getMyConcertCommentCurrentComment(el.id));
                                    }}>
                                    수정하기
                                  </div>
                           } */}
                          {/* 콘서트 댓글 삭제하기 */}
                          {/* { commentClick && myConcertCommentCurrentComment === el.id
                            ? <div
                                className='myOptionBtn'
                                onClick={handleEditCommentClose}
                              >
                                취소
                              </div>
                            : <div
                                className='myOptionBtn'
                                onClick={() => {
                                  handleCommentDelete(
                                  '콘서트',
                                   el.id,
                                   el.concert_id);
                                }}
                              >
                                삭제하기
                              </div>
                          }
                        </div> */}
                      </div>
                      <div id='myImgAndText'>
                        <div className='myImgWrapper'>
                          <img
                            className='myImg'
                            src={el.Concert.image_concert}
                            alt='profileImage'
                            onClick={() =>
                              handleConcertCommentSelected(
                                el.id,
                                el.concert_id,
                                el.user_id,
                              )
                            }
                          />
                        </div>
                        <div className='myTextWrapper'>
                          {/* 수정버튼 유무에 따른... */}
                          { commentClick && myConcertCommentCurrentComment === el.id
                           ? (
                            <textarea
                              id='myText'
                              placeholder={el.content}
                              // onChange={handleEditComment}
                            />
                          ) : (
                            <p id='myText'> {el.content} </p>
                          )}
                          <div className='myCommentOptionBtnWrapper'>                          
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null
              /******************************************************************************************************************/
            : Array.isArray(articleCommentInfo)
            ? articleCommentInfo.map((el: any, idx: number) => {
                return (
                  <div
                    className='box'>
                    <div className='myDateBox'>
                      {/* 날짜와 작성자 */}
                      <p className='myNickNameAndDate'>
                        {' '}
                        <b>{el.Article.title} </b> | {el.updatedAt.substring(0, 10)}{' '}
                      </p>
                      {/* <div className='myOptionWrapper'> */}
                        {/* 콘친 게시물 댓글 수정하기 */}
                        {/* { conchinCommentClick && myArticleCommentCurrentComment === el.id
                          ? <div
                              className='myOptionBtn'
                              onClick={() =>
                                handleEditCommentConfirm(
                                '콘친',
                                 el.id,
                                 el.Article.concert_id,
                                 el.content,
                                 el.article_id
                              )}>
                              수정
                             </div>
                          :  <div
                               className='myOptionBtn'
                               onClick={() => {
                                //  handleEditBtn(el.id);
                                handleEditBtn('콘친');
                                dispatch(getMyArticleCommentCurrentComment(el.id));
                             }}>
                             수정하기
                            </div>
                        } */}
                        {/* 콘친 게시물 댓글 삭제하기 */}
                        {/* { conchinCommentClick && myArticleCommentCurrentComment === el.id
                          ? <div
                              className='myOptionBtn'
                              onClick={handleEditCommentClose}
                            >
                            취소
                            </div>
                          : <div
                              className='myOptionBtn'
                              onClick={() => {
                                handleCommentDelete(
                                '콘친',
                                 el.id,
                                 el.Article.concert_id,
                                 el.article_id);
                             }}>
                             삭제하기
                            </div>
                        }
                      </div> */}
                    </div>
                    <div id='myImgAndText'>
                      <div className='myImgWrapper'>
                        <img
                          className='myImg'
                          src={el.Article.image}
                          alt='profileImage'
                          onClick={() =>
                            handleArticleCommentSelected(
                              idx,
                              el.id,
                              el.article_id,
                              el.user_id,
                            )
                          }
                        />
                      </div>
                      <div className='myTextWrapper'>
                        {/* 수정버튼 유무에 따른... */}
                        { conchinCommentClick && myArticleCommentCurrentComment === el.id
                          ? (
                          <textarea
                            id='myText'
                            placeholder={el.content}
                            // onChange={handleEditComment}
                          />
                        ) : (
                          <p id='myText'> {el.content} </p>
                        )}
                        <div className='myCommentOptionBtnWrapper'>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <div id='paginationWrapper'>
        <MyCommentPagination deactivateEditTextarea={deactivateEditTextarea}/>
      </div>
      
      {/* 댓글이 없다면 display */}
      { commentBtnType === '콘서트' && myTotalConcertComment === 0 || commentBtnType === '콘친' && myTotalArticleComment === 0
        ? <div id='noCommentImgWrapper'> 
            <img id='noCommentImg' src={noCommentImg} />
            <p id='noCommentMessage' >작성한 댓글이 없습니다!</p> 
          </div>
        : null
      }

    </div>
  );
}

export default MyCommentBox;
