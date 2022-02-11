/* CSS import */
import logo from '../../../images/alert.png';
/* Store import */
import { RootState } from '../../../index';
import { loginCheck } from '../../../store/AuthSlice';
import { showAlarmModal, showAlertModal, insertAlertText } from '../../../store/ModalSlice';
import { setEmailClick, setSmsClick, setAlarm } from '../../../store/ConcertAlarmSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function AlarmModal() {
  const dispatch = useDispatch();
  const { alarmText } = useSelector((state: RootState) => state.modal);
  const { detail } = useSelector((state: RootState) => state.main);
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const { alarm } = useSelector((state: RootState) => state.concertAlarm);

  /* 알람 삭제 핸들러 */
  const alarmDeleteHandler = async () => {
    /* 로그인 상태인 경우 */
    if (isLogin) {
      const type = alarmText === '이메일' ? 'email' : 'phone' 
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/concert/${detail.id}/alarm?alarm_type=${type}`,
          { withCredentials: true },
        );
        // Axios 결과 로그아웃 상태시 MainPage Redirect
        if(response.data.message === 'Unauthorized userInfo!') return dispatch(loginCheck(false));
        
        if (response.data.message!=='Delete Alarm!') {
          /* 이메일 알람 삭제인 경우 */
          const data = response.data.data.alarmDestroyInfo;
          if(type === 'email'){
            dispatch(setEmailClick(false));
            alarm.phone_alarm ?
              dispatch(setAlarm({
                id: data.id,
                email_alarm: false,
                phone_alarm: true,
                user_id: data.user_id,
                concert_id: data.concert_id,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
              }))
              : dispatch(setAlarm({}));
          }
          /* SMS 알람 삭제인 경우 */
          else if(type === 'phone'){
            dispatch(setSmsClick(false));
            alarm.email_alarm ?
              dispatch(setAlarm({
                id: data.id,
                email_alarm: true,
                phone_alarm: false,
                user_id: data.user_id,
                concert_id: data.concert_id,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
              }))
              : dispatch(setAlarm({}));
          }
        } else {
          /* DB가 완전삭제 되었을 때 */
          dispatch(setAlarm({}));
          dispatch(setEmailClick(false));
          dispatch(setSmsClick(false));
        }
        dispatch(showAlarmModal(false));
      } catch (err) {
        /* 에러 처리 */
        const error = err as AxiosError;
        dispatch(showAlarmModal(false));
        if (error.response?.status === 400) dispatch(insertAlertText('잘못된 요청입니다! 😖'));
        else dispatch(insertAlertText('Server Error! 😖'))
        dispatch(showAlertModal(true));
      }
    }
    /* 비로그인 상태인 경우 */
    else {
      dispatch(insertAlertText('로그인 먼저 해주세요! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  return (
    <div id='AlarmModalContainer'>
      <div id='outside' onClick={() => dispatch(showAlarmModal(false))} />
      <div id='alertBackground'>
        <div id='alertModal'>
          <div id='alignContainer'>
            <div id='topBox'>
              <img alt='logoImg' src={logo} />
            </div>
            <div id='midBox'>
              <p className='fontMatch'>{alarmText} 알람이 이미 등록되어있어요.알림 취소하시겠어요? 😖</p>
            </div>
            <div id='bottomBox'>
              <button
                className='fontMatch textBoxMatch3'
                id='back1'
                onClick={alarmDeleteHandler}
              >
                알림 취소
              </button>
              <button
                className='fontMatch textBoxMatch3'
                id='back2'
                onClick={() => dispatch(showAlarmModal(false))}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlarmModal;
