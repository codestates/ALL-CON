/* Config import */
import { REACT_APP_API_URL } from '../../config.js';
/* Store import */
import { login, getUserInfo } from '../../store/AuthSlice';
/* Library import */
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function CallbackGooglePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Google OAuth CallBack 코드 확인 */
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get('code');
  /* Google OAuth CallBack 코드 확인 */

  useEffect(() => {
    callbackCheck();
  }, [authorizationCode]);

  /* Google OAuth CallBack 코드가 들어오면 실행될 함수 */
  const callbackCheck = async () => {
    try {
      if (authorizationCode) {
        /* Google OAuth CallBack 코드를 /oauth/google POST 메소드 엔드포인트로 넘겨준다 */
        const response = await axios.post(
          `${REACT_APP_API_URL}/oauth/google`,
          { authorizationCode },
          { withCredentials: true }
        );
        /* 로그인 & 유저 상태 변경 */
        dispatch(login());
        console.log('------ response.data.data 확인 ------', response.data.data)
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
export default CallbackGooglePage;
