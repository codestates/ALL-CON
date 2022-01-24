/* Config import */
/* CSS import */
import camera from '../../images/camera.png';
import kakao from '../../images/kakaoOAuth.png';
import google from '../../images/googleOAuth.png';
import shield from '../../images/shield.png';
/* Store import */
import { RootState } from '../../index';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getYearList, getMonthList, getDateList } from '../../store/AuthSlice';
import {
  showMyProfileImageModal,
  showMyProfileResignMembershipModal,
} from '../../store/ModalSlice';
import {
  setMyIntroductionState,
  getMyIntroduction,
  getPreviewImage,
  getBtnSwitchState,
} from '../../store/MySlice';
/* Library import */

function MyProfileBox() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* useSelector */
  const { userInfo, yearList, monthList, dateList } = useSelector(
    (state: RootState) => state.auth,
  );
  const { myIntroductionState, btnSwitchState } = useSelector(
    (state: RootState) => state.my,
  );

  /* 지역상태 - useState */
  // 프로필 수정 버튼 모니터링 상태
  const [profileChangeBtn, setProfileChangeBtn] = useState<boolean>(false);
  // 프로필 수정 모달 상태
  const [profileEdit, setProfileEdit] = useState<boolean>(false);
  // 회원탈퇴 모달 상태
  const [resignMembership, setResignMembership] = useState<boolean>(false);

  /* useEffect */

  /* handler 함수 (기능별 정렬) */

  // 프로필 수정 버튼
  const handleProfileEdit = async () => {
    dispatch(
      getBtnSwitchState({
        profileEdit: true,
        conchinCertification: false,
        userResign: false,
      }),
    );
    // 프로필 수정 버튼 클릭 상태 갱신
    setProfileChangeBtn(true);
    dispatch(setMyIntroductionState(true));
    navigate('/myEdit');
  };

  // 콘친 인증 버튼
  const handleConchinCertificate = async () => {
    dispatch(
      getBtnSwitchState({ profileEdit: false, conchinCertification: true }),
    );
    // (생년월일) 년 계산
    if (yearList.length === 0) {
      let year = 1920;
      let localYearList = [];

      while (year < 2023) {
        localYearList.push(year + '년');
        year++;
      }

      await dispatch(getYearList(localYearList));
    }

    // (생년월일) 월 계산
    if (monthList.length === 0) {
      let month = 1;
      let localMonthList = [];

      while (month < 13) {
        localMonthList.push(month + '월');
        month++;
      }

      await dispatch(getMonthList(localMonthList));
    }

    // (생년월일) 일 계산
    if (dateList.length === 0) {
      let date = 1;
      let localDateList = [];

      while (date < 32 && dateList.length < 10) {
        localDateList.push(date + '일');
        date++;
      }

      await dispatch(getDateList(localDateList));
    }
    // 자기소개 상태값 업데이트 (false)
    dispatch(setMyIntroductionState(false));
    // 콘친 인증 페이지로 이동!
    navigate('/conchinCert');
  };

  // 자기소개 글을 수정할 경우
  const inputIntroduction = async (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    dispatch(getMyIntroduction(e.target.value));
  };

  return (
    <div id='myProfileBox'>
      <div id='imgBox'>
        <div id='imgWrapper'>
          <img className='img' src={`${userInfo.image}`} alt='profileImage' />
        </div>
        {/* 프로필 변경 모달 OPEN & 카메라 아이콘 */}
        <div id='cameraWrapper'>
          {/* 콘친 인증이 되어있다면, 방패 아이콘 */}
          {userInfo.role === 2 ? (
            btnSwitchState?.profileEdit ? (
              <img
                className='camera'
                src={camera}
                onClick={() => {
                  dispatch(getPreviewImage(userInfo.image));
                  dispatch(showMyProfileImageModal(true));
                }}
              />
            ) : (
              <img className='camera' src={shield} />
            )
          ) : btnSwitchState?.profileEdit ? (
            <img
              className='camera'
              src={camera}
              onClick={() => {
                dispatch(getPreviewImage(userInfo.image));
                dispatch(showMyProfileImageModal(true));
              }}
            />
          ) : null}
        </div>
      </div>
      <div id='introductionBox'>
        <div id='nickNameWrapper'>
          <div id='oauthWrapper'>
            {/* OAuth 상태에 따른 아이콘 표시 */}
            {userInfo.sign_method === 'allcon' ? null : (
              <img
                className='oauth'
                src={`${userInfo.sign_method}` === 'google' ? google : kakao}
                alt='google'
              />
            )}
          </div>
          {/* 유저네임 (username) */}
          <p className='nickName'> {`${userInfo.username}`} </p>
          <div id='shieldWrapper'></div>
        </div>
        {/* 자기소개 */}
        <div id='textWrapper'>
          {btnSwitchState?.profileEdit ? (
            // myIntroductionState
            <textarea
              id='introduction'
              maxLength={40}
              placeholder={
                userInfo.introduction
                  ? userInfo.introduction
                  : '자기소개를 입력해주세요.'
              }
              onChange={inputIntroduction}
            ></textarea>
          ) : (
            <div id='introduction'>{userInfo.introduction}</div>
          )}
        </div>
        <div id='modifyBtnWrapper'>
          <button
            className={btnSwitchState?.profileEdit ? 'btnChosen' : 'btn'}
            onClick={() => {
              handleProfileEdit();
            }}
          >
            <b>프로필 수정</b>
          </button>
          <button
            className={
              btnSwitchState?.conchinCertification ? 'btnChosen' : 'btn'
            }
            onClick={() => {
              handleConchinCertificate();
            }}
          >
            <b>콘친 인증</b>
          </button>
        </div>
        <div id='resignBtnWrapper'>
          <button
            className='btn'
            onClick={() => {
              dispatch(showMyProfileResignMembershipModal(true));
            }}
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProfileBox;
