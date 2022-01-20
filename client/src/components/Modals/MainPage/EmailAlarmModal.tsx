/* CSS import */
import logo from '../../../images/alert.png';
/* Store import */
import { RootState } from '../../../index';
import {
  showEmailAlarmModal,
  insertAlarmText,
} from '../../../store/ModalSlice';
import { setEmailClick } from '../../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function EmailAlarmModal() {
  const dispatch = useDispatch();
  const { alarmText } = useSelector((state: RootState) => state.modal);
  const { detail } = useSelector((state: RootState) => state.main);

  const cancelEmailAlarm = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/concert/${detail.id}/alarm?alarm_type=email`,
        { withCredentials: true },
      );
      if (res.data) {
        dispatch(setEmailClick(false));
        dispatch(showEmailAlarmModal(false));
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='AlarmModalContainer'>
      <div id='outside' onClick={() => dispatch(showEmailAlarmModal(false))} />
      <div id='alertBackground'>
        <div id='alertModal'>
          <div id='alignContainer'>
            <div id='topBox'>
              <img alt='logoImg' src={logo} />
            </div>
            <div id='midBox'>
              <p className='fontMatch'>{alarmText}</p>
            </div>
            <div id='bottomBox'>
              <button
                className='fontMatch textBoxMatch3'
                id='back1'
                onClick={() => cancelEmailAlarm()}
              >
                알림 취소
              </button>
              <button
                className='fontMatch textBoxMatch3'
                id='back2'
                onClick={() => dispatch(showEmailAlarmModal(false))}
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

export default EmailAlarmModal;
