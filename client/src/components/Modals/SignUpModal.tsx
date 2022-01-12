/* Config import */
import { REACT_APP_API_URL } from '../../config.js'
/* CSS import */
import redLock from '../../images/falsyPadlock.png';
/* Store import */
import { showLoginModal, showPrivacyModal, showSignupModal, showTosModal } from '../../store/ModalSlice';
/* Library import */
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function SignUpModal() {
  const dispatch = useDispatch();

  /* 입력 개인정보 상태 */
  interface SignupInfo {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const { email, username, password, confirmPassword }: SignupInfo = signupInfo;

  /* 체크박스 상태 */
  const [tosCheck, setTosCheck] = useState<boolean>(false);
  const [privacyCheck, setPrivacyCheck] = useState<boolean>(false);

  /* 유효성 검사 상태 */
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<boolean>(false);

  /* 이메일 에러 핸들러 */
  const emailErrCheck = (email: string): boolean => {
    const emailExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (email === ''){
      setEmailErr(false);
      return false;
    }
    if (!emailExp.test(email)){
      setEmailErr(true);
      return false;
    }
    setEmailErr(false);
    return true;
  };

  /* 유저네임 에러 핸들러 */
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

  /* 비밀번호 에러 핸들러 */
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

  /* 비밀번호 확인 에러 핸들러 */
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

  /* 인풋 입력 핸들러 */
  const inputValueHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const info = { ...signupInfo, [key]: e.target.value };
    setSignupInfo(info);
    isAllValid(info);
  };
  
  /*입력값 유효성 검사 핸들러*/
  const isAllValid = (signupInfo: SignupInfo): boolean => {
    const { email, username, password, confirmPassword } = signupInfo;

    const isEmailValid = emailErrCheck(email);
    const isNameValid = nameErrCheck(username);
    const isPasswordValid = passwordErrCheck(password);
    const isConfirmPasswordValid = confirmPasswordErrCheck(password, confirmPassword);

    return isEmailValid && isNameValid && isPasswordValid && isConfirmPasswordValid ? true : false;
  };

  /*입력값 초기화 핸들러*/
  const resetInput = () => {
    setSignupInfo({
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
    setEmailErr(false);
    setNameErr(false);
    setPasswordErr(false);
    setConfirmPasswordErr(false);
  };

  /* 회원가입 핸들러 */
  const signupHandler = async () => {
    try {
      if (isAllValid(signupInfo)) {
        if(tosCheck && privacyCheck){
          await axios.post(
            `${REACT_APP_API_URL}/signup`,
            { email, username, password, confirmPassword },
            { withCredentials: true }
          );
          resetInput();
          alert('ALL-CON\n회원가입에 성공하였습니다! 🙂');
          dispatch(showLoginModal(true));
          dispatch(showSignupModal(false));
        } else{
          alert('ALL-CON\n약관에 동의해주세요! 😖');
        }
      } else {
        alert('ALL-CON\n빈칸을 모두 작성해주세요! 😖');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='signUpModalContainer'>
      <div id='outside' onClick={() => dispatch(showSignupModal(false))}/>
      <div id='background'>
        <div id='signUpModal'>
          <div id='alignContainer'>
            <div id='topBox'>
              <h2>회원가입</h2>
              <div id='goSignUp'>
                <h3 id='no1' className='fontMatch'>
                  이미 회원이신가요?
                </h3>
                <u id='no2' className='fontMatch' onClick={() => {
                  dispatch(showSignupModal(false));
                  dispatch(showLoginModal(true));
                }}>
                  로그인 하기
                </u>
              </div>
            </div>
            <div id='midBox'>
            {/* 인풋 박스 */}
            <p className='fontMatch'>이 메 일</p>
              <div className='outerTextBox'>
                <input type='text' className='textBoxMatch2' value={signupInfo.email} onChange={inputValueHandler('email')}/>
              </div>
              <div className={emailErr ? 'warningMsg' : 'hidden'}>잘못된 이메일 형식입니다.</div>

              <p className='fontMatch'>닉 네 임</p>
              <div className='outerTextBox'>
                <input type='text' className='textBoxMatch2' value={signupInfo.username} onChange={inputValueHandler('username')}/>
                <button>중복확인</button>
              </div>
              <div className={nameErr ? 'warningMsg' : 'hidden'}>닉네임은 한글, 영문, 숫자만 가능하며 2-10자리로 입력해야 합니다.</div>

              <p className='fontMatch'>비밀번호</p>
              <div className='outerTextBox'>
                <input type='password' className='textBoxMatch2' value={signupInfo.password} onChange={inputValueHandler('password')}/>
                <div id='no1'>
                  <img src={redLock} alt='redLockImg' className={passwordErr ? 'Img' : 'hidden'} />
                </div>
              </div>
              <div className={passwordErr ? 'warningMsg' : 'hidden'}>비밀번호는 영문, 숫자만 가능하며 6~12자리로 입력해야 합니다.</div>

              <p className='fontMatch'>비밀번호 확인</p>
              <div className='outerTextBox'>
              <input type='password' className='textBoxMatch2' value={signupInfo.confirmPassword} onChange={inputValueHandler('confirmPassword')}/>
                <div id='no2'>
                <img src={redLock} alt='redLockImg' className={confirmPasswordErr ? 'Img' : 'hidden'} />
                </div>
              </div>
              <div className={confirmPasswordErr ? 'warningMsg' : 'hidden'}>두 비밀번호가 일치하지 않습니다.</div>
            </div>

            <div id='bottomBox'>
              <div id='agreeBox'>
                <div className='checkBox agreeAll'>
                  <input type='checkbox'/>
                  <p>전체동의</p>
                </div>
                <div className='checkBox agreeSub'>
                  <input type='checkbox' onClick={()=>{setTosCheck(!tosCheck)}}/>
                  <p onClick={() => dispatch(showTosModal(true))}>[필수] ALL-CON 이용 약관 동의</p>
                </div>
                <div className='checkBox agreeSub'>
                  <input type='checkbox'onClick={()=>{setPrivacyCheck(!privacyCheck)}}/>
                  <p onClick={() => dispatch(showPrivacyModal(true))}>[필수] 개인정보 수집/이용/취급 위탁 동의</p>
                </div>
              </div>
              <div id='buttons'>
                <button className='fontMatch textBoxMatch3' id='signUpBtn' onClick={signupHandler}>
                  가입하기
                </button>
                <button className='fontMatch textBoxMatch3' id='exitBtn' onClick={() => {
                  dispatch(showSignupModal(false));
                  dispatch(showLoginModal(true));
                }}>
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpModal;
