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
import { setDetail, setTarget } from '../../store/MainSlice';
import {
  showAlertModal,
  insertAlertText,
  insertBtnText,
  showSuccessModal,
  showLoginModal,
  showConcertModal,
} from '../../store/ModalSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function MainConcertInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mainToConcert, targetIdx, target, detail } = useSelector(
    (state: RootState) => state.main,
  );
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { order } = useSelector((state: RootState) => state.main);
  const { pageAllComments } = useSelector((state: RootState) => state.concertComments);

  const [alarmType, setAlarmType] = useState('');
  const [emailClick, setEmailClick] = useState(false);
  const [smsClick, setSmsClick] = useState(false);
  const [openDate, setOpenDate] = useState('');
  
  useEffect(() => {
    getPosterInfo();
  }, [order, targetIdx, pageAllComments]);

  const getPosterInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}`,
        { withCredentials: true },
      );
      if (res.data.data) {
        dispatch(setDetail(res.data.data.concertInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };
  //내가 보낸 모든 알람 리스트 가져온 후에
  //detail의 id(콘서트 아이디) 알람봤는데 내 알람이 존재한다.
  //그러면 emailClick이 true인거임.
  const getAllAlarm = async () => {
    try {
      console.log('알람타입>>>', alarmType);
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/alarm`,
        { withCredentials: true },
      );
      if (res.data) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const getAlarm = async () => {
  //   try {
  //     console.log('알람타입>>>', alarmType);
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/concert/${detail.id}/alarm?alarm_type=${alarmType}`,
  //       {},
  //       { withCredentials: true },
  //     );
  //     if (res.data.data.alarmInfo) {
  //       console.log(res.data.data.alarmInfo);
  //       if (res.data.data.alarmInfo.email_alarm === true) {
  //         setEmailClick(true);
  //       }
  //       if (res.data.data.alarmInfo.phone_alarm === true) {
  //         setSmsClick(true);
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleOpenDate = (opendate?: Date): any => {
    const day = String(opendate);
    const setDay =
      day.substr(0, 4) +
      '년' +
      day.substr(5, 2) +
      '월' +
      day.substr(8, 2) +
      '일' +
      day.substr(11, 2) +
      '시' +
      day.substr(14, 2) +
      '분';
    setOpenDate(setDay);
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

  const emailClickHandler = () => {
    if (isLogin === false) {
      alert('로그인 먼저 해주세요! 😖');
      dispatch(showLoginModal(true));
    } else {
      setAlarmType('email');
      // getAlarm(); //emailClick 상태도 true로 바꿔줌
      console.log('emailClick상태', emailClick);
      if (emailClick && detail) {
        dispatch(
          insertAlertText(`${detail.title} 이메일 알림이 설정되었습니다! 🙂`),
        );
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));
      }
    }
  };

  const smsClickHandler = () => {
    if (isLogin === false) {
      dispatch(showAlertModal(true));
      dispatch(insertAlertText('로그인 먼저 해주세요! 😖'));
    } else {
      //로그인을 했는데 콘친인증 안한 경우(핸드폰 번호x)
      //관리자 role=1 콘친인증 유저 role=2 콘친 인증안된 유저 role=3
      if (userInfo.role === 3) alert('콘친 인증을 해주세요! 😖');
      else {
        setAlarmType('phone');
        // getAlarm();
        console.log('smsClick의 상태', smsClick);
        if (smsClick && detail) {
          dispatch(
            insertAlertText(
              `${detail.title} 문자 메시지 알림이 설정되었습니다! 🙂`,
            ),
          );
          dispatch(insertBtnText('확인'));
          dispatch(showSuccessModal(true));
        }
      }
    }
  };

  return (
    <div id='mainConcertInfoBox'>
      <div id='topBox'>
        <div id='roofArea'>
          {mainToConcert && <img
            id='backBtn'
            src={returnImg}
            alt='콘서트페이지 돌아가기 버튼'
            onClick={() => {
              dispatch(showConcertModal(true));
              navigate('/concert')
            }}/>}
        </div>
        <div id='fromWhereBox'>
          {detail.exclusive === '인터파크' && (
            <div className='where'>인터파크</div>
          )}
          {detail.exclusive === 'YES24' && <div className='where'>YES24</div>}
          {detail.exclusive === '' && (
            <>
              <div className='where'>인터파크</div>
              <div className='where'>YES24</div>
            </>
          )}
          <img alt='종' src={bellOff} id='bell'></img>
        </div>
        <div id='titleBox'>
          <div id='h2AlignBox'>{detail && <h2>{detail.title}</h2>}</div>
        </div>
        <p id='date'>
          {detail && `등록일: ${detail.post_date} | 조회수: ${detail.view}`}
        </p>
      </div>
      <div id='middleBox'>
        <div id='concertInfoBox'>
          <img
            src={detail && detail.image_concert}
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
                    src={emailClick ? emailOn : emailOff}
                    alt='이메일아이콘'
                    id='mailIcon2'
                    onClick={() => {
                      // emailClickHandler();
                      getAllAlarm();
                    }}
                  ></img>
                  <img
                    src={smsClick ? smsOn : smsOff}
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
          {detail && (
            <button id='black-btn'>
              <div id='imgAndOpen'>
                <img src={smsClick || emailClick ? bellOn : bellOff} />
                <p id='open'>티켓 오픈일 &nbsp; {detail.open_date}</p>
              </div>
            </button>
          )}
          {detail && (
            <a id='yellow-btn' href={detail.link} target='_blank'>
              예매하기
            </a>
          )}
        </div>
      </div>
      <div id='bottomBox'>
          <div>{detail.total_comment}개의 댓글</div>
      </div>
    </div>
  );
}

export default MainConcertInfo;
