/* CSS import */
import articleDefaultImage from '../../images/default_image.jpg';
import defaultImage from '../../images/user.png';
import groupImage from '../../images/group.png';
import ConChinArticleCommentBox from './ConChinArticleCommentBox';
import ConChinCommentPagination from './ConChinCommentPagination';
/* Store import */
import { RootState } from '../../index';
import {
  insertAlertText,
  showConChinProfileModal,
  showAlertModal,
} from '../../store/ModalSlice';
/* Library import */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConChinArticleContentBox() {
  const dispatch = useDispatch();
  const { targetArticle, targetArticlesUserInfo } = useSelector(
    (state: RootState) => state.conChin,
  );

  /* 유저정보 보기 핸들러 */
  const showUserProfile = () => {
    console.log('실행됨?');
    dispatch(showConChinProfileModal(true));
  };

  const showAlert = () => {
    dispatch(insertAlertText('탈퇴한 사용자입니다. 😖'));
    dispatch(showAlertModal(true));
  };

  return (
    <>
      {targetArticle !== undefined && Object.keys(targetArticle).length > 0 ? (
        <div id='conChinArticleContentBox' key={targetArticle.id}>
          <div id='titleBox'>
            <div className='title'>
              <h1 className='text'>{targetArticle.title}</h1>
            </div>
            <div id='profileBox'>
              <img
                className='img'
                src={
                  targetArticlesUserInfo.image
                    ? targetArticlesUserInfo.image
                    : defaultImage
                }
                onClick={
                  Object.keys(targetArticlesUserInfo).length === 0
                    ? showAlert
                    : showUserProfile
                }
              />
              <p className='nickName'>
                {targetArticlesUserInfo.username
                  ? targetArticlesUserInfo.username
                  : '탈퇴한 사용자'}
              </p>
            </div>
          </div>
          <div id='contentBox'>
            <div id='viewBox'>
              <p className='view'>
                등록일 : {targetArticle.createdAt} | 조회수 :
                {targetArticle.view}
              </p>
            </div>
            <div id='modifyBox'>
              <p className='modifyBtn'>수정</p>
              <p className='deleteBtn'>삭제</p>
              <div id='memberBoxWrapper'>
                <div className='memberBox'>
                  <img className='icon' src={groupImage} />
                  <div className='count'>
                    {targetArticle.member_count}/{targetArticle.total_member}
                  </div>
                </div>
              </div>
            </div>
            <div id='content'>
              <div id='imgWrapper'>
                <img
                  className='img'
                  src={
                    targetArticle.image
                      ? targetArticle.image
                      : articleDefaultImage
                  }
                />
              </div>
              <p className='text'>{targetArticle.content}</p>
            </div>
            <div id='commentWrapper'>
              <ConChinArticleCommentBox />
              <div id='paginationWrapper'>
                <ConChinCommentPagination />
              </div>
            </div>
          </div>
        </div>
      ) : (
        '게시글을 선택해주세요!'
      )}
    </>
  );
}

export default ConChinArticleContentBox;
