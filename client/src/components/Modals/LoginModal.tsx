/* CSS import */
import google from '../../images/googleOAuth.png';
import kakao from '../../images/kakaoOAuth.png';
import originalLock from '../../images/originalPadlock.png';
import xButton from '../../images/xButton.png';
/* Store import */
import {
  setTarget,
  setTargetIdx,
  setOrder,
  setIsRendering,
} from '../../store/MainSlice';
import { setPageNum } from '../../store/ConcertCommentSlice';
import { login, loginCheck, getUserInfo } from '../../store/AuthSlice';
import {
  showLoginModal,
  showSignupModal,
  showFindPasswordModal,
  showConcertModal,
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

  /* 로그인 후 홈화면 리다이렉트 핸들러 */
  const goHomeHandler = () => {
    /* 메인페이지 상태 초기화 */
    dispatch(setTarget({}));
    dispatch(setTargetIdx(0));
    dispatch(setOrder('view'));
    dispatch(setPageNum(1));
    dispatch(setIsRendering(false));
    /* 켜져있는 모달창 모두 종료 */
    dispatch(showConcertModal(false)); // concertPage 모달창
    dispatch(showLoginModal(false));
    /* 홈으로 이동 */
    navigate('/main');
  };

  /* 로그인 핸들러 */
  const loginHandler = async () => {
    try {
      /* response 변수에 /login 서버 응답결과를 담는다 */
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { email: inputEmail, password: inputPassword },
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유저 정보가 담겨있다면 로그인 성공*/
      if (response.data.data) {
        /* 로그인 & 유저 상태 변경 후 메인페이지 리다이렉트 */
        dispatch(getUserInfo(response.data.data.userInfo));
        dispatch(login());
        dispatch(loginCheck(true));
      }
      goHomeHandler();
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400)
        dispatch(insertAlertText('빈칸을 모두 입력해주세요! 😖'));
      else if (error.response?.status === 401)
        dispatch(insertAlertText('잘못된 비밀번호입니다! 😖'));
      else if (error.response?.status === 403)
        dispatch(insertAlertText('존재하지 않는 이메일입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  /* 소셜 로그인 핸들러 */
  const oauthLoginHandler = (oauth: string) => {
    /* Google OAuth */
    if (oauth === 'google') {
      const url = `${process.env.REACT_APP_CLIENT_URL}/callbackGoogle`;
      window.location.assign(
        `https://accounts.google.com/o/oauth2/auth?client_id=705123265700-pch2mtv4r94rfr4b61l3g65efbn2et2a.apps.googleusercontent.com&redirect_uri=${url}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid`,
      );
      /* Kakao OAuth */
    } else if (oauth === 'kakao') {
      const url = `${process.env.REACT_APP_CLIENT_URL}/callbackKakao`;
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
