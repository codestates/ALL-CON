/* CSS import */
import bellOn from '../../images/notification2.png';
import bellOff from '../../images/notification1.png';
import map from '../../images/map.png';
import smsOn from '../../images/mail4.png';
import smsOff from '../../images/mail4off.png';
import emailOn from '../../images/email2.png';
import emailOff from '../../images/email3.png';
import returnImg from '../../images/return.png';
/* Store import */
import { RootState } from '../../index';
import { setTarget } from '../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function MainConcertInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRendering, targetIdx, target, detail } = useSelector(
    (state: RootState) => state.main,
  );

  const [alarmType, setAlarmType] = useState('');
  const [emailClick, setEmailClick] = useState(false);
  const [smsClick, setSmsClick] = useState(false);

  const getAlarm = async () => {
    try {
      console.log('알람타입>>>', alarmType);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/concert/${detail.id}/alarm?alarm_type=${alarmType}`,
        {},
        { withCredentials: true },
      );
      if (res.data) {
        console.log(res.data);
        console.log('알람 나와라아아');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const cancelAlarm = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/concert/${detail.id}/alarm?alarm_type=${alarmType}`,
        { withCredentials: true },
      );
      if (res.data) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='mainConcertInfoBox'>
      <div id='topBox'>
        <div id='roofArea'>
          <img
            id='backBtn'
            src={returnImg}
            alt='콘서트페이지 돌아가기 버튼'
            onClick={() => navigate('/concert')}
          />
        </div>
        <div id='fromWhereBox'>
          <div className='where'>YES24</div>
          <div className='where'>인터파크</div>
          <img alt='종' src={bellOff} id='bell'></img>
        </div>
        <div id='titleBox'>
          <div id='h2AlignBox'>
            <h2>{detail.title}</h2>
          </div>
        </div>
        <p id='date'>{`등록일: ${detail.post_date} | 조회수: ${detail.view}`}</p>
      </div>
      <div id='middleBox'>
        <div id='concertInfoBox'>
          <img
            src={detail.image_concert}
            alt='포스터'
            id='selectedPoster'
          ></img>
          <div id='concertInfo'>
            <div className='table'>
              <div className='left-side'>
                {detail.place && (
                  <p className='left' id='place'>
                    공연장소
                  </p>
                )}
                {detail.period && (
                  <p className='left' id='date'>
                    공연기간
                  </p>
                )}
                {detail.running_time && (
                  <p className='left' id='time'>
                    공연시간
                  </p>
                )}
                {detail.rating && (
                  <p className='left' id='rating'>
                    관람등급
                  </p>
                )}
                {detail.price && (
                  <p className='left' id='price'>
                    티켓가격
                  </p>
                )}
                <p className='left' id='alarm'>
                  알림 받기
                </p>
              </div>
              <div className='right-side'>
                {detail.place && (
                  <p className='right' id='place_r'>
                    <p>{detail.place}</p>
                    <img src={map}></img>
                  </p>
                )}
                {detail.period && (
                  <p className='right' id='date_r'>
                    {detail.period}
                  </p>
                )}
                {detail.running_time && (
                  <p className='right' id='time_r'>
                    {detail.running_time}
                  </p>
                )}
                {detail.rating && (
                  <p className='right' id='rating_r'>
                    {detail.rating}
                  </p>
                )}
                {detail.price && (
                  <p className='right' id='price_r'>
                    {detail.price}
                  </p>
                )}
                <p className='right' id='alarm_r'>
                  <img
                    src={!emailClick ? emailOff : emailOn}
                    alt='이메일아이콘'
                    id='mailIcon2'
                    onClick={
                      // emailClick
                      //   ? () => {
                      //       emailCancelHandler();
                      //     }
                      //   : () => {
                      //       emailClickHandler();
                      //     }
                      () => {
                        // emailClickHandler();
                      }
                    }
                  ></img>
                  <img
                    src={!smsClick ? smsOff : smsOn}
                    alt='문자아이콘'
                    id='kakaoIcon2'
                    onClick={
                      //   smsClick
                      //     ? () => {
                      //         smsCancelHandler();
                      //       }
                      //     : () => {
                      //         smsClickHandler();
                      //       }
                      () => {
                        // smsClickHandler();
                      }
                    }
                  ></img>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id='buttonsWrapper'>
          <button id='black-btn'>
            <div id='imgAndOpen'>
              <img src={smsClick || emailClick ? bellOn : bellOff} />
              <p id='open'>티켓 오픈일 &nbsp; 11.29(월) 오후 2:00</p>
            </div>
          </button>
          <a id='yellow-btn' href={detail.link}>
            예매하기
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainConcertInfo;
