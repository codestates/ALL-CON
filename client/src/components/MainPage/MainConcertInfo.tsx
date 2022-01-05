import bell from '../../images/notification2.png';
import ybposter from '../../images/ybposter.jpg';

function MainConcertInfo() {
  return (
    <div id='mainConcertInfoBox'>
      <div id='topBox'>
        <div id='roofArea'>
          <button id='backBtn'>콘서트 페이지로 돌아가기</button>
        </div>
        <div id='fromWhereBox'>
          <div className='where'>YES24</div>
          <div className='where'>인터파크</div>
        </div>
        <div id='titleBell'>
          <div id='h2AlignBox'>
            <h2>2011-22 YB 전국투어 콘서트 &lt;LIGHTS&gt; - 창원</h2>
          </div>
          <img alt='종' src={bell} id='bell'></img>
        </div>
        <p id='date'>등록일: 2021-11-24 | 조회수: 87</p>
      </div>
      <img src={ybposter} alt='포스터' id='selectedPoster'></img>
      <div id='concertInfo'>
        <p>장소</p>
        <p>KBS 창원홀</p>
        <p>공연일시</p>
        <p>2022년 1월 15일 (토) 오후 6시</p>
        <p>2022년 1월 16일 (일) 오후 5시</p>
        <p>러닝타임</p>
        <p>120분</p>
        <p>관람등급</p>
        <p>8세 이상 관람가</p>
        <p>티켓 가격</p>
        <p>R석 132000원 / S석 121000원 / A석 99000원</p>
      </div>
    </div>
  );
}

export default MainConcertInfo;
