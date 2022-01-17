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
  setTargetIdx,
  setAllConcerts,
  setDetail,
  setIsRendering,
} from '../store/MainSlice';
import { showAlertModal, insertAlertText } from '../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function MainPage() {
  const dispatch = useDispatch();
  let { isRendering, order, target, detail, targetIdx, allConcerts } = useSelector(
    (state: RootState, ) => state.main, 
  );

  useEffect(() => {
    getAllConcerts();
    if(isRendering){
      dispatch(setTargetIdx(0));
      dispatch(setTarget(allConcerts[targetIdx]));
      getDetailInfo();
    }
  }, [isRendering]);
  
  useEffect(() => {
    getDetailInfo();
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
        dispatch(setTargetIdx(0));
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
      console.log('함수 진입전 target: ', target);
      if(target){
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/${target.id}`,
          { withCredentials: true },
        );
        if (res.data.data) {
          dispatch(setDetail(res.data.data.concertInfo));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='mainContainer'>
      <div id='mainJumboWrapper'><Jumbotron /></div>
      {isRendering && <div id='mainConcertInfoWrapper'><MainConcertInfo /></div>}
      {isRendering && <div id='mainCommentWrapper'><MainComment /></div>}
      {isRendering && <div id='mainPaginationWrapper'><MainPagination /></div>}
      <div id='mainFindConchinWrapper'><MainFindConchin /></div>
      <div id='fullFooter'>
        <div id='mainFooterWrapper'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
