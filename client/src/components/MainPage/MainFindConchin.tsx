/* CSS import */
import goConchin from '../../images/goConChin.png';
/* Library import */
import { useNavigate } from 'react-router-dom';

function MainFindConchin() {
  const navigate = useNavigate();

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
