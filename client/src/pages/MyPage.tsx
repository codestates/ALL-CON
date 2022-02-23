import MyProfileBox from '../components/MyPage/MyProfileBox';
import MyArticleBox from '../components/MyPage/MyArticleBox';
import MyCommentBox from '../components/MyPage/MyCommentBox';
import Footer from '../components/Footer';

/* Store import */
import { RootState } from '../index';
import { logout, getUserInfo } from '../store/AuthSlice';
import { showLoginModal, showPrivacyModal, showSignupModal, showTosModal, showAlertModal, insertAlertText } from '../store/ModalSlice';
import {
  getCommentBtnType,
  getArticleInfo,
  getMyArticleTotalPage,
  getMyConcertCommentTotalPage,
  getMyConcertCommentInfo,
  getMyTotalConcertComment,
  getMyArticleCommentInfo,
  getMyArticleCommentTotalPage,
  getMyTotalArticleComment,
  getBtnSwitchState,
  getMyTotalArticle,
  getMyConcertCommentCurrentPage,
  getMyArticleCommentCurrentPage,
  getMyArticleCurrentPage,
  setIsLoadingState,
} from '../store/MySlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function MyPage() {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { isLoadingState } = useSelector((state: RootState) => state.my);

  // 내가 쓴 게시글 불러오기
  const getAllMyArticles = async () => {
    try {
      // 로딩 상태 세팅 (내가 쓴 콘친 게시물: false)
      dispatch(setIsLoadingState({myArticle: false , myConcertComment: false, myArticleComment: false}))

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/myarticle?pageNum=1`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(getArticleInfo(response.data.data));
        dispatch(getMyArticleTotalPage(response.data.data.totalPage));
        dispatch(getMyTotalArticle(response.data.data.totalArticle))
        // 로딩 상태 세팅 (내가 쓴 콘친 게시물: true)
        dispatch(setIsLoadingState({myArticle: true , myConcertComment: false, myArticleComment: false}))
        // 전체 페이지가 0이 아니라면, 항상 마이페이지에 진입했을 때 내가 작성한 게시글의 현재페이지는 1이다
        if(response.data.data.totalPage !== 0) dispatch(getMyArticleCurrentPage(1))
      } else {
        console.log('없거나 실수로 못가져왔어요..');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 내가 쓴 댓글 불러오기 (콘서트)
  const getAllMyConcertComments = async () => {
    try {
      // 로딩 상태 세팅 (내가 쓴 댓글 콘서트: false)
      dispatch(setIsLoadingState({myArticle: true , myConcertComment: false, myArticleComment: false}))
      // 내가 쓴 댓글(콘서트 게시물)
      const responseMyConcertComment = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/mycomment?pageNum=1`,
      { withCredentials: true },
    );

    dispatch(getMyConcertCommentInfo(responseMyConcertComment.data.data));
    dispatch(getMyConcertCommentTotalPage(responseMyConcertComment.data.data.totalPage));
    dispatch(getMyTotalConcertComment(responseMyConcertComment.data.data.totalConcertComment));
    // 로딩 상태 세팅 (내가 쓴 댓글 콘서트: true)
    dispatch(setIsLoadingState({myArticle: true , myConcertComment: true, myArticleComment: false}))
    // 전체 페이지가 0이 아니라면, 항상 마이페이지에 진입했을 때 내가 쓴 댓글의 현재페이지는 1이다
    if(responseMyConcertComment.data.data.totalPage !== 0) dispatch(getMyConcertCommentCurrentPage(1))
    } catch(err) {
      console.log('------:', err)
    }
  }

  // 내가 쓴 댓글 불러오기 (콘친)
  const getAllMyArticleComments = async () => {
    try {
      // 로딩 상태 세팅 (내가 쓴 댓글 콘친: false)
      dispatch(setIsLoadingState({myArticle: true , myConcertComment: true, myArticleComment: false}))

      const responseMyArticleComment = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/mycomment?pageNum=1&comment_type=article`,
      { withCredentials: true },
    );

    dispatch(getMyArticleCommentInfo(responseMyArticleComment.data.data));
    dispatch(getMyArticleCommentTotalPage(responseMyArticleComment.data.data.totalPage));
    dispatch(getMyTotalArticleComment(responseMyArticleComment.data.data.totalArticleComment));
    // 로딩 상태 세팅 (내가 쓴 댓글 콘친: true)
    dispatch(setIsLoadingState({myArticle: true , myConcertComment: true, myArticleComment: true}))
    // 전체 페이지가 0이 아니라면, 항상 마이페이지에 진입했을 때 내가 쓴 댓글의 현재페이지는 1이다
    if(responseMyArticleComment.data.data.totalPage !== 0) dispatch(getMyArticleCommentCurrentPage(1))
    } catch(err) {
      console.log('------:', err)
    }
  }

  // 내가 쓴 게시글 
  useEffect(() => {
    getAllMyArticles();
  }, [])

  // 내가 쓴 댓글
  useEffect(() => {
    getAllMyConcertComments();
    getAllMyArticleComments();
  }, [])

  // 버튼들 초기화
  useEffect(() => {
    // 내가 쓴 댓글 버튼 "콘서트"로 초기화
    dispatch(getCommentBtnType('콘서트'));
    // 프로필 수정 / 콘친인증 버튼 SWITCH OFF
    dispatch(getBtnSwitchState({
      profileEdit: false,
      conchinCertification: false,
      userResign: false
    }))
  }, [])

  return (
    <div id='myPageContainer' >
      <div id='myProfileBoxWrapper'>
        {/* 프로필 */}
        <MyProfileBox />
      </div>
      <div id='myArticleBoxWrapper'>
        {/* 나의 게시물 */}
        <MyArticleBox />
      </div>
      <div id='myCommentWrapper'>
        {/* 나의 댓글 */}
        <MyCommentBox />
      </div>
      <div id='fullFooter'>
        <div id='footerWrapper'>
          {/* 푸터 */}
          <Footer />
        </div>
      </div>
    </div>

  );
}
export default MyPage;
