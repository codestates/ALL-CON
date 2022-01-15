/* CSS import */
import bell from '../../images/notification2.png';
import blackbell from '../../images/notification1.png';
import ybposter from '../../images/ybposter.jpg';
import kakaotalk from '../../images/kakao-talk-1.png';
import email from '../../images/email2.png';
import returnImg from '../../images/return.png';
/* Store import */
import { RootState } from '../../index';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function MainConcertInfo() {
  const navigate = useNavigate();
  const { target } = useSelector((state: RootState) => state.main);

  return (
    <div id='mainConcertInfoBox'>
      <div id='topBox'>
        <div id='roofArea'>
          <img id='backBtn' src={returnImg} alt='콘서트페이지 돌아가기 버튼' onClick={() => navigate('/concert')}/>
        </div>
        <div id='fromWhereBox'>
          <div className='where'>YES24</div>
          <div className='where'>인터파크</div>
          <img alt='종' src={blackbell} id='bell'></img>
        </div>
        <div id='titleBox'>
          <div id='h2AlignBox'>
            <h2>{target.title}</h2>
          </div>
        </div>
        <p id='date'>{`등록일: ${target.post_date} | 조회수: ${target.view}`}</p>
      </div>
      <div id='middleBox'>
        <div id='concertInfoBox'>
          <img src={target.image_concert} alt='포스터' id='selectedPoster'></img>
          <div id='concertInfo'>
            <div className='table'>
              <div className='left-side'>
                {target.place && <p className='left' id='place'>공연장소</p>}
                {target.period && <p className='left' id='date'>공연기간</p>}
                {target.running_time && <p className='left' id='time'>공연시간</p>}
                {target.rating && <p className='left' id='rating'>관람등급</p>}
                {target.price && <p className='left' id='price'>티켓가격</p>}
                <p className='left' id='alarm'>
                  알림 받기
                </p>
              </div>
              <div className='right-side'>
                {target.place && <p className='right' id='place_r'>{target.place}</p>}
                {target.period && <p className='right' id='date_r'>{target.period}</p>}
                {target.running_time && <p className='right' id='time_r'>{target.running_time}</p>}
                {target.rating && <p className='right' id='rating_r'>{target.rating}</p>}
                {target.price && <p className='right' id='price_r'>{target.price}</p>}
                <p className='right' id='alarm_r'>
                  <img src={email} alt='메일아이콘' id='mailIcon2'></img>
                  <img src={kakaotalk} alt='카톡아이콘' id='kakaoIcon2'></img>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id='buttonsWrapper'>
          <button id='black-btn'>
            <div id='imgAndOpen'>
              <img src={blackbell} />
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
