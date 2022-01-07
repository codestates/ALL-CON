import goConchin from '../../images/goConChin.png';

function MainFindConchin() {
  return (
    <div id='mainGoConchin'>
      <b>
        콘서트에 같이 갈 "<u>콘친</u>" 을 찾아볼까요?
      </b>
      <img src={goConchin} id='goConchin'></img>
      <button>바로가기</button>
    </div>
  );
}

export default MainFindConchin;
