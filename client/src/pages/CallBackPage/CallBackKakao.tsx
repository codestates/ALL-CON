/* Config import */
import { REACT_APP_API_URL } from '../../config.js';
/* Store import */
import { login, getUserInfo } from '../../store/AuthSlice';
/* Library import */
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function CallbackKaKaoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Kakao OAuth CallBack 코드 확인 */
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get('code');
  /* Kakao OAuth CallBack 코드 확인 */

  useEffect(() => {
    callbackCheck();
  }, [authorizationCode]);

  /* Kakao OAuth CallBack 코드가 들어오면 실행될 함수 */
  const callbackCheck = async () => {
    try {
      if (authorizationCode) {
        /* Kakao OAuth CallBack 코드를 /oauth/Kakao POST 메소드 엔드포인트로 넘겨준다 */
        const response = await axios.post(
          `${REACT_APP_API_URL}/oauth/kakao`,
          { authorizationCode },
          { withCredentials: true }
        );
        /* 로그인 & 유저 상태 변경 */
        dispatch(login());
        dispatch(getUserInfo(response.data.data));
      }
      navigate('/main');
    } catch(err) {
      console.log(err);
      navigate('/main');
    }
  }
  return (
    <div />
  );
}
export default CallbackKaKaoPage;
