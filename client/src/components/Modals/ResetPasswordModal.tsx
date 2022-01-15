/* CSS import */
import padlock from '../../images/falsyPadlock.png';
/* Store import */
import { RootState } from '../../index';
import { showFindPasswordModal, showConfirmNumberModal, showResetPasswordModal, showAlertModal, insertAlertText } from '../../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function ResetPasswordModal() {
  const dispatch = useDispatch();
  const { deliverText } = useSelector((state: RootState) => state.modal);

  /* 입력 개인정보 상태 */
  interface SignupInfo {
    password: string;
    confirmPassword: string;
  }
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    password: '',
    confirmPassword: ''
  });
  const { password, confirmPassword }: SignupInfo = signupInfo;
  /* 유효성 검사 상태 */
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<boolean>(false);

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
    const { password, confirmPassword } = signupInfo;

    const isPasswordValid = passwordErrCheck(password);
    const isConfirmPasswordValid = confirmPasswordErrCheck(password, confirmPassword);

    return isPasswordValid && isConfirmPasswordValid ? true : false;
  };

  /*입력값 초기화 핸들러*/
  const resetInput = () => {
    setSignupInfo({
      password: '',
      confirmPassword: ''
    });
    setPasswordErr(false);
    setConfirmPasswordErr(false);
  };

  /* 비밀번호 변경 핸들러 */
  const passwordHandler = async () => {
    try {
      if (isAllValid(signupInfo)) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/password/confirm`,
          { email: deliverText, newPassword: password },
          { withCredentials: true }
        );
        resetInput();
        dispatch(insertAlertText('비밀번호가 성공적으로 변경되었습니다! 🙂'));
        dispatch(showResetPasswordModal(false));
        dispatch(showAlertModal(true));
      } else {
        dispatch(insertAlertText('빈칸을 모두 알맞게 작성해주세요! 😖'));
        dispatch(showAlertModal(true));
      }
    } catch (err) {
      const error = err as AxiosError;
      if(error.response?.status===400) dispatch(insertAlertText('잘못된 요청입니다! 😖'));
      else if(error.response?.status===401) dispatch(insertAlertText('비밀번호 변경 권한이 없습니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  return (
    <div id='resetPasswordModal'>
      <div id='bg' onClick={() => dispatch(showResetPasswordModal(false))}/>
      <div id='modalBox'>
        <div id='modal'>
          <div id='titlesBox'>
            <div id='titleWrapper'>
              <p className='title'>비밀번호 재설정</p>
            </div>
            <div id='explainWrapper'>
              <p className='explain'>비밀번호를 변경해 주세요.</p>
            </div>
          </div>
          <div id='exceptTitlesBox'>
            <div id='emailWrapper'>
              <div id='titleWrapper'>
                <p className='title'>이메일</p>
              </div>
              <span className='email'>{deliverText}</span>
            </div>
            <div className='newPasswordWrapper'>
              <div id='titleWrapper'>
                <p className='title'>새 비밀번호</p>
              </div>
              <div id='inputWrapper'>
              <input type='password' className='input' value={signupInfo.password} onChange={inputValueHandler('password')}/>
                <img className={passwordErr ? 'padlock' : 'hidden'} alt='padlockImg' src={padlock} />
              </div>
              <div id='warningWrapper'>
                <div className={passwordErr ? 'warningMsg' : 'hidden'}>비밀번호는 영문, 숫자만 가능하며 6~12자리로 입력해야 합니다.</div>
              </div>
            </div>
            <div className='confirmPasswordWrapper'>
              <div id='titleWrapper'>
                <p className='title'>새 비밀번호 확인</p>
              </div>
              <div id='inputWrapper'>
              <input type='password' className='input' value={signupInfo.confirmPassword} onChange={inputValueHandler('confirmPassword')}/>
              <img className={confirmPasswordErr ? 'padlock' : 'hidden'} alt='padlockImg' src={padlock} />
              </div>
              <div id='warningWrapper'>
                <div className={confirmPasswordErr ? 'warningMsg' : 'hidden'}>두 비밀번호가 일치하지 않습니다.</div>
              </div>
            </div>
            <div className='btnWrapper'>
              <button className='resetButton' onClick={passwordHandler}>비밀번호 재설정</button>
              <button className='cancelButton' onClick={() => dispatch(showResetPasswordModal(false))}>취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResetPasswordModal;
