/* CSS import */
import goConchin from '../../images/goConChin.png';
/* Store import */
import { RootState } from '../../index';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTarget, setAllConcerts } from '../../store/MainSlice';

function MainFindConchin() {
  const navigate = useNavigate();

  const { order, targetIdx, target } = useSelector(
    (state: RootState) => state.main,
  );

  return (
    <div id='mainGoConchin'>
      <b>
        콘서트에 같이 갈 "<u>콘친</u>" 을 찾아볼까요?
      </b>
      <img src={goConchin} id='goConchin' alt='콘친찾기 일러스트'></img>
      <button onClick={() => navigate('/conchin')}>바로가기</button>
    </div>
  );
}

export default MainFindConchin;
