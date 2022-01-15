/* CSS import */
import xButton from '../../../images/xWhiteButton.png';
/* Store import */
import { RootState } from '../../../index';
import { getPhoneCertificatePassInfo } from '../../../store/AuthSlice';
import { showFindPasswordModal, showConfirmNumberModal, showPhoneConfirmNumberModal, showResetPasswordModal, showAlertModal, insertAlertText } from '../../../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function PhoneConfirmNumberModal() {
  const dispatch = useDispatch();
  const { deliverText } = useSelector((state: RootState) => state.modal);
  // 콘친 인증페이지에서 입력한 전화번호
  const { userInfo, certificateInfo, isPhoneCertificatePass } = useSelector((state: RootState) => state.auth);

  // 휴대폰 인증번호 입력란 상태 (입력란 값)
  const [inputCode, setInputCode] = useState<string>('');
  // 휴대폰 타이머 상태 관리
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    /* 3분 timer 함수 */
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);
  
  // 인풋 체인지 핸들러
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  // 휴대폰 인증번호 확인 버튼 핸들러
  const confirmHandler = async () => {
    try {
      //휴대폰 인증번호을 입력한 후 확인버튼을 클릭했을 때, 다음을 실행한다
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/safe/confirm`,
        { message_key: inputCode },
        { withCredentials: true }
      );

      // 모달 상태 변경
      dispatch(insertAlertText('인증되었습니다! 🙂'));
      dispatch(showAlertModal(true));
      dispatch(getPhoneCertificatePassInfo(true));
      // 인증 성공을 체크 이미지로 표시
      dispatch(showPhoneConfirmNumberModal(false));
      // dispatch(showResetPasswordModal(true));
    } catch(err) {
      const error = err as AxiosError;

      console.log(error.response?.status)

      if(error.response?.status === 400) dispatch(insertAlertText('인증번호를 입력해주세요! 😖'));
      else if(error.response?.status === 401) dispatch(insertAlertText('잘못된 인증번호입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  // 재전송(인증번호) 버튼 핸들러
  const requestHandler = async () => {
    try {
      console.log('--- 재전송(인증번호) 버튼 확인! ---')
      
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/safe`,
        { phone_number: certificateInfo },
        { withCredentials: true }
      );
      
      // 타이머 & 코드 초기화
      setMinutes(3);
      setSeconds(0);
      setInputCode('');

    } catch(err) {
      const error = err as AxiosError;
      if(error.response?.status===403) dispatch(insertAlertText('잘못된 이메일입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  return (
    <div id='confirmNumberModal'>
      <div id='bg' onClick={() => {dispatch(showPhoneConfirmNumberModal(false))}}/>
      <div id='modalBox'>
        <div id='modal'>
          <div id='titlesBox'>
            <div id='titleWrapper'>
              <p className='title'>인증번호 입력</p>
            </div>
            <div id='xButtonWrapper'>
              <img src={xButton} alt='xButtonImg' className='xButton' onClick={() => {dispatch(showPhoneConfirmNumberModal(false))}}/>
            </div>
          </div>
          <div id='exceptTitleBox'>
            <div id='subTitleWrapper'>
              <p className='subTitle'>
                {userInfo.username} (님)의 휴대폰으로
                <br/>
                6자리 인증번호가 전송되었습니다.
              </p>
            </div>
            <div id='inputWrapper'>
              <input type='number' className='input' placeholder='인증번호를 입력해주세요.' value={inputCode} onChange={inputChangeHandler}/>
              <p className='timer'>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
            </div>
            <div id='btnWrapper'>
              <button className='okBtn' onClick={confirmHandler}>확 인</button>
              <button className='resendBtn' onClick={requestHandler}>재전송</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneConfirmNumberModal;
