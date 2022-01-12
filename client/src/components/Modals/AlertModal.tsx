/* CSS import */
import logo from '../../images/alert.png';
/* Store import */
import { RootState } from '../../index';
import { showAlertModal } from '../../store/ModalSlice';
/* Library import */
import { useSelector, useDispatch } from 'react-redux';

function AlertModal() {
  const dispatch = useDispatch();
  const { alertText } = useSelector((state: RootState) => state.modal);

  return (
    <div id='AlertModalContainer'>
      <div id='outside' onClick={() => dispatch(showAlertModal(false))}/>
      <div id='alertBackground'>
        <div id='alertModal'>
          <div id='alignContainer'>
            <div id='topBox'>
              <img alt='logoImg' src={logo} />
            </div>
            <div id='midBox'>
              <p className='fontMatch'>{alertText}</p>
            </div>
            <div id='bottomBox'>
              <button className='fontMatch textBoxMatch3' id='back' onClick={() => dispatch(showAlertModal(false))}>
                뒤로가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AlertModal;
