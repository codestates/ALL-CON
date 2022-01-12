import bell from '../../images/notification2.png';
import ybposter from '../../images/ybposter.jpg';
import kakaotalk from '../../images/kakao-talk-1.png';
import email from '../../images/email2.png';
import sandwatch from '../../images/sandWatch.png';

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
          <img alt='종' src={bell} id='bell'></img>
          <img src={email} alt='메일아이콘' id='mailIcon'></img>
          <img src={kakaotalk} alt='카톡아이콘' id='kakaoIcon'></img>
        </div>
        <div id='titleBox'>
          <div id='h2AlignBox'>
            <h2>2022 이준호 FANMEETING 〈JUNHO THE MOMENT〉</h2>
          </div>
        </div>
        <p id='date'>등록일: 2021-11-24 | 조회수: 87</p>
      </div>
      <div id='middleBox'>
        <div id='concertInfoBox'>
          <img src={ybposter} alt='포스터' id='selectedPoster'></img>
          <div id='concertInfo'>
            <div className='table'>
              <div className='left-side'>
                <p className='left' id='place'>
                  장소
                </p>
                <p className='left' id='date'>
                  공연일시
                </p>
                <p className='left' id='time'>
                  러닝타임
                </p>
                <p className='left' id='rating'>
                  관람등급
                </p>
                <p className='left' id='price'>
                  티켓 가격
                </p>
              </div>
              <div className='right-side'>
                <p className='right' id='place_r'>
                  KBS 창원홀
                </p>
                <p className='right' id='date_r'>
                  2022년 1월 15일 (토) 오후 6시<br></br>
                  2022년 1월 16일 (일) 오후 5시
                </p>
                <p className='right' id='time_r'>
                  120분
                </p>
                <p className='right' id='rating_r'>
                  8세 이상 관람가
                </p>
                <p className='right' id='price_r'>
                  R석 132000원 / S석 121000원 / A석 99000원
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id='buttonsWrapper'>
          <button id='black-btn'>
            <div id='imgAndOpen'>
              <img src={sandwatch} />
              <p id='open'>티켓 오픈일 &nbsp; 11.29(월) 오후 2:00</p>
            </div>
          </button>
          <button id='yellow-btn'>예매하기</button>
        </div>
      </div>
    </div>
  );
}

export default MainConcertInfo;
