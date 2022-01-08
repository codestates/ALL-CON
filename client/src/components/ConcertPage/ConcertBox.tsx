import poster from '../../images/hiphop2.gif';
function ConcertBox() {
  return (
    <div id='concertBoxOuterContainer'>
      <div id='concertBoxContainer'>
        <img id='poster' src={poster} alt='포스터'></img>
        <div className='infos'>
          <h2>앙코르 핸즈포히어로 힙합페스티발</h2>
          <div className='miniBox'>
            <div id='left'>
              <p id='whereTag'>YES24</p>
              <p id='date'>202x.xx.xx~202x.xx.xx</p>
            </div>
            <div id='right'>
              <p id='view'>조회수 1,715</p>
              <p id='place'>KBS 아레나</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertBox;
