import poster from '../../../images/hiphop2.gif';
import map from '../../../images/bigMap.png';
function ConcertModal() {
  return (
    <div id='concertModalContainer'>
      <div id='background'></div>
      <div id='concertModal'>
        <div id='ToAlignModal'>
          <div id='top_box'>
            <div id='titleAndDay'>
              <h2>앙코르 핸즈포히어로 힙합페스티발</h2>
              <p>D-5</p>
            </div>
            <div id='whereAndDate'>
              <p id='where'>YES24</p>
              <p id='date'>등록일: 202x.xx.xx | 조회수: 1,715</p>
            </div>
          </div>
          <div id='mid_box'>
            <img id='poster' src={poster}></img>
            <div id='right-side'>
              <div id='conInfo'>
                <div id='miniTitle'>
                  <p id='place'>장소</p>
                  <p id='time'>공연일시</p>
                </div>
                <div id='answer'>
                  <p id='place_r'>KBS 아레나</p>
                  <p id='time_r'>202x년 xx월 xx일 (x) 오후 x시</p>
                </div>
              </div>
              <button id='more'>자세히 보기</button>
            </div>
          </div>
          <div id='bottom_box'>
            <img id='map' src={map}></img>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConcertModal;
