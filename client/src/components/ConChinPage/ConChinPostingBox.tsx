/* Config import */
import { REACT_APP_API_URL, REACT_APP_CLIENT_URL } from '../../config.js';
/* Store import */
import { login, getUserInfo } from '../../store/AuthSlice';
import {
  showLoginModal,
  showSignupModal,
  showFindPasswordModal,
  showAlertModal,
  insertAlertText,
} from '../../store/ModalSlice';
import { RootState } from '../../index';
/* Library import */
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ConChinPostingOrderBox from './ConChinPositngOrderBox';

function ConChinPostingBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
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

  return (
    <li id='conChinPostingBox'>
      <h1 id='curOrder'>조회수 순</h1>
      <ConChinPostingOrderBox />
      <ul className='posting'>
        <h1 className='title'>[진주] 2021-22 YB 전국투어 콘서트〈LIGHTS〉</h1>
        <p className='date'>2022.02.26 ~ 2022.02.27</p>
        <p className='view'>조회수 2,366</p>
        <p className='place'>경남문화예술회관 대공...</p>
      </ul>
      <ul className='posting'>
        <h1 className='title'>2022 AB6IX CONCERT [COMPLETE WITH...</h1>
        <p className='date'>2022.01.15 ~ 2022.01.26</p>
        <p className='view'>조회수 1,746</p>
        <p className='place'>잠실실내체육관</p>
      </ul>
      <ul className='posting'>
        <h1 className='title'>2022 SF9 LIVE FANTASY #3 IMPERFECT</h1>
        <p className='date'>2022.01.21 ~ 2022.01.23</p>
        <p className='view'>조회수 536</p>
        <p className='place'>올림픽공원 올림픽홀</p>
      </ul>
    </li>
  );
}
export default ConChinPostingBox;
