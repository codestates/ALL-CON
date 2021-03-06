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
import { loginCheck } from '../../store/AuthSlice';
import { setIsLoading } from '../../store/ConcertSlice';
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
import {
  setAlarm,
  setEmailClick,
  setSmsClick,
} from '../../store/ConcertAlarmSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setTarget } from '../../store/MainSlice';

function MainConcertInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { target, passToConcert, detail, mainTotalComments } = useSelector(
    (state: RootState) => state.main,
  );
  const { alarm, emailClick, smsClick, allAlarms } = useSelector(
    (state: RootState) => state.concertAlarm,
  );

  interface mainDetail {
    id?: number;
    exclusive?: string;
    open_date?: Date;
    post_date?: string;
    image_concert?: string;
    title?: string;
    period?: string;
    place?: string;
    price?: string;
    running_time?: string;
    rating?: string;
    link?: string;
    view?: number;
    total_comment?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  const [mainTotalCommentsMain, setMainTotalCommentsMain] = useState<number>(0);
  const [detailMain, setDetailMain] = useState<mainDetail>({});

  /* detail ????????? ???????????? detailMain ??????  */
  useEffect(() => {
    setDetailMain(detail);
  }, [detail]);

  /* ??? ????????? ????????? ???????????? mainTotalCommentsMain ?????? */
  useEffect(() => {
    setMainTotalCommentsMain(mainTotalComments);
  }, [mainTotalComments]);

  /* ???????????? ?????? ????????? */
  const alarmSetHandler = async (type: string) => {
    /* ????????? ????????? ?????? */
    if (isLogin) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/concert/${target.id}/alarm?alarm_type=${type}`,
          {},
          { withCredentials: true },
        );
        // Axios ?????? ???????????? ????????? MainPage Redirect
        if (response.data.message === 'Unauthorized userInfo!')
          return dispatch(loginCheck(false));

        /* ???????????? ?????????? */
        if (response.data.data.alarmInfo) {
          const data = response.data.data.alarmInfo;
          /* email ?????? ????????? */
          if (type === 'email') {
            dispatch(setEmailClick(true));
            alarm.phone_alarm
              ? dispatch(
                  setAlarm({
                    id: data.id,
                    email_alarm: data.email_alarm,
                    phone_alarm: true,
                    user_id: data.user_id,
                    concert_id: data.concert_id,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                  }),
                )
              : dispatch(setAlarm(data));
            dispatch(insertBtnText('??????'));
            dispatch(
              insertAlertText(
                `${target.title} ????????? ????????? ?????????????????????! ????`,
              ),
            );
            dispatch(showSuccessModal(true));
          } else if (type === 'phone') {
            /* sms ?????? ????????? */
            dispatch(setSmsClick(true));
            alarm.email_alarm
              ? dispatch(
                  setAlarm({
                    id: data.id,
                    email_alarm: true,
                    phone_alarm: data.phone_alarm,
                    user_id: data.user_id,
                    concert_id: data.concert_id,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                  }),
                )
              : dispatch(setAlarm(data));
            dispatch(insertBtnText('??????'));
            dispatch(
              insertAlertText(`${target.title} SMS ????????? ?????????????????????! ????`),
            );
            dispatch(showSuccessModal(true));
          }
        }
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 400)
          dispatch(insertAlertText('????????? ???????????????! ????'));
        else if (error.response?.status === 401)
          dispatch(insertAlertText('????????? ????????? ????????????! ????'));
        else dispatch(insertAlertText('Server Error! ????'));
        dispatch(showAlertModal(true));
      }
    } else {
      /* ???????????? ????????? ?????? */
      dispatch(insertAlertText('????????? ?????? ????????????! ????'));
      dispatch(showAlertModal(true));
    }
  };

  /* ???????????? ?????? ????????? */
  const alarmDeleteHandler = async (type: string) => {
    /* ????????? ????????? ?????? */
    if (isLogin) {
      if (type === 'email') {
        dispatch(insertAlarmText('?????????'));
        dispatch(showAlarmModal(true));
      } else if (type === 'phone') {
        /* sms ?????? ????????? */
        dispatch(insertAlarmText('SMS'));
        dispatch(showAlarmModal(true));
      }
    } else {
      /* ???????????? ????????? ?????? */
      dispatch(insertAlertText('????????? ?????? ????????????! ????'));
      dispatch(showAlertModal(true));
    }
  };

  /* ?????? ????????? ?????? ?????? ?????? */
  const ticketOpenCheck = (openDate?: Date): boolean => {
    if (openDate) {
      const strOpenDate = String(openDate);

      const year = Number(strOpenDate.substring(0, 4));
      const month = Number(strOpenDate.substring(5, 7)) - 1;
      const date = Number(strOpenDate.substring(8, 10));
      const hour = Number(strOpenDate.substring(11, 13)); // ?????? 24????????? ??????
      const minute = Number(strOpenDate.substring(14, 16));

      const today = new Date();
      const openDay = new Date(year, month, date, hour, minute);
      const gap = (openDay.getTime() - today.getTime()) / 1000 / 60 / 60; // ????????????

      if (gap > 24) return true;
      else {
        return false;
      }
    }
    return false;
  };

  /* Date ?????? ????????? ?????? */
  const dayFormatter = (openDate?: Date): string => {
    if (openDate) {
      const strOpenDate = openDate.toString();

      const year = strOpenDate.substring(0, 4);
      const month = strOpenDate.substring(5, 7);
      const date = strOpenDate.substring(8, 10);
      const hour = Number(strOpenDate.substring(11, 13)) + 9;
      const minute = strOpenDate.substring(14, 16);

      return String(
        year + '??? ' + month + '??? ' + date + '??? ' + hour + ' : ' + minute,
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
              alt='?????????????????? ???????????? ??????'
              onClick={() => {
                dispatch(setTarget(detailMain));
                dispatch(setIsLoading(true));
                dispatch(showConcertModal(true));
                navigate('/concert');
              }}
            />
          )}
        </div>
        <div id='fromWhereBox'>
          {detailMain.exclusive === '????????????' && (
            <div className='where'>????????????</div>
          )}
          {detailMain.exclusive === 'YES24' && (
            <div className='where'>YES24</div>
          )}
          {detailMain.exclusive === '' && (
            <>
              <div className='where'>????????????</div>
              <div className='where'>YES24</div>
            </>
          )}
        </div>
        <div id='titleBox'>
          <div id='h2AlignBox'>{detailMain && <h2>{detailMain.title}</h2>}</div>
        </div>
        <p id='date'>
          {detailMain &&
            `?????????: ${detailMain.post_date} | ?????????: ${detailMain.view}`}
        </p>
      </div>
      <div id='middleBox'>
        <div id='concertInfoBox'>
          <img
            src={detailMain && detailMain.image_concert}
            alt='?????????'
            id='selectedPoster'
          ></img>
          <div id='concertInfo'>
            <div className='table'>
              <div className='left-side'>
                {detailMain.place && (
                  <p className='left' id='place'>
                    ????????????
                  </p>
                )}
                {detailMain.period && (
                  <p className='left' id='date'>
                    ????????????
                  </p>
                )}
                {detailMain.running_time && (
                  <p className='left' id='time'>
                    ????????????
                  </p>
                )}
                {detailMain.rating && (
                  <p className='left' id='rating'>
                    ????????????
                  </p>
                )}
                {detailMain.price && (
                  <p className='left' id='price'>
                    ????????????
                  </p>
                )}
                <p className='left' id='alarm'>
                  ?????? ??????
                </p>
              </div>
              <div className='right-side'>
                {detailMain.place && (
                  <p className='right' id='place_r'>
                    <p onClick={() => dispatch(showMainKakaoModal(true))}>
                      {detailMain.place}
                    </p>
                    <img
                      src={map}
                      onClick={() => dispatch(showMainKakaoModal(true))}
                    ></img>
                  </p>
                )}
                {detailMain.period && (
                  <p className='right' id='date_r'>
                    {detailMain.period}
                  </p>
                )}
                {detailMain.running_time && (
                  <p className='right' id='time_r'>
                    {detailMain.running_time}
                  </p>
                )}
                {detailMain.rating && (
                  <p className='right' id='rating_r'>
                    {detailMain.rating}
                  </p>
                )}
                {detailMain.price && (
                  <p className='right' id='price_r'>
                    {detailMain.price}
                  </p>
                )}

                <p className='right' id='alarm_r'>
                  {ticketOpenCheck(detailMain.open_date) ? (
                    <>
                      <img
                        src={alarm.email_alarm ? emailOn : emailOff}
                        alt='??????????????????'
                        id='mailIcon2'
                        onClick={() => {
                          alarm.email_alarm
                            ? alarmDeleteHandler('email')
                            : alarmSetHandler('email');
                        }}
                      ></img>
                      <img
                        src={alarm.phone_alarm ? smsOn : smsOff}
                        alt='???????????????'
                        id='kakaoIcon2'
                        onClick={() => {
                          alarm.phone_alarm
                            ? alarmDeleteHandler('phone')
                            : alarmSetHandler('phone');
                        }}
                      ></img>
                    </>
                  ) : (
                    <p className='right' id='alarm_text'>
                      ?????? ?????? ??????????????? ???????????????.
                    </p>
                  )}
                  {ticketOpenCheck(detailMain.open_date)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id='buttonsWrapper'>
          {detailMain && (
            <button id='black-btn'>
              <div id='imgAndOpen'>
                <img
                  src={
                    (smsClick && ticketOpenCheck(detailMain.open_date)) ||
                    (emailClick && ticketOpenCheck(detailMain.open_date))
                      ? bellOn
                      : bellOff
                  }
                  alt='bellImg'
                />
                <p id='open'>
                  ?????? ????????? &nbsp; {dayFormatter(detailMain.open_date)}
                </p>
              </div>
            </button>
          )}
          {detailMain && (
            <a id='yellow-btn' href={detailMain.link} target='_blank'>
              ????????????
            </a>
          )}
        </div>
      </div>
      <div id='bottomBox'>
        <img src={comment} alt='commentImg' />
        <div>
          {mainTotalCommentsMain ? mainTotalCommentsMain : '0'}?????? ??????
        </div>
      </div>
    </div>
  );
}

export default MainConcertInfo;
