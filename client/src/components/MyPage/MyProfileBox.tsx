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
/* Library import */

function MyProfileBox() {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  /* 지역상태 - useState */

  /* useEffect */
  // 프로필 수정 모달 상태
  const [profileEdit, setProfileEdit] = useState<boolean>(false)
  // 회원탈퇴 모달 상태
  const [resignMembership, setResignMembership] = useState<boolean>(false)

  /* handler 함수 (기능별 정렬) */

  // 프로필 이미지 수정 버튼 (카메라 사진)
  const handleProfileImageEdit = async () => {
    setProfileEdit(true)
  }

  // 프로필 수정 버튼
  const handleProfileEdit = async () => {
    console.log('프로필 수정 버튼을 클릭하셨습니다!')
    navigate('/myEdit')
  }

  // 콘친 인증 버튼
  const handleConchinCertificate = async () => {
    console.log('콘친 인증 버튼을 클릭하셨습니다!')
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
          <textarea id='introduction'>
            { `${userInfo.introduction}` === undefined ? '' : `${userInfo.introduction}` }
          </textarea>
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