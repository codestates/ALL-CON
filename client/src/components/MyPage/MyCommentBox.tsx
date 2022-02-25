/* Config import */
/* CSS import */
import LoadingImage from '../../images/spinner.gif';
import noCommentImg from '../../images/no_comment_img.png';
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
import { showAlertModal, insertAlertText } from '../../store/ModalSlice';
import { setTarget, setTargetIdx, setIsRendering } from '../../store/MainSlice';
import {
  setTargetArticle,
  setPostingOrder,
  setArticleOrder,
  setAllArticles,
  setArticleTotalPage,
} from '../../store/ConChinSlice';
import { setIsLoadingState } from '../../store/MySlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MyCommentPagination from './MyCommentPagination';

function MyCommentBox() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* useSelector */
  const {
    concertCommentInfo,
    myTotalConcertComment,
    commentBtnType,
    articleCommentInfo,
    myTotalArticleComment,
    isLoadingState,
  } = useSelector((state: RootState) => state.my);
  const { allConcerts } = useSelector((state: RootState) => state.main);

  /* 지역상태 - useState */
  /* useEffect */

  /* handler 함수 (기능별 정렬) */
  // 콘서트 및 콘친 게시물 버튼 핸들러
  const handleCommentSelectionBtn = async (key: string) => {
    // 현재 댓글 버튼의 상태를 업데이트
    // ex) 콘서트 버튼을 누르면 => commentBtnType = '콘서트', 콘친 게시물 버튼을 누르면 => commentBtnType = '콘친'
    dispatch(getCommentBtnType(key));
    if (key === '콘서트') {
      dispatch(
        setIsLoadingState({
          myArticle: true,
          myConcertComment: false,
          myArticleComment: true,
        }),
      );

      // [GET] 내가 작성한 댓글 조회 (콘친&페이지: 1)
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/mycomment?pageNum=1&comment_type=article`,
        { withCredentials: true },
      );
      // dispatch로 내가 작성한 댓글 업데이트 (콘친)
      dispatch(getMyArticleCommentInfo(response.data.data));
      // 콘친 댓글의 현재 페이지를 1로 업데이트
      dispatch(getMyArticleCommentCurrentPage(1));
      dispatch(
        setIsLoadingState({
          myArticle: true,
          myConcertComment: true,
          myArticleComment: true,
        }),
      );
    } else if (key === '콘친') {
      dispatch(
        setIsLoadingState({
          myArticle: true,
          myConcertComment: true,
          myArticleComment: false,
        }),
      );

      // [GET] 내가 작성한 댓글 조회 (콘서트&페이지: 1)
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/mycomment?pageNum=1`,
        { withCredentials: true },
      );
      // dispatch로 내가 작성한 댓글 업데이트 (콘서트)
      dispatch(getMyConcertCommentInfo(response.data.data));
      // 콘친 댓글의 현재 페이지를 1로 업데이트
      dispatch(getMyConcertCommentCurrentPage(1));
      dispatch(
        setIsLoadingState({
          myArticle: true,
          myConcertComment: true,
          myArticleComment: true,
        }),
      );
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

      // 티켓 오픈일+1달이 끝난 콘서트인 경우, 다음을 실행한다 (activation: false)
      if (!responseConcert.data.data.concertInfo.activation) {
        // 모달창 OPEN
        dispatch(insertAlertText('종료된 콘서트 입니다! 😖'));
        dispatch(showAlertModal(true));
      }
      // 활성화 콘서트인 경우, 다음을 실행한다 (activation: true)
      else {
        // 현재 선택한 콘서트 업데이트 (target)
        setTimeout(() => {
          dispatch(setTarget(responseConcert.data.data.concertInfo));
        }, 300);
        /* 마이페이지로 가기위한 상태 설정 */
        dispatch(setIsRendering(false));
        setTimeout(() => {
          dispatch(
            setTargetIdx(
              allConcerts.findIndex(
                concert =>
                  concert.id === responseConcert.data.data.concertInfo.id,
              ),
            ),
          );
        }, 500);
        navigate('/main');
      }
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

      // 테스트

      const responseAllArticle = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${responseConcert.data.data.concertInfo.id}/article?order='view'`,
        { withCredentials: true },
      );

      dispatch(setAllArticles(responseAllArticle.data.data.articleInfo));
      dispatch(setArticleTotalPage(responseAllArticle.data.data.totalPage));

      // 테스트

      // 현재 선택한 콘서트 업데이트 (target)
      dispatch(setTarget(responseConcert.data.data.concertInfo));
      // 현재 선택한 게시물 업데이트 (target)
      setTimeout(() => {
        dispatch(setTargetArticle(responseArticle.data.data.articleInfo));
      }, 300);
      dispatch(setConChinPageNum(1));

      dispatch(setPostingOrder('view'));
      dispatch(setArticleOrder('view'));

      // 콘친페이지로 이동
      navigate('/conchin');
    }
  };

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
            {/* 콘서트 & 콘친 버튼 */}
            <p
              className={
                commentBtnType === '콘서트' ? 'myOrderChosen' : 'myOrder'
              }
              onClick={() => handleCommentSelectionBtn('콘서트')}
            >
              콘서트
            </p>
            <p
              className={
                commentBtnType === '콘친' ? 'myOrderChosen' : 'myOrder'
              }
              onClick={() => handleCommentSelectionBtn('콘친')}
            >
              콘친 게시물
            </p>
          </div>
          {/* 어떤 버튼 (콘서트 / 콘친 게시물)이 눌림에 따라 댓글이 달라진다 */}
          {commentBtnType === '콘서트' ? (
            Array.isArray(concertCommentInfo) &&
            isLoadingState?.myConcertComment ? (
              concertCommentInfo.map((el: any, idx: number) => {
                return (
                  <div
                    className='myCommentSingleBox'
                    onClick={() =>
                      handleConcertCommentSelected(
                        el.id,
                        el.concert_id,
                        el.user_id,
                      )
                    }
                  >
                    <div className='myDateBox'>
                      {/* 날짜와 작성자 */}
                      <p className='myNickNameAndDate'>
                        {' '}
                        <b>{el.Concert.title}</b> |{' '}
                        {el.updatedAt.substring(0, 10)}{' '}
                      </p>
                    </div>
                    <div id='myImgAndText'>
                      <div className='myImgWrapper'>
                        <img
                          className='myImg'
                          src={el.Concert.image_concert}
                          alt='profileImage'
                        />
                        {el.Concert.activation === false ? (
                          <div className='endArticle'>
                            <p className='endTitle'>종료</p>
                          </div>
                        ) : null}
                      </div>
                      <div className='myTextWrapper'>
                        <p id='myText'> {el.content} </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <img
                className='loadingImg'
                src={LoadingImage}
                alt='LoadingImage'
              />
            )
          ) : /******************************************************************************************************************/
          Array.isArray(articleCommentInfo) &&
            isLoadingState?.myArticleComment ? (
            articleCommentInfo.map((el: any, idx: number) => {
              return (
                <div
                  className='myCommentSingleBox'
                  onClick={() =>
                    handleArticleCommentSelected(
                      idx,
                      el.id,
                      el.article_id,
                      el.user_id,
                    )
                  }
                >
                  <div className='myDateBox'>
                    {/* 날짜와 작성자 */}
                    <p className='myNickNameAndDate'>
                      {' '}
                      <b>{el.Article.title} </b> |{' '}
                      {el.updatedAt.substring(0, 10)}{' '}
                    </p>
                  </div>
                  <div id='myImgAndText'>
                    <div className='myImgWrapper'>
                      <img
                        className='myImg'
                        src={el.Article.image}
                        alt='profileImage'
                      />
                      {el.Article.activation === false ? (
                        <div className='endArticle'>
                          <p className='endTitle'>종료</p>
                        </div>
                      ) : null}
                    </div>
                    <div className='myTextWrapper'>
                      <p id='myText'> {el.content} </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <img className='loadingImg' src={LoadingImage} alt='LoadingImage' />
          )}
        </div>
      </div>

      <div id='paginationWrapper'>
        <MyCommentPagination />
      </div>

      {/* 댓글이 없다면 display */}
      {(commentBtnType === '콘서트' && myTotalConcertComment === 0) ||
      (commentBtnType === '콘친' && myTotalArticleComment === 0) ? (
        <div id='noCommentImgWrapper'>
          <img id='noCommentImg' src={noCommentImg} />
          <p id='noCommentMessage'>작성한 댓글이 없습니다!</p>
        </div>
      ) : null}
    </div>
  );
}

export default MyCommentBox;
