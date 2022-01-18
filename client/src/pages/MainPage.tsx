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
import { setTotalNum, setPageAllComments } from '../store/ConcertCommentSlice'
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function MainPage() {
  const dispatch = useDispatch();
  const { isRendering, order, target, targetIdx, allConcerts } = useSelector(
    (state: RootState) => state.main,
  );
  const { pageAllComments, pageNum } = useSelector(
    (state: RootState) => state.concertComments,
  );

  const { isLogin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getAllConcerts(); // 전체 콘서트 목록
    getDetailInfo(); // 상세 콘서트 정보
    getAllComments(); // 전체 댓글 목록
  }, [isRendering]);

  useEffect(() => {
    getDetailInfo(); // 상세 콘서트 정보
  }, [targetIdx, order, pageAllComments]);

  useEffect(() => {
    getAllComments(); // 전체 댓글 목록
  }, [targetIdx, order, pageNum]);

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

  /* 모든 댓글 가져오기 함수 */
  const getAllComments = async () => {
    try {
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/comment?pageNum=${pageNum}`,
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
      if (response.data) {
        /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */
        dispatch(setTotalNum(response.data.data.totalPage));
        dispatch(setPageAllComments(response.data.data.concertCommentInfo));
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
