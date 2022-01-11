import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../../config.js';
import axios from 'axios';

function CallbackGoogle() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  /* Google OAuth CallBack 코드 확인 */
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get('code');
  /* Google OAuth CallBack 코드 확인 */

  /* Google OAuth CallBack 코드가 들어오면 실행될 함수 */
  const callbackCheck = async () => {
    try {
      if (authorizationCode) {
        /* Google OAuth CallBack 코드를 /oauth/google POST 메소드 엔드포인트로 넘겨준다 */
        await axios.post(
          `${REACT_APP_API_URL}/oauth/google`,
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

export default CallbackGoogle;
