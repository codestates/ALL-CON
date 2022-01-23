/* CSS import */
import bellOn from '../../images/notification2.png';
import bellOff from '../../images/notification1.png';
import comment from '../../images/comment.png';
import emailOn from '../../images/email2.png';
import emailOff from '../../images/email3.png';
import map from '../../images/mapMarker.png';
import returnImg from '../../images/return.png';
import smsOn from '../../images/mail4.png';
import smsOff from '../../images/mail4off.png';
/* Store import */
import { RootState } from '../../index';
import {
  showAlertModal,
  insertAlertText,
  insertBtnText,
  showSuccessModal,
  showAlarmModal,
  insertAlarmText,
  showConcertModal,
  showMainKakaoModal,
} from '../../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setAlarm, setEmailClick, setSmsClick } from '../../store/ConcertAlarmSlice';

function MainConcertInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { target, passToConcert, detail } = useSelector((state: RootState) => state.main);
  const { alarm, emailClick, smsClick, allAlarms } = useSelector((state: RootState) => state.concertAlarm);

  /* 알람버튼 요청 핸들러 */
  const alarmSetHandler = async (type: string) => {
    /* 로그인 상태인 경우 */
    if (isLogin) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/concert/${target.id}/alarm?alarm_type=${type}`,
          {},
          { withCredentials: true },
        );
        /* 응답값이 있다면? */
        if(response.data.data.alarmInfo){
          const data = response.data.data.alarmInfo;
          /* email 알람 클릭시 */
          if(type === 'email'){
            dispatch(setEmailClick(true));
            alarm.phone_alarm ?
              dispatch(setAlarm({
                id: data.id,
                email_alarm: data.email_alarm,
                phone_alarm: true,
                user_id: data.user_id,
                concert_id: data.concert_id,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
              }))
              : dispatch(setAlarm(data));
            dispatch(insertBtnText('확인'));
            dispatch(insertAlertText(`${target.title} 이메일 알림이 설정되었습니다! 🙂`));
            dispatch(showSuccessModal(true));
          }
          /* sms 알람 클릭시 */
          else if(type === 'phone'){
            dispatch(setSmsClick(true));
            alarm.email_alarm ?
              dispatch(setAlarm({
                id: data.id,
                email_alarm: true,
                phone_alarm: data.phone_alarm,
                user_id: data.user_id,
                concert_id: data.concert_id,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
              }))
              : dispatch(setAlarm(data));
            dispatch(insertBtnText('확인'));
            dispatch(insertAlertText(`${target.title} SMS 알림이 설정되었습니다! 🙂`));
            dispatch(showSuccessModal(true));
          }
        }
      } catch(err) {
        const error = err as AxiosError;
        if (error.response?.status === 400)
          dispatch(insertAlertText('잘못된 요청입니다! 😖'));
        else if (error.response?.status === 401)
          dispatch(insertAlertText('휴대폰 인증을 해주세요! 😖'));
        else dispatch(insertAlertText('Server Error! 😖'));
        dispatch(showAlertModal(true));
      }
    } 
    /* 비로그인 상태인 경우 */
    else {
      dispatch(insertAlertText('로그인 먼저 해주세요! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  /* 알람버튼 삭제 핸들러 */
  const alarmDeleteHandler = async (type: string) => {
    /* 로그인 상태인 경우 */
    if (isLogin) {
      if(type === 'email'){
        dispatch(insertAlarmText('이메일'));
        dispatch(showAlarmModal(true));
      }
      /* sms 알람 클릭시 */
      else if(type === 'phone'){
        dispatch(insertAlarmText('SMS'));
        dispatch(showAlarmModal(true));
      }
    } 
    /* 비로그인 상태인 경우 */
    else {
      dispatch(insertAlertText('로그인 먼저 해주세요! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  /* 티켓 오픈일 마감 여부 함수 */
  const ticketOpenCheck = (openDate?: Date): boolean => {
    if (openDate) {
      const strOpenDate = String(openDate);

      const year = Number(strOpenDate.substring(0, 4));
      const month = Number(strOpenDate.substring(5, 7)) - 1;
      const date = Number(strOpenDate.substring(8, 10));
      const hour = Number(strOpenDate.substring(11, 13)); // 알람 24시간전 발송
      const minute = Number(strOpenDate.substring(14, 16));

      const today = new Date();
      const openDay = new Date(year, month, date, hour, minute);
      const gap = (openDay.getTime() - today.getTime()) / 1000 / 60 / 60; // 시간차이

      if (gap > 24) return true;
      else {
        return false;
      }
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

  return (
    <div id='mainConcertInfoBox'>
      <div id='topBox'>
        <div id='roofArea'>
          {passToConcert && (
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
                    <p onClick={() => dispatch(showMainKakaoModal(true))}>
                      {detail.place}
                    </p>
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
                  {ticketOpenCheck(detail.open_date) ? (
                    <>
                      <img
                        src={alarm.email_alarm ? emailOn : emailOff}
                        alt='이메일아이콘'
                        id='mailIcon2'
                        onClick={() => {
                          alarm.email_alarm ?
                          alarmDeleteHandler('email')
                          : alarmSetHandler('email');
                        }}
                      ></img>
                      <img
                        src={alarm.phone_alarm ? smsOn : smsOff}
                        alt='문자아이콘'
                        id='kakaoIcon2'
                        onClick={() => {
                          alarm.phone_alarm ?
                          alarmDeleteHandler('phone')
                          : alarmSetHandler('phone');
                        }}
                      ></img>
                    </>
                  ) : (
                    <p className='right' id='alarm_text'>
                      티켓 오픈 알람시간이 지났습니다.
                    </p>
                  )}
                  {ticketOpenCheck(detail.open_date)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id='buttonsWrapper'>
          {detail && (
            <button id='black-btn'>
              <div id='imgAndOpen'>
                <img
                  src={
                    (smsClick && ticketOpenCheck(detail.open_date)) || (emailClick && ticketOpenCheck(detail.open_date))
                      ? bellOn
                      : bellOff
                  }
                  alt='bellImg'
                />
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
