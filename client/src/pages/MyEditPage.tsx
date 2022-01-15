/* Config import */
import { REACT_APP_API_URL, REACT_APP_DEFAULTUSERIMAGE_URL, REACT_APP_IMAGE_URL  } from '../config'
import MyProfileBox from '../components/MyPage/MyProfileBox';
import Footer from '../components/Footer';
/* CSS import */
import profileImage from '../../../images/taeyang.png';
import camera from '../../../images/camera.png';
/* Store import */
import { RootState } from '../index';
import { logout, getUserInfo } from '../store/AuthSlice';
import { showLoginModal, showPrivacyModal, showSignupModal, showTosModal, showAlertModal, insertAlertText } from '../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function MyEditPage() {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  
  /* 지역상태 - useState */

  // 변경할 유저정보 상태 
  interface ChangeUserInfo {
    // introduction: string;
    username: string;
    password: string;
    confirmPassword: string;
  }

  // 주의: 초기값을 바꿔줘야한다!
  const [changeUserInfo, setChangeUserInfo] = useState<ChangeUserInfo>({
    // introduction: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const { username, password, confirmPassword }: ChangeUserInfo = changeUserInfo;

   // 닉네임 중복값 검사 상태
   const [duplicationCheck, setDuplicationCheck] = useState<boolean>(true);
   const [isCheckDuplication, setIsCheckDuplication] = useState<boolean>(false);

   // 유효성 검사 상태
   const [nameErr, setNameErr] = useState<boolean>(false);
   const [passwordErr, setPasswordErr] = useState<boolean>(false);
   const [confirmPasswordErr, setConfirmPasswordErr] = useState<boolean>(false);
   
   // 로그인 유형에 따른 비밀번호 변경 및 비밀번호 확인 
   const [activationPassword, setActivationPasswrd] = useState<boolean>(true); 

  /* useEffect */
  // user가 oauth로 로그인 했으면 비밀번호 변경, 비밀번호 확인란은 막는다
  useEffect(() => {
    // allcon으로 회원가입을 하지 않았다면,
    if(userInfo.sign_method !== 'allcon') {
      setActivationPasswrd(false);
    }
  }, [])

  /* handler 함수 (기능별 정렬) */

  // 인풋 입력 핸들러
  const inputValueHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {

    console.log('--- 인풋 입력 핸들러 확인! ---', e.target.value)
    const info = { ...changeUserInfo, [key]: e.target.value };
    setChangeUserInfo(info);
    isAllValid(info);
  };

  // 입력값 유효성 검사 핸들러
  const isAllValid = (changeUserInfo: ChangeUserInfo): boolean => {
    const { username, password, confirmPassword } = changeUserInfo;
    // allcon으로 회원가입한 경우, 닉네임, 비밀번호 변경, 비밀번호 확인을 check
    if(userInfo.sign_method === 'allcon') {
      const isNameValid = nameErrCheck(username);
      const isPasswordValid = passwordErrCheck(password);
      const isConfirmPasswordValid = confirmPasswordErrCheck(password, confirmPassword);

      return isNameValid && isPasswordValid && isConfirmPasswordValid ? true : false;
    } 
    // 구글 혹은 카카오톡으로 로그인 한 경우, 다음을 실행한다
    else {
      const isNameValid = nameErrCheck(username);
      return isNameValid  ? true : false;
    }
  };

  // 입력값 초기화 핸들러
  const resetInput = () => {
    setChangeUserInfo({
      username: '',
      password: '',
      confirmPassword: ''
    });
    setDuplicationCheck(true);
    setIsCheckDuplication(false);
    setNameErr(false);
    setPasswordErr(false);
    setConfirmPasswordErr(false);
  };

  // 유저네임 에러 핸들러
  const nameErrCheck = (username: string): boolean => {
    const usernameExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
    if (username === ''){
      setNameErr(false);
      return false;
    }
    if (!usernameExp.test(username)){
      setNameErr(true);
      return false;
    }
    setNameErr(false);
    return true;
  };

  // 비밀번호 에러 핸들러
  const passwordErrCheck = (password: string): boolean => {
    const passwordExp = /^[a-zA-z0-9]{6,12}$/;
    if (password === '') {
      setPasswordErr(false);
      return false;
    }
    if (!passwordExp.test(password)) {
      setPasswordErr(true);
      return false;
    }
    setPasswordErr(false);
    return true;
  };

  // 비밀번호 확인 에러 핸들러
  const confirmPasswordErrCheck = (password: string, confirmPassword: string): boolean => {
    if (password === '') {
      setConfirmPasswordErr(false);
      return false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErr(true);
      return false;
    }
    setConfirmPasswordErr(false);
    return true;
  };

  // 닉네임 중복확인 핸들러
  const duplicationHandler = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/username`,
        { username },
        { withCredentials: true }
      );
      console.log(response.data.state)
      setIsCheckDuplication(true);
      setDuplicationCheck(response.data.state);
      // 중복되지 않은 닉네임이라면, 다음을 실행한다
      if(response.data.state) {
        dispatch(insertAlertText(`사용가능한 닉네임입니다! 🙂`));
        dispatch(showAlertModal(true));
      }
      // 중복된 닉네임이라면, 다음을 실행한다
      else {
        dispatch(insertAlertText(`이미 사용중인 닉네임입니다! 🙂`));
        dispatch(showAlertModal(true));
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 중복확인 엔터... (주의! 좀더 좋은 방법이 있을꺼야!)
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') duplicationHandler()
  }

  // [PATCH] 변경 완료 버튼 핸들러
  const changeUserProfileHandler = async () => {
    try {
      // 만약 변경된 유저의 정보가 모두 유효하다면, 다음을 실행한다
      if (isAllValid(changeUserInfo)) {
          if(isCheckDuplication && duplicationCheck){
            const response = await axios.patch(
              `${REACT_APP_API_URL}/user/me`,
              { 
                // introduction,
                username: username, 
                password: password 
              },
              { withCredentials: true }
            );
            // 입력값들을 reset
            resetInput();
            dispatch(insertAlertText(`(${userInfo.username})님의 프로필이 변경되었습니다! 🙂`));
            dispatch(showAlertModal(true));
            // userInfo 상태 업데이트
            dispatch(getUserInfo(response.data.data));
            navigate('/mypage')
          } else {
            dispatch(insertAlertText('닉네임 중복확인을 해주세요! 😖'));
            dispatch(showAlertModal(true));
          }
        }
        else {
        dispatch(insertAlertText('빈칸을 모두 알맞게 작성해주세요! 😖'));
        dispatch(showAlertModal(true));
      }
    } catch (err) {
      const error = err as AxiosError;
      if(error.response?.status===400) dispatch(insertAlertText('잘못된 요청입니다! 😖'));
      else if(error.response?.status===409) dispatch(insertAlertText('이미 존재하는 이메일입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  // 취소 버튼 핸들러
  const handleCloseBtn = async () => {
    console.log('취소 버튼 확인!')
    navigate('/mypage')
  }

  return (
    <div id='myEditPage'>
      <div id='profileBoxWrapper'>
        {/* 프로필 */}
        <MyProfileBox />
      </div>
      <div id='userInfoWrapper'>
        {/* 유저 정보 */}
        <div id='userInfoBox'>
          <div id='emailWrapper'>
            <div id='titleWrapper'>
              <p className='title'>이메일</p>
            </div>
            {/* 유저 이메일 */}
            <div id='email'> {`${userInfo.email}`} </div>
          </div>
          <div id='nickNameWrapper'>
            <div id='titleWrapper'>
              <p className='title'>닉네임</p>
            </div>
            <div id='nickNameBox'>
              <input type='text' id='nickName' value={changeUserInfo.username} onChange={inputValueHandler('username')} onKeyPress={onKeyPress}/>
              <div>
                <button onClick={duplicationHandler}> 중복확인 </button>
              </div>
            </div>
          </div>
          <div id='resetBox'>
            <div id='titleWrapper'>
              <p className='title'>비밀번호 변경</p>
            </div>
            {
              activationPassword
              ? <input type='password' className='reset' value={changeUserInfo.password} onChange={inputValueHandler('password')} />
              : <input type='password' className='reset' placeholder='비밀번호 변경 구글 확인' disabled />
            }
          </div>
          <div id='confirmBox'>
            <div id='titleWrapper'>
              <p className='title'>비밀번호 확인</p>
            </div>
            {
              activationPassword
              ? <input type='password' className='confirm' value={changeUserInfo.confirmPassword} onChange={inputValueHandler('confirmPassword')} />
              : <input type='password' className='confirm' placeholder='비밀번호 확인 구글 확인' disabled />
            }
          </div>
          <div id='btnBox'>
            <div id='btnWrapper'>
              <button className='completeBtn' onClick={changeUserProfileHandler} >변경 완료</button>
              <button className='cancelBtn' onClick={() => {handleCloseBtn()}} >취소</button>
            </div>
          </div>
        </div>
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

export default MyEditPage;
