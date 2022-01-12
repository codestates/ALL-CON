import originalLock from '../../images/originalPadlock.png';
import google from '../../images/googleOAuth.png';
import kakao from '../../images/kakaoOAuth.png';
import { REACT_APP_CLIENT_URL } from '../../config.js'
import axios from 'axios';

function LoginModal() {
  const oauthLoginHandler = (oauth: string) => {
    if (oauth === 'google') {
      const url = `${REACT_APP_CLIENT_URL}/callbackGoogle`;
      window.location.assign(
        `https://accounts.google.com/o/oauth2/auth?client_id=705123265700-pch2mtv4r94rfr4b61l3g65efbn2et2a.apps.googleusercontent.com&redirect_uri=${url}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid`
      );
    } else if (oauth === 'kakao') {
      const url = `${REACT_APP_CLIENT_URL}/callbackKakao`;
      window.location.assign(
        `https://kauth.kakao.com/oauth/authorize?client_id=63851fd0da93b09688f7c4c7e4b1ec20&redirect_uri=${url}&response_type=code&scope=profile_nickname,profile_image,account_email`
      );
    }
  }

  return (
    <div id='loginModalContainer'>
      <div id='background'>
        <div id='loginModal'>
          <div id='alignContainer'>
            <div id='topBox'>
              <h2>로그인</h2>
              <div id='goSignUp'>
                <h3 id='no1' className='fontMatch'>
                  아직 회원이 아니신가요?
                </h3>
                <u id='no2' className='fontMatch'>
                  회원가입 하기
                </u>
              </div>
            </div>
            <div id='midBox'>
              <p className='fontMatch'>이메일</p>
              <input className='textBoxMatch2'></input>
              <p className='fontMatch'>비밀번호</p>
              <input className='textBoxMatch2'></input>
              <div id='warningMsg'>
                아이디 또는 비밀번호가 잘못 입력되었습니다.
              </div>
            </div>
            <div id='bottomBox'>
              <button className='fontMatch textBoxMatch3' id='loginBtn'>
                로그인
              </button>
              <button className='fontMatch textBoxMatch3' id='goGoogle' onClick={() => oauthLoginHandler('google')}>
                <img alt='아이콘' src={google}></img>
                <div className='outerBox'>
                  <p>구글로 로그인</p>
                </div>
              </button>
              <button className='fontMatch textBoxMatch3' id='goKakao' onClick={() => oauthLoginHandler('kakao')}>
                <img alt='아이콘' src={kakao}></img>
                <div className='outerBox'>
                  <p>카카오톡으로 로그인</p>
                </div>
              </button>
              <div id='lockBox'>
                <img id='lock' src={originalLock}></img>
                <p id='findPassword'>비밀번호 찾기</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
