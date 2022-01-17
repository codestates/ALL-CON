/* Config import */
import MyProfileResignMembershipModal from '../Modals/MyPage/MyProfileResignMembershipModal';
import MyProfileImageModal from '../Modals/MyPage/MyProfileImageModal';
/* CSS import */
import profileImage from '../../images/taeyang.png';
import camera from '../../images/camera.png';
import kakao from '../../images/kakaoOAuth.png';
import google from '../../images/googleOAuth.png';
import shield from '../../images/shield.png';
/* Store import */
import { RootState } from '../../index';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getUserInfo, getYearList, getMonthList, getDateList } from '../../store/AuthSlice';
import { setMyIntroductionState, getMyIntroduction } from '../../store/MySlice';
/* Library import */

function MyProfileBox() {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  /* useSelector */
  const { userInfo, yearList, monthList, dateList } = useSelector((state: RootState) => state.auth);
  const { myIntroductionState, myIntroduction } = useSelector((state: RootState) => state.my);
  
  /* 지역상태 - useState */
  // 프로필 수정 버튼 모니터링 상태
  const [profileChangeBtn, setProfileChangeBtn] = useState<boolean>(false)
  // 프로필 수정 모달 상태
  const [profileEdit, setProfileEdit] = useState<boolean>(false)
  // 회원탈퇴 모달 상태
  const [resignMembership, setResignMembership] = useState<boolean>(false)

  /* useEffect */
  
  /* handler 함수 (기능별 정렬) */

  // 프로필 이미지 수정 버튼 (카메라 사진)
  const handleProfileImageEdit = async () => {
    setProfileEdit(true)
  }

  // 프로필 수정 버튼
  const handleProfileEdit = async () => {
    console.log('프로필 수정 버튼을 클릭하셨습니다!')

    // 프로필 수정 버튼 클릭 상태 갱신
    setProfileChangeBtn(true)
    dispatch(setMyIntroductionState(true))
    navigate('/myEdit')
  }

  // 콘친 인증 버튼
  const handleConchinCertificate = async () => {
    // (생년월일) 년 계산
    if(yearList.length === 0) {
      let year = 1920;
      let localYearList = []

      while(year < 2023) {
        localYearList.push(year + '년')
        year++
      }

      await dispatch(getYearList(localYearList))
    }

     // (생년월일) 월 계산
    if(monthList.length === 0) {
      let month = 1;
      let localMonthList = []
      
      while(month < 13) {
        localMonthList.push(month + '월')
        month++
      }

      await dispatch(getMonthList(localMonthList))
    }

    // (생년월일) 일 계산
    if(dateList.length === 0) {
      let date = 1;
      let localDateList = []
      
      while(date < 32 && dateList.length < 10) {
        localDateList.push(date + '일')
        date++
      }
      
      await dispatch(getDateList(localDateList))
    }
    // 자기소개 상태값 업데이트 (false)
    dispatch(setMyIntroductionState(false))
    // 콘친 인증 페이지로 이동!
    navigate('/conchinCert')
  }

  // 프로필 수정 변경안함 버튼
  const handleProfileEditBackground = async () => {
    setProfileEdit(false)
  }

  // 회원탈퇴 버튼
  const handleAccountDelete = async () => {
    setResignMembership(true)
  }

  // 회원탈퇴취소 클릭
  const handleAccountDeleteBackground = async () => {
    setResignMembership(false)
  }

  const inputIntroduction = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    dispatch(getMyIntroduction(e.target.value))
  }

  return (
    <div id='myProfileBox'>
      {/* 회원탈퇴 모달 */}
      { resignMembership ? <MyProfileResignMembershipModal handleAccountDeleteBackground={handleAccountDeleteBackground}/> : null}
      { profileEdit ? <MyProfileImageModal handleProfileEditBackground={handleProfileEditBackground}/> : null}
      <div id='imgBox'>
        <div id='imgWrapper'>
          <img className='img' src={`${userInfo.image}`} alt='profileImage' />
        </div>
        <div id='cameraWrapper'>
          <img className='camera' src={camera} alt='camera' onClick={() => {handleProfileImageEdit()}} />
        </div>
      </div>
      <div id='introductionBox'>
        <div id='nickNameWrapper'>
          <div id='oauthWrapper'>
            {/* OAuth 상태에 따른 아이콘 표시 */}
            {
              userInfo.sign_method === 'allcon'
              ? null
              : <img className='oauth' src={`${userInfo.sign_method}` === 'google' ? google : kakao } alt='google' />
            }
          </div>
          {/* 유저네임 (username) */}
          <p className='nickName'> {`${userInfo.username}`} </p>
          <div id='shieldWrapper'>
            {/* 콘친 인증 상태에 따른 아이콘 표시 (방패 아이콘) */}
            {
              userInfo.role === 3
              ? null
              : <img className='shield' src={shield} alt='shield' />
            }
          </div>
        </div>
        {/* 자기소개, 주의! null일 때 처리해줘야됨! */}
        <div id='textWrapper'>
          {
            myIntroductionState
            ? <textarea id='introduction' placeholder={userInfo.introduction} onChange={inputIntroduction}></textarea>
            : <div id='introduction'>{userInfo.introduction}</div> 
          }
        </div>
        <div id='modifyBtnWrapper'>
          <button className='btn' onClick={() => {handleProfileEdit()}}>프로필 수정</button>
          <button className='btn' onClick={() => {handleConchinCertificate()}}>콘친 인증</button>
        </div>
        <div id='resignBtnWrapper'>
          <button className='btn' onClick={() => {handleAccountDelete()}}>회원 탈퇴</button>
        </div>
      </div>
    </div>
  );
}

export default MyProfileBox;