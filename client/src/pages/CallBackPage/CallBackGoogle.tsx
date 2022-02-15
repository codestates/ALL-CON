/* Store import */
import { setTarget, setTargetIdx, setOrder, setIsRendering } from '../../store/MainSlice';
import { setPageNum } from '../../store/ConcertCommentSlice';
import { login, loginCheck, getUserInfo } from '../../store/AuthSlice';
import {
  showLoginModal,
  showConcertModal,
  showSuccessModal,
  showAlertModal,
  insertAlertText,
} from '../../store/ModalSlice';
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

  /* authorizationCode가 들어오면 렌더링 */
  useEffect(() => {
    callbackCheck();
  }, [authorizationCode]);

  /* 로그인 후 홈화면 리다이렉트 핸들러 */
  const goHomeHandler = () => {
    /* 메인페이지 상태 초기화 */
    dispatch(setTarget({}));
    dispatch(setTargetIdx(0));
    dispatch(setOrder('view')); 
    dispatch(setPageNum(1));
    dispatch(setIsRendering(false));
    /* 켜져있는 모달창 모두 종료 */
    dispatch(showConcertModal(false)); // concertPage 모달창    
    dispatch(showLoginModal(false));
    /* 홈으로 이동 */
    navigate('/main');
  };

  /* Google OAuth CallBack 코드가 들어오면 실행될 함수 */
  const callbackCheck = async () => {
    try {
      if (authorizationCode) {
        /* Google OAuth CallBack 코드를 /oauth/google POST 메소드 엔드포인트로 넘겨준다 */
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/oauth/google`,
          { authorizationCode },
          { withCredentials: true }
        );
        /* 로그인 & 유저 상태 변경 */
        dispatch(login());
        dispatch(loginCheck(true));
        console.log(response.data.data.userInfo.image);
        dispatch(getUserInfo(response.data.data.userInfo));
      }
      goHomeHandler();
    } catch(err) {
      console.log(err);
      /* 로그인 실패 알람 */
      dispatch(insertAlertText('OAuth 로그인에 실패했습니다! 😖'));
      dispatch(showAlertModal(true));
      goHomeHandler();
    }
  }
  return (
    <div />
  );
}
export default CallbackGooglePage;
