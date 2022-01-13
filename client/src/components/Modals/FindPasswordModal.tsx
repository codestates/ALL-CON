/* Config import */
import { REACT_APP_API_URL } from '../../config.js'
/* Store import */
import { showFindPasswordModal, showConfirmNumberModal, insertAlertText, showAlertModal, insertDeliverText } from '../../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function FindPasswordModal() {
  const dispatch = useDispatch();

  /* 인풋 정보 상태 */
  const [inputEmail, setInputEmail] = useState<string>('');
  /* 인풋 체인지 핸들러 */
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  /* 인증번호 요청 핸들러 */
  const requestHandler = async () => {
    try {
      await axios.post(
        `${REACT_APP_API_URL}/password`,
        { email: inputEmail },
        { withCredentials: true }
      );
      /* 이메일 정보 상태 & 모달 상태 변경 */
      dispatch(insertDeliverText(inputEmail));
      dispatch(showConfirmNumberModal(true));
    } catch(err) {
      const error = err as AxiosError;
      if(error.response?.status===403) dispatch(insertAlertText('잘못된 이메일입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  return (
    <div id='findPasswordModal'>
      <div id='bg' onClick={() => dispatch(showFindPasswordModal(false))}/>
      <div id='modalBox'>
        <div id='modal'>
          <div id='titlesBox'>
            <div id='titleWrapper'>
              <p className='title'>비밀번호 찾기</p>
            </div>
            <div id='explainWrapper'>
              <p className='explain'>
                비밀번호를 찾고자 하는 아이디를 입력해 주세요.
                <br />
                이메일로 전송된 인증번호로 본인확인해 주세요.
              </p>
            </div>
          </div>
          <div id='emailBox'>
            <div id='titleWrapper'>
              <p className='title'>이메일</p>
            </div>
            <div id='inputWrapper'>
              <input className='input' placeholder='이메일을 입력해주세요.' value={inputEmail} onChange={inputChangeHandler}/>
              <div id='btnWrapper'>
                <button className='btn' onClick={requestHandler}>인증번호 받기</button>
              </div>
            </div>
          </div>
          <div id='btnBox'>
            <button className='btn' onClick={() => dispatch(showFindPasswordModal(false))}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FindPasswordModal;
