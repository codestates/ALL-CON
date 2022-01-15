/* CSS import */
import defaultImage from '../../images/default_image.jpg';
import profileImage from '../../images/taeyang.png';
import groupImage from '../../images/group.png';
import articleImage from '../../images/inseong.png';
import ConChinArticleCommentBox from './ConChinArticleCommentBox';
import ConChinCommentPagination from './ConChinCommentPagination';
/* Store import */
import { RootState } from '../../index';
/* Library import */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConChinArticleContentBox() {
  const { targetArticle } = useSelector((state: RootState) => state.conChin);
  const dispatch = useDispatch();

  return (
    <>
      {targetArticle !== undefined && Object.keys(targetArticle).length > 0 ? (
        <div id='conChinArticleContentBox' key={targetArticle.id}>
          <div id='titleBox'>
            <div className='title'>
              <h1 className='text'>{targetArticle.title}</h1>
            </div>
            <div id='profileBox'>
              <img className='img' src={profileImage} />
              <p className='nickName'>유태양발닦개</p>
            </div>
          </div>
          <div id='contentBox'>
            <div id='viewBox'>
              <p className='view'>
                등록일 : {targetArticle.createdAt} | 조회수 :{' '}
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
                  src={targetArticle.image ? targetArticle.image : defaultImage}
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
