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
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function MainConcertInfo() {
  const navigate = useNavigate();
  const { target } = useSelector((state: RootState) => state.main);

  type obj = {
    activation?: boolean;
    createdAt?: Date;
    exclusive?: string;
    id?: number;
    image_concert?: string;
    link?: string;
    open_date?: Date;
    period?: string;
    place?: string;
    post_date?: string;
    price?: string;
    rating?: string;
    running_time?: string;
    title?: string;
    total_comment?: number;
    updatedAt?: Date;
    view?: number;
  };
  const [targetPoster, setTargetPoster] = useState<obj>({});
  const [alarmType, setAlarmType] = useState('');
  const [emailClick, setEmailClick] = useState(false);
  const [smsClick, setSmsClick] = useState(false);

  const getPosterInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}`,
        { withCredentials: true },
      );
      if (res.data.data.concertInfo) {
        const changePoster = res.data.data.concertInfo;
        setTargetPoster(changePoster);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAlarm = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/alarm`,
        { alarm_type: alarmType },
        { withCredentials: true },
      );
      if (res.data.data.alarmInfo) {
        console.log(res.data.data.alarmInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const emailClickHandler = () => {
    setAlarmType('email');
    getAlarm();
    setEmailClick(!emailClick);
  };

  const smsClickHandler = () => {
    setAlarmType('phone');
    getAlarm();
    setSmsClick(!smsClick);
  };

  useEffect(() => {
    getPosterInfo();
  }, [target]);

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
            <h2>{targetPoster.title}</h2>
          </div>
        </div>
        <p id='date'>{`등록일: ${targetPoster.post_date} | 조회수: ${targetPoster.view}`}</p>
      </div>
      <div id='middleBox'>
        <div id='concertInfoBox'>
          <img
            src={targetPoster.image_concert}
            alt='포스터'
            id='selectedPoster'
          ></img>
          <div id='concertInfo'>
            <div className='table'>
              <div className='left-side'>
                {targetPoster.place && (
                  <p className='left' id='place'>
                    공연장소
                  </p>
                )}
                {targetPoster.period && (
                  <p className='left' id='date'>
                    공연기간
                  </p>
                )}
                {targetPoster.running_time && (
                  <p className='left' id='time'>
                    공연시간
                  </p>
                )}
                {targetPoster.rating && (
                  <p className='left' id='rating'>
                    관람등급
                  </p>
                )}
                {targetPoster.price && (
                  <p className='left' id='price'>
                    티켓가격
                  </p>
                )}
                <p className='left' id='alarm'>
                  알림 받기
                </p>
              </div>
              <div className='right-side'>
                {targetPoster.place && (
                  <p className='right' id='place_r'>
                    <p>{targetPoster.place}</p>
                    <img src={map}></img>
                  </p>
                )}
                {targetPoster.period && (
                  <p className='right' id='date_r'>
                    {targetPoster.period}
                  </p>
                )}
                {targetPoster.running_time && (
                  <p className='right' id='time_r'>
                    {targetPoster.running_time}
                  </p>
                )}
                {targetPoster.rating && (
                  <p className='right' id='rating_r'>
                    {targetPoster.rating}
                  </p>
                )}
                {targetPoster.price && (
                  <p className='right' id='price_r'>
                    {targetPoster.price}
                  </p>
                )}
                <p className='right' id='alarm_r'>
                  <img
                    src={!emailClick ? emailOff : emailOn}
                    alt='이메일아이콘'
                    id='mailIcon2'
                    onClick={() => {
                      emailClickHandler();
                    }}
                  ></img>
                  <img
                    src={!smsClick ? smsOff : smsOn}
                    alt='문자아이콘'
                    id='kakaoIcon2'
                    onClick={() => {
                      smsClickHandler();
                    }}
                  ></img>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id='buttonsWrapper'>
          <button id='black-btn'>
            <div id='imgAndOpen'>
              <img src={bellOff} />
              <p id='open'>티켓 오픈일 &nbsp; 11.29(월) 오후 2:00</p>
            </div>
          </button>
          <a id='yellow-btn' href={targetPoster.link}>
            예매하기
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainConcertInfo;
