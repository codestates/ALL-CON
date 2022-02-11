/* Store import */
import { RootState } from '../index';
import { logout, getUserInfo } from '../store/AuthSlice';
import { setTarget, setTargetIdx, setOrder, setIsRendering } from '../store/MainSlice';
import { setPageNum } from '../store/ConcertCommentSlice';
import { setAlarm, setEmailClick, setSmsClick } from '../store/ConcertAlarmSlice';
import { 
  showLoginModal, 
  showConcertModal,
  showConfirmNumberModal,
  showPhoneConfirmNumberModal,
  showAlertModal,
  showSuccessModal,
  showConChinWritingModal,
  showAlarmModal,
  showMyProfileImageModal
} from '../store/ModalSlice';
/* Library import */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginRedirect() {
  /* dispatch & navigate & useLocation 선언 */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* useSelector */
  const { isLoginCheck } = useSelector((state: RootState) => state.auth);
  
  /* handler 함수 (기능별 정렬) */
  // 메인페이지 리다이렉트 핸들러
  const goHomeHandler = () => {
    /* 메인페이지 상태 초기화 */
    dispatch(setTarget({}));
    dispatch(setTargetIdx(0));
    dispatch(setOrder('view')); 
    dispatch(setPageNum(1));
    dispatch(setIsRendering(false));
    dispatch(setAlarm({}));
    dispatch(setEmailClick(false));
    dispatch(setSmsClick(false));
    /* 켜져있는 모달창 모두 종료 */
    dispatch(showConcertModal(false));  
    dispatch(showLoginModal(false));
    dispatch(showConfirmNumberModal(false));
    dispatch(showPhoneConfirmNumberModal(false));
    dispatch(showAlertModal(false));
    dispatch(showSuccessModal(false));
    dispatch(showConChinWritingModal(false));
    dispatch(showAlarmModal(false));
    dispatch(showMyProfileImageModal(false));
    /* 홈으로 이동 */
    navigate('/main');
  };
  // 로그인 상태 변경 핸들러
  const loginStateHandler = () => {
    /* 로그아웃 상태로 변경 & 유저정보 상태 초기화 */
    dispatch(logout());
    dispatch(getUserInfo({}));
    /* 로그인 모달창 팝업 */
    dispatch(showLoginModal(true));
  };

  useEffect(() => {
    if(!isLoginCheck){
      goHomeHandler(); // 메인페이지로 이동
      loginStateHandler();  // 로그인 상태 변경 & 로그인 모달창 팝업
    }
  }, [isLoginCheck]);

  return null;
}

export default LoginRedirect;