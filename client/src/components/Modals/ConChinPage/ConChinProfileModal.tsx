/* CSS import */
import shield from '../../../images/shield.png';
import defaultImage from '../../../images/user.png';
/* Store import */
import { RootState } from '../../../index';
import { showConChinProfileModal } from '../../../store/ModalSlice';
/* Library import */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConChinProfileModal() {
  const dispatch = useDispatch();
  const { targetArticlesUserInfo } = useSelector(
    (state: RootState) => state.conChin,
  );

  /* 모달 종료 핸들러 */
  const offModal = () => {
    dispatch(showConChinProfileModal(false));
  };

  return (
    <div id='conChinProfileModal'>
      <div id='bg' onClick={offModal} />
      <div id='modalBox'>
        <div id='modal'>
          <div id='profileBox'>
            <div id='imgWrapper'>
              <img
                className='img'
                src={
                  targetArticlesUserInfo.image
                    ? targetArticlesUserInfo.image
                    : defaultImage
                }
                alt='profileImage'
              />
            </div>
            <div id='nickNameWrapper'>
              <p className='nickName'>{targetArticlesUserInfo.username}</p>
              <div id='shieldWrapper'>
                <img className='shield' src={shield} />
              </div>
            </div>
          </div>
          <div id='introductionBox'>
            <div id='emailWrapper'>
              <p className='title'>이메일</p>
              <span className='email'>{targetArticlesUserInfo.email}</span>
            </div>
            <div id='genderAndAgeWrapper'>
              <p className='title'>성별</p>
              <span className='gender'>{targetArticlesUserInfo.username}</span>
              <p className='title2'>나이</p>
              <span className='age'>{targetArticlesUserInfo.birth}</span>
            </div>
            <span id='introductionTitle'>자기소개</span>
            <div id='introductionWrapper'>
              <span id='introduction'>
                <p className='text'>{targetArticlesUserInfo.introduction}</p>
              </span>
            </div>
          </div>
          <div id='btnBox'>
            <button className='closeBtn' onClick={offModal}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConChinProfileModal;
