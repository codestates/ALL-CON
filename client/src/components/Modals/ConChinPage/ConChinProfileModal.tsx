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

  /* 지역상태 interface */
  interface ConChinTargetArticlesUserInfo {
    email?: string;
    username?: string;
    image?: string;
    introduction?: string;
    birth?: string;
    createdAt?: string;
    gender?: string;
  }

  /* useState => 지역상태 */
  const [conChinTargetArticlesUserInfo, setConChinTargetArticlesUserInfo] =
    useState<ConChinTargetArticlesUserInfo>({});

  /* 모달 종료 핸들러 */
  const offModal = () => {
    dispatch(showConChinProfileModal(false));
  };

  /* targetArticle 변경시 지역상태 conChinTargetArticle 변경  */
  useEffect(() => {
    setConChinTargetArticlesUserInfo(targetArticlesUserInfo);
  }, [targetArticlesUserInfo]);

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
                  conChinTargetArticlesUserInfo.image
                    ? conChinTargetArticlesUserInfo.image
                    : defaultImage
                }
                alt='profileImage'
              />
            </div>
            <div id='nickNameWrapper'>
              <p className='nickName'>
                {conChinTargetArticlesUserInfo.username}
              </p>
              <div id='shieldWrapper'>
                <img className='shield' src={shield} />
              </div>
            </div>
            <div id='createdAtWrapper'>
              <div id='date'>
                가입일 : {conChinTargetArticlesUserInfo.createdAt}
              </div>
            </div>
          </div>
          <div id='introductionBox'>
            <div id='emailWrapper'>
              <p className='title'>이메일</p>
              <span className='email'>
                {conChinTargetArticlesUserInfo.email}
              </span>
            </div>
            <div id='genderAndAgeWrapper'>
              <p className='title'>성별</p>
              <span className='gender'>
                {conChinTargetArticlesUserInfo.gender}
              </span>
              <p className='title2'>나이</p>
              <span className='age'>{conChinTargetArticlesUserInfo.birth}</span>
            </div>
            <span id='introductionTitle'>자기소개</span>
            <div id='introductionWrapper'>
              <span id='introduction'>
                <p className='text'>
                  {conChinTargetArticlesUserInfo.introduction}
                </p>
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
