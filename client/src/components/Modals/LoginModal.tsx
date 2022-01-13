/* Config import */
import { REACT_APP_API_URL, REACT_APP_CLIENT_URL } from '../../config.js';
/* CSS import */
import google from '../../images/googleOAuth.png';
import kakao from '../../images/kakaoOAuth.png';
import originalLock from '../../images/originalPadlock.png';
import xButton from '../../images/xButton.png';
/* Store import */
import { login, getUserInfo } from '../../store/AuthSlice';
import {
  showLoginModal,
  showSignupModal,
  showFindPasswordModal,
  showAlertModal,
  insertAlertText,
} from '../../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LoginModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* 인풋 정보 상태 */
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');

  /* 로그인 핸들러 */
  const loginHandler = async () => {
    try {
      /* response 변수에 /login 서버 응답결과를 담는다 */
      const response = await axios.post(
        `${REACT_APP_API_URL}/login`,
        { email: inputEmail, password: inputPassword },
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유저 정보가 담겨있다면 로그인 성공*/
      if (response.data.data) {
        /* 유효성 & 로그인 & 유저 상태 변경 후 메인페이지 리다이렉트 */
        dispatch(login());
        dispatch(getUserInfo(response.data.data));
        dispatch(showLoginModal(false));
        navigate('/main');
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400)
        dispatch(insertAlertText('빈칸을 모두 입력해주세요! 😖'));
      else if (error.response?.status === 403)
        dispatch(insertAlertText('잘못된 이메일 혹은 비밀번호입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  /* 소셜 로그인 핸들러 */
  const oauthLoginHandler = (oauth: string) => {
    /* Google OAuth */
    if (oauth === 'google') {
      const url = `${REACT_APP_CLIENT_URL}/callbackGoogle`;
      window.location.assign(
        `https://accounts.google.com/o/oauth2/auth?client_id=705123265700-pch2mtv4r94rfr4b61l3g65efbn2et2a.apps.googleusercontent.com&redirect_uri=${url}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid`,
      );
      /* Kakao OAuth */
    } else if (oauth === 'kakao') {
      const url = `${REACT_APP_CLIENT_URL}/callbackKakao`;
      window.location.assign(
        `https://kauth.kakao.com/oauth/authorize?client_id=63851fd0da93b09688f7c4c7e4b1ec20&redirect_uri=${url}&response_type=code&scope=profile_nickname,profile_image,account_email`,
      );
    }
    /* LoginModal 종료 */
    dispatch(showLoginModal(false));
  };

  /* 인풋 체인지 핸들러 */
  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };

  return (
    <div id='loginModalContainer'>
      <div id='outside' onClick={() => dispatch(showLoginModal(false))} />
      <div id='background'>
        <div id='loginModal'>
          <div id='xButtonContainer'>
            <img
              alt='xButtonImg'
              src={xButton}
              onClick={() => dispatch(showLoginModal(false))}
            />
          </div>
          <div id='alignContainer'>
            <div id='topBox'>
              <h2>로그인</h2>
              <div id='goSignUp'>
                <h3 id='no1' className='fontMatch'>
                  아직 회원이 아니신가요?
                </h3>
                <u
                  id='no2'
                  className='fontMatch'
                  onClick={() => {
                    dispatch(showLoginModal(false));
                    dispatch(showSignupModal(true));
                  }}
                >
                  회원가입 하기
                </u>
              </div>
            </div>
            <div id='midBox'>
              <p className='fontMatch'>이 메 일</p>
              <input
                type='text'
                className='textBoxMatch2'
                value={inputEmail}
                onChange={emailChangeHandler}
              />
              <p className='fontMatch'>비밀번호</p>
              <input
                type='password'
                className='textBoxMatch2'
                value={inputPassword}
                onChange={passwordChangeHandler}
              />
            </div>
            <div id='bottomBox'>
              <button
                className='fontMatch textBoxMatch3'
                id='loginBtn'
                onClick={loginHandler}
              >
                로그인
              </button>
              <button
                className='fontMatch textBoxMatch3'
                id='goGoogle'
                onClick={() => oauthLoginHandler('google')}
              >
                <img alt='아이콘' src={google}></img>
                <div className='outerBox'>
                  <p>구글로 로그인</p>
                </div>
              </button>
              <button
                className='fontMatch textBoxMatch3'
                id='goKakao'
                onClick={() => oauthLoginHandler('kakao')}
              >
                <img alt='아이콘' src={kakao}></img>
                <div className='outerBox'>
                  <p>카카오톡으로 로그인</p>
                </div>
              </button>
              <div id='lockBox'>
                <img id='lock' src={originalLock} alt='자물쇠 아이콘'></img>
                <p
                  id='findPassword'
                  onClick={() => {
                    dispatch(showFindPasswordModal(true));
                  }}
                >
                  비밀번호 찾기
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
