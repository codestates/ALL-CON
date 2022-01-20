/* CSS import */
import logo from '../../../images/alert.png';
/* Store import */
import { RootState } from '../../../index';
import { showSmsAlarmModal, insertAlarmText } from '../../../store/ModalSlice';
import { setSmsClick } from '../../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function SmsAlarmModal() {
  const dispatch = useDispatch();
  const { alarmText } = useSelector((state: RootState) => state.modal);
  const { detail } = useSelector((state: RootState) => state.main);

  const cancelSmsAlarm = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/concert/${detail.id}/alarm?alarm_type=phone`,
        { withCredentials: true },
      );
      if (res.data) {
        dispatch(setSmsClick(false));
        dispatch(showSmsAlarmModal(false));
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='AlarmModalContainer'>
      <div id='outside' onClick={() => dispatch(showSmsAlarmModal(false))} />
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
                onClick={() => cancelSmsAlarm()}
              >
                알림 취소
              </button>
              <button
                className='fontMatch textBoxMatch3'
                id='back2'
                onClick={() => dispatch(showSmsAlarmModal(false))}
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

export default SmsAlarmModal;
