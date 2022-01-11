import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../../config.js';
import axios from 'axios';

function CallbackKaKao() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  /* Kakao OAuth CallBack 코드 확인 */
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get('code');
  /* Kakao OAuth CallBack 코드 확인 */

  /* Kakao OAuth CallBack 코드가 들어오면 실행될 함수 */
  const callbackCheck = async () => {
    try {
      if (authorizationCode) {
        /* Kakao OAuth CallBack 코드를 /oauth/Kakao POST 메소드 엔드포인트로 넘겨준다 */
        await axios.post(
          `${REACT_APP_API_URL}/oauth/kakao`,
          { authorizationCode },
          { withCredentials: true }
        );
        navigate('/main');
      }
    } catch(err) {
      console.log(err);
      navigate('/main');
    }
  }

  useEffect(() => {
    callbackCheck();
  }, [authorizationCode]);

  return (
    <div />
  );
}

export default CallbackKaKao;
