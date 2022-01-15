/* CSS import */
import xButton from '../../images/xWhiteButton.png';
/* Store import */
import { RootState } from '../../index';
import { showFindPasswordModal, showConfirmNumberModal, showResetPasswordModal, showAlertModal, insertAlertText } from '../../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function ConfirmNumberModal() {
  const dispatch = useDispatch();
  const { deliverText } = useSelector((state: RootState) => state.modal);
  /* 인풋 정보 상태 */
  const [inputCode, setInputCode] = useState<string>('');
  /* 타이머 상태 관리 */
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
  
  /* 인풋 체인지 핸들러 */
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  /* 인증번호 재요청 핸들러 */
  const requestHandler = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/password`,
        { email: deliverText },
        { withCredentials: true }
      );
      /* 타이머 & 코드 초기화 */
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

  /* 인증번호 확인 핸들러 */
  const confirmHandler = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/password/confirm`,
        { email_key: inputCode },
        { withCredentials: true }
      );
      /* 타이머 & 코드 초기화 */
      setMinutes(3);
      setSeconds(0);
      setInputCode('');
      /* 모달 상태 변경 */
      dispatch(showConfirmNumberModal(false));
      dispatch(showFindPasswordModal(false));
      dispatch(showResetPasswordModal(true));
    } catch(err) {
      const error = err as AxiosError;
      if(error.response?.status===400) dispatch(insertAlertText('인증번호를 입력해주세요! 😖'));
      else if(error.response?.status===403) dispatch(insertAlertText('잘못된 인증번호입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };


  return (
    <div id='confirmNumberModal'>
      <div id='bg' onClick={() => {dispatch(showConfirmNumberModal(false))}}/>
      <div id='modalBox'>
        <div id='modal'>
          <div id='titlesBox'>
            <div id='titleWrapper'>
              <p className='title'>인증번호 입력</p>
            </div>
            <div id='xButtonWrapper'>
              <img src={xButton} alt='xButtonImg' className='xButton' onClick={() => {dispatch(showConfirmNumberModal(false))}}/>
            </div>
          </div>
          <div id='exceptTitleBox'>
            <div id='subTitleWrapper'>
              <p className='subTitle'>
                {deliverText} 으로
                <br />
                6자리 인증번호가 전송되었습니다.
              </p>
            </div>
            <div id='inputWrapper'>
              <input className='input' placeholder='이메일을 확인해주세요.' value={inputCode} onChange={inputChangeHandler}/>
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

export default ConfirmNumberModal;
