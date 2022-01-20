/* CSS import */
import bellOn from '../../images/notification2.png';
import bellOff from '../../images/notification1.png';
import comment from '../../images/comment.png';
import emailOn from '../../images/email2.png';
import emailOff from '../../images/email3.png';
import map from '../../images/map.png';
import returnImg from '../../images/return.png';
import smsOn from '../../images/mail4.png';
import smsOff from '../../images/mail4off.png';
/* Store import */
import { RootState } from '../../index';
import {
  setEmailClick,
  setSmsClick,
  setDetail,
  setTarget,
} from '../../store/MainSlice';
import {
  showAlertModal,
  insertAlertText,
  insertBtnText,
  showSuccessModal,
  showLoginModal,
  showEmailAlarmModal,
  showSmsAlarmModal,
  insertAlarmText,
  showConcertModal,
  showMainKakaoModal,
} from '../../store/ModalSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function MainConcertInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    mainToConcert,
    targetIdx,
    target,
    detail,
    order,
    emailClick,
    smsClick,
  } = useSelector((state: RootState) => state.main);
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { pageAllComments } = useSelector((state: RootState) => state.concertComments)
  const [alarmType, setAlarmType] = useState('');
  // const [emailClick, setEmailClick] = useState(false);
  // const [smsClick, setSmsClick] = useState(false);

  type maincon = {
    concert_id?: number;
    createdAt?: Date;
    email_alarm?: boolean;
    id: number;
    phone_alarm?: boolean;
    updatedAt?: Date;
    user_id?: number;
  };
  const [allAlarms, setAllAlarms] = useState<maincon[]>([]);

  useEffect(() => {
    // 로그인 상태인 경우, 나의 알람 리스트를 조회한다
    // if(isLogin) getAllAlarms();
  }, [target]);

  const getAllAlarms = async () => {
    try {
      if (isLogin === false) {
        dispatch(setEmailClick(false));
        dispatch(setSmsClick(false));
      } else {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/alarm`,
          { withCredentials: true },
        );
        if (res.data.data.myAllAlarmInfo) {
          const all = res.data.data.myAllAlarmInfo;
          //모든 알람 allAlarms에 배열로 저장
          setAllAlarms(all);
          if (allAlarms) {
            let flag = 1;
            let check = () => {
              for (let i = 0; i < allAlarms.length; i++) {
                //이메일 알림이 이미 설정되어있는 경우
                if (
                  allAlarms[i].concert_id === target.id &&
                  allAlarms[i].email_alarm === true
                ) {
                  dispatch(setEmailClick(true));
                  console.log('emailClick상태', emailClick);
                  flag = 2;
                }
                if (
                  //sms 알림이 이미 설정되어있는 경우
                  allAlarms[i].concert_id === target.id &&
                  allAlarms[i].phone_alarm === true
                ) {
                  dispatch(setSmsClick(true));
                  console.log('smsClick의 상태', smsClick);
                  flag = 3;
                }
              }
            };
            check();
            if (flag === 1) {
              //이메일도 sms도 알림설정 한적이 없는 경우
              dispatch(setEmailClick(false));
              dispatch(setSmsClick(false));
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //해당 콘서트에서 한번도 알람 설정한적 없을때 알람
  const getAlarm = async (test: string) => {
    try {
      console.log('알람타입>>>', test);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/alarm?alarm_type=${test}`,
        {},
        { withCredentials: true },
      );
      if (res.data.data.alarmInfo) {
        console.log(res.data.data.alarmInfo);
        if (res.data.data.alarmInfo.email_alarm === true) {
          dispatch(setEmailClick(true));
        }
        if (res.data.data.alarmInfo.phone_alarm === true) {
          dispatch(setSmsClick(true));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 티켓 오픈일 마감 여부 함수 */
  const ticketOpenCheck = (openDate?: Date): boolean => {
    if (openDate) {
      const strOpenDate = String(openDate);

      const year = Number(strOpenDate.substring(0, 4));
      const month = Number(strOpenDate.substring(5, 7))-1;
      const date = Number(strOpenDate.substring(8, 10));
      const hour = Number(strOpenDate.substring(11, 13)); // 알람 24시간전 발송
      const minute = Number(strOpenDate.substring(14, 16));

      const today = new Date();
      const openDay = new Date(year, month, date, hour, minute);
      const gap = (openDay.getTime() - today.getTime()) / 1000 / 60 / 60; // 시간차이
      
      return gap > 24
    }
    return false;
  };

  /* Date 객체 형변환 함수 */
  const dayFormatter = (openDate?: Date): string => {
    if (openDate) {
      const strOpenDate = String(openDate);

      const year = strOpenDate.substring(0, 4);
      const month = strOpenDate.substring(5, 7);
      const date = strOpenDate.substring(8, 10);
      const hour = strOpenDate.substring(11, 13);
      const minute = strOpenDate.substring(14, 16);

      return String(
        year + '년 ' + month + '월 ' + date + '일 ' + hour + ' : ' + minute,
      );
    }
    return '';
  };

  const emailClickHandler = () => {
    if (isLogin === false) {
      alert('로그인 먼저 해주세요! 😖');
      dispatch(showLoginModal(true));
    } else {
      if (emailClick) {
        dispatch(
          insertAlarmText(
            `이메일 알림이 이미 등록되어있어요.\n
            알림 취소하시겠어요? 😖`,
          ),
        );
        dispatch(showEmailAlarmModal(true));
      } else {
        setAlarmType('email');
        //알람 새로 요청함
        getAlarm('email');
        dispatch(insertBtnText('확인'));
        dispatch(
          insertAlertText(`${target.title} 이메일 알림이 설정되었습니다! 🙂`),
        );
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
      if (userInfo.role === 3) {
        alert('콘친 인증을 해주세요! 😖');
        navigate('/mypage');
      } else {
        //콘친인증을 했다.
        if (smsClick) {
          dispatch(
            insertAlarmText(
              `sms 알림이 이미 등록되어있어요.\n
              알림 취소하시겠어요? 😖`,
            ),
          );
          dispatch(showSmsAlarmModal(true));
        } else {
          //알람 설정을 이전에 한 적이 없다. 이번에 처음 알람 등록한다.
          setAlarmType('phone');
          getAlarm('phone');
          dispatch(insertBtnText('확인'));
          dispatch(
            insertAlertText(`${target.title} sms 알림이 설정되었습니다! 🙂`),
          );
          dispatch(showSuccessModal(true));
        }
      }
    }
  };

  return (
    <div id='mainConcertInfoBox'>
      <div id='topBox'>
        <div id='roofArea'>
          {mainToConcert && (
            <img
              id='backBtn'
              src={returnImg}
              alt='콘서트페이지 돌아가기 버튼'
              onClick={() => {
                dispatch(showConcertModal(true));
                navigate('/concert');
              }}
            />
          )}
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
                <p className='left' id='showPlace'>
                  장소 보기
                </p>
              </div>
              <div className='right-side'>
                {detail.place && (
                  <p className='right' id='place_r'>
                    <p>{detail.place}</p>
                    <img
                      src={map}
                      onClick={() => dispatch(showMainKakaoModal(true))}
                    ></img>
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
                  {ticketOpenCheck(detail.open_date) ?
                    <>
                      <img
                        src={emailClick ? emailOn : emailOff}
                        alt='이메일아이콘'
                        id='mailIcon2'
                        onClick={() => {
                          emailClickHandler();
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
                    </>
                    : <p className='right' id='alarm_text'>티켓 오픈 알람시간이 지났습니다.</p>
                  }
                {ticketOpenCheck(detail.open_date)}</p>
                <p className='right' id='showPlace_r'>
                  <img src={map}></img>
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
                <p id='open'>
                  티켓 오픈일 &nbsp; {dayFormatter(detail.open_date)}
                </p>
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
        <img src={comment} alt='commentImg' />
        <div>{detail.total_comment}개의 댓글</div>
      </div>
    </div>
  );
}

export default MainConcertInfo;
