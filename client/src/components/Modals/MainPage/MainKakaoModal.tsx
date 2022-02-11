/* CSS import */
import map from '../../../images/mapMarker.png';
/* Component import */
import KakaoMap from '../../ConcertPage/KakaoMap';
/* Store import */
import { RootState } from '../../../index';
import { showMainKakaoModal } from '../../../store/ModalSlice';
/* Library import */
import { useSelector, useDispatch } from 'react-redux';

function MainKakaoModal() {
  const dispatch = useDispatch();
  const { detail } = useSelector((state: RootState) => state.main);
  return (
    <div id='MainKakaoModalContainer'>
      <div id='outside' />
      <div
        id='alertBackground'
        onClick={() => dispatch(showMainKakaoModal(false))}
      >
        <div id='alertModal'>
          <div id='alignContainer'>
            <div id='topBox'>
              <div id='alignTop'>
                <img src={map}></img>
                <p className='fontMatch2'>{detail.place}</p>
              </div>
            </div>
            <div id='midBox'>
              {' '}
              <KakaoMap place={detail.place} />
            </div>
            <div id='bottomBox'>
              <button
                className='fontMatch textBoxMatch3'
                id='back'
                onClick={() => dispatch(showMainKakaoModal(false))}
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

export default MainKakaoModal;
