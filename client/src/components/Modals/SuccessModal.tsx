/* CSS import */
import logo from '../../images/Congratulation.png';
/* Store import */
import { RootState } from '../../index';
import { showAlertModal, showSuccessModal } from '../../store/ModalSlice';
/* Library import */
import { useSelector, useDispatch } from 'react-redux';

function SuccessModal() {
  const dispatch = useDispatch();
  const { alertText, btnText } = useSelector((state: RootState) => state.modal);

  return (
    <div id='AlertModalContainer'>
      <div id='outside' onClick={() => dispatch(showSuccessModal(false))}/>
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
              <button className='fontMatch textBoxMatch3' id='back' onClick={() => dispatch(showSuccessModal(false))}>
                {btnText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SuccessModal;