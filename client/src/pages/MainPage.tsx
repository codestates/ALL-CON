/* Component import */
import Footer from '../components/Footer';
import Jumbotron from '../components/Jumbotron';
import MainComment from '../components/MainPage/MainComment';
import MainConcertInfo from '../components/MainPage/MainConcertInfo';
import MainFindConchin from '../components/MainPage/MainFindConchin';
import MainPagination from '../components/MainPage/MainPagination';
/* Store import */
import { RootState } from '../index';
import { loginCheck } from '../store/AuthSlice';
import {
  setTarget,
  setAllConcerts,
  setDetail,
  setIsRendering,
  setMainTotalComments,
} from '../store/MainSlice';
import {
  setAlarm,
  setAllAlarms,
  setEmailClick,
  setSmsClick,
} from '../store/ConcertAlarmSlice';
import { setTotalNum, setPageAllComments } from '../store/ConcertCommentSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function MainPage() {
  const dispatch = useDispatch();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { isRendering, order, target, targetIdx, allConcerts, detail } =
    useSelector((state: RootState) => state.main);
  const { allAlarms, alarm, emailClick, smsClick } = useSelector(
    (state: RootState) => state.concertAlarm,
  );
  const { pageAllComments, pageNum } = useSelector(
    (state: RootState) => state.concertComments,
  );
  //지역 상태
  const [isRenderingMain, setIsRenderingMain] = useState(false);

  /* 전체 콘서트 렌더링 */
  useEffect(() => {
    getAllConcerts(); // 전체 콘서트 목록
  }, [isLogin]);
  // isRendering]);

  /* 상세 콘서트 정보 & 알람 정보 렌더링 */
  useEffect(() => {
    // getDetailInfo(); // 상세 콘서트 정보
    getDetailAlarmInfo();
  }, [target]);
  // , pageAllComments]);

  /* 전체 알람 렌더링 */
  useEffect(() => {
    if (isLogin) getAllAlarms(); // 전체 알람 목록
  }, [isRendering, emailClick, smsClick, isLogin]);

  /* 전체 댓글 목록 렌더링 (좌우버튼 클릭시, 정렬버튼 클릭시, 현재 포스터정보 변경시) */
  // useEffect(() => {
  //   getAllComments(); // 전체 댓글 목록
  // }, [target, pageNum]);
  // , isLogin]);

  //지역상태 변경
  useEffect(() => {
    setIsRenderingMain(isRendering);
  }, [isRendering]);

  /*전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${order}`,
        { withCredentials: true },
      );
      if (response.data) {
        /* 서버 응답값이 있다면 & target 상태 변경 */
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setTarget(response.data.data.concertInfo[0]));
        /* 상세 콘서트 받아오기 & 렌더링 상태 변경 */
        dispatch(setIsRendering(true));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 모든 알람 가져오기 */
  const getAllAlarms = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/alarm`,
        { withCredentials: true },
      );
      // Axios 결과 로그아웃 상태시 MainPage Redirect
      if (response.data.message === 'Unauthorized userInfo!')
        return dispatch(loginCheck(false));

      if (response.data.data.myAllAlarmInfo) {
        const all = response.data.data.myAllAlarmInfo;
        //모든 알람 allAlarms에 배열로 저장
        dispatch(setAllAlarms(all));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 상세 콘서트 알람 여부 확인 함수 */
  const getDetailAlarmInfo = () => {
    /* 현재 target.id와 일치하며, 현재 로그인한 userInfo.id와 일치하는 알람을 가져온다. */
    const myAlarmArray = allAlarms
      .filter(alarm => alarm.concert_id === target.id)
      .filter(alarm => alarm.user_id === userInfo.id);
    /* myAlarmArray에 값이 있다면? */
    if (myAlarmArray.length > 0) {
      // 전역 상태값을 바꿔준다.
      const myAlarm = myAlarmArray[0];
      dispatch(setAlarm(myAlarm));
      /* 현재 알람 정보 필드값에 따라 클릭버튼 상태 변경 */
      if (myAlarm.email_alarm && myAlarm.phone_alarm) {
        dispatch(setEmailClick(true));
        dispatch(setSmsClick(true));
      } else if (myAlarm.email_alarm) {
        dispatch(setEmailClick(true));
        dispatch(setSmsClick(false));
      } else if (myAlarm.phone_alarm) {
        dispatch(setEmailClick(false));
        dispatch(setSmsClick(true));
      } else {
        dispatch(setAlarm({}));
        dispatch(setEmailClick(false));
        dispatch(setSmsClick(false));
      }
    } else {
      dispatch(setAlarm({}));
      dispatch(setEmailClick(false));
      dispatch(setSmsClick(false));
    }
  };

  return (
    <div id='mainContainer'>
      <div id='mainJumboWrapper'>
        <Jumbotron />
      </div>
      {isRenderingMain && (
        <div id='mainConcertInfoWrapper'>
          <MainConcertInfo />
        </div>
      )}
      {isRenderingMain && (
        <div id='mainCommentWrapper'>
          <MainComment />
        </div>
      )}
      {isRenderingMain && (
        <div id='mainPaginationWrapper'>
          <MainPagination />
        </div>
      )}
      <div id='mainFindConchinWrapper'>
        <MainFindConchin />
      </div>
      <div id='fullFooter'>
        <div id='mainFooterWrapper'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
