import MyProfileBox from '../components/MyPage/MyProfileBox';
import MyArticleBox from '../components/MyPage/MyArticleBox';
import MyCommentBox from '../components/MyPage/MyCommentBox';
import Footer from '../components/Footer';

/* Store import */
import { RootState } from '../index';
import { logout, getUserInfo } from '../store/AuthSlice';
import { showLoginModal, showPrivacyModal, showSignupModal, showTosModal, showAlertModal, insertAlertText } from '../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function MyPage() {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { myConcertCommentCurrentPage } = useSelector((state: RootState) => state.my);
  
  return (
    <div id='myPageContainer'>
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
