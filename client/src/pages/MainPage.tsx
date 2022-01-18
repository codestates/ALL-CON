/* Component import */
import Footer from '../components/Footer';
import Jumbotron from '../components/Jumbotron';
import MainComment from '../components/MainPage/MainComment';
import MainConcertInfo from '../components/MainPage/MainConcertInfo';
import MainFindConchin from '../components/MainPage/MainFindConchin';
import MainPagination from '../components/MainPage/MainPagination';
/* Store import */
import { RootState } from '../index';
import {
  setTarget,
  setAllConcerts,
  setDetail,
  setIsRendering,
} from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function MainPage() {
  const dispatch = useDispatch();
  const { isRendering, order, target, targetIdx, allConcerts } = useSelector(
    (state: RootState) => state.main,
  );

  /* order가 바뀔때 마다 렌더링될 useEffect */
  useEffect(() => {
    getAllConcerts(); // 전체 콘서트 목록
    getDetailInfo(); // 상세 콘서트 정보
  }, [isRendering]);

  /* targetIdx가 바뀔때 마다 렌더링될 useEffect */
  useEffect(() => {
    getDetailInfo(); // 상세 콘서트 정보
  }, [targetIdx]);

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
        // dispatch(setTargetIdx(0));
        dispatch(setTarget(allConcerts[targetIdx]));
      }
      /* 상세 콘서트 받아오기 & 렌더링 상태 변경 */
      dispatch(setIsRendering(true));
    } catch (err) {
      console.log(err);
    }
  };

  /* 상세 콘서트 받아오기 */
  const getDetailInfo = async () => {
    try {
      if (target) {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/${target.id}`,
          { withCredentials: true },
        );
        if (res.data.data) {
          /* 서버 응답값이 있다면 detail(상세정보) 갱신 */
          dispatch(setDetail(res.data.data.concertInfo));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='mainContainer'>
      <div id='mainJumboWrapper'>
        <Jumbotron />
      </div>
      {isRendering && (
        <div id='mainConcertInfoWrapper'>
          <MainConcertInfo />
        </div>
      )}
      {isRendering && (
        <div id='mainCommentWrapper'>
          <MainComment />
        </div>
      )}
      {isRendering && (
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
