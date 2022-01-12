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
import React, { useState, useEffect } from 'react';
/* Library import */

function MyProfileBox() {

  /* dispatch / navigate */
  /* useSelector */
  /* 지역상태 - useState */

  /* useEffect */
  // 프로필 수정 모달 상태
  const [profileEdit, setProfileEdit] = useState<boolean>(false)
  // 회원탈퇴 모달 상태
  const [resignMembership, setResignMembership] = useState<boolean>(false)
  /* handler 함수 (기능별 정렬) */

  // 프로필 수정 변경 버튼
  const handleProfileEdit = async () => {
    console.log('프로필 수정 버튼을 클릭하셨습니다!')
    setProfileEdit(true)
  }

  // 프로필 수정 변경안함 버튼
  const handleProfileEditBackground = async () => {
    console.log('프로필 수정 변경안함을 클릭하셨습니다!')
    setProfileEdit(false)
  }

  // 회원탈퇴 버튼
  const handleAccountDelete = async () => {
    console.log('회원탈퇴 버튼을 클릭하셨습니다!')
    setResignMembership(true)
  }

  // 회원탈퇴취소 클릭
  const handleAccountDeleteBackground = async () => {
    console.log('Background를 클릭하셨습니다!')
    setResignMembership(false)
  }

  return (
    <div id='myProfileBox'>
      {/* 회원탈퇴 모달 */}
      { resignMembership ? <MyProfileResignMembershipModal handleAccountDeleteBackground={handleAccountDeleteBackground}/> : null}
      { profileEdit ? <MyProfileImageModal handleProfileEditBackground={handleProfileEditBackground}/> : null}
      <div id='imgBox'>
        <div id='imgWrapper'>
          <img className='img' src={profileImage} alt='profileImage' />
        </div>
        <div id='cameraWrapper'>
          <img className='camera' src={camera} alt='camera' />
        </div>
      </div>
      <div id='introductionBox'>
        <div id='nickNameWrapper'>
          <div id='oauthWrapper'>
            {/* OAuth 상태에 따른 아이콘 표시 */}
            <img className='oauth' src={google} alt='google' />
          </div>
          <p className='nickName'>유태양발닦개</p>
          <div id='shieldWrapper'>
            {/* 콘친 인증 상태에 따른 아이콘 표시 */}
            <img className='shield' src={shield} alt='shield' />
          </div>
        </div>
        <div id='textWrapper'>
          <textarea id='introduction'>
            유태양 찐팬 경기/30/누구든 콘친 ㄱㄱ
          </textarea>
        </div>
        <div id='modifyBtnWrapper'>
          <button className='btn' onClick={() => {handleProfileEdit()}}>프로필 수정</button>
          <button className='btn'>콘친 인증</button>
        </div>
        <div id='resignBtnWrapper'>
          <button className='btn' onClick={() => {handleAccountDelete()}}>회원 탈퇴</button>
        </div>
      </div>
    </div>
  );
}

export default MyProfileBox;
