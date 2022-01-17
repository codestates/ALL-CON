/* CSS import */
import refreshBtn from '../../images/refresh.png';
/* Store import */
import { RootState } from '../../index';
import { setTarget, setAllConcerts } from '../../store/MainSlice';
import {
  setArticleOrder,
  setAllArticles,
  setArticleTotalPage,
  setTargetArticle,
  setPostingOrder,
  setArticleCurPage,
  setArticleRendered,
} from '../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

function ConChinPostingOrderBox() {
  const dispatch = useDispatch();
  const { postingOrder } = useSelector((state: RootState) => state.conChin);
  const { target } = useSelector((state: RootState) => state.main);
  const { articleOrder, allArticles, articleRendered } = useSelector(
    (state: RootState) => state.conChin,
  );
  /*전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${postingOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        // resetTarget();
        dispatch(setAllConcerts(response.data.data.concertInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };
  /* 전체 게시물 받아오기 */
  const getAllArticles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        console.log('PostingOrderBox=> 전체 게시물을 받아왔습니다.');
        // resetTarget();
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
        dispatch(setArticleCurPage(1));
      } else {
        console.log('없거나 실수로 못가져왔어요..');
      }
    } catch (err) {
      console.log(err);
      console.log('에러가 났나봐요.');
    }
  };

  /* useEffect: 정렬순으로 전체 콘서트, 게시물 받아오기  */
  useEffect(() => {
    getAllConcerts();
    // getAllArticles();
  }, [postingOrder]);

  /* 타겟 초기화 핸들러 */
  const resetTargetHandler = () => {
    dispatch(setTarget({}));
    dispatch(setArticleRendered(false));
    dispatch(setTargetArticle({}));
    dispatch(setArticleCurPage(1));
  };
  return (
    <div
      id={
        Object.keys(target).length === 0
          ? 'bottomLineOrderBox'
          : 'bottomLineOrderBoxChosen'
      }
    >
      <div id='refreshBtnWrapper' onClick={resetTargetHandler}>
        <img className='refreshBtn' src={refreshBtn} alt='refreshBtn' />
      </div>
      <p
        className='order'
        onClick={() => {
          dispatch(setPostingOrder('view'));
          getAllConcerts();
          // getAllArticles();
        }}
        style={
          postingOrder === 'view'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        조회수
      </p>
      <p
        className='order'
        onClick={() => {
          dispatch(setPostingOrder('near'));
          getAllConcerts();
          // getAllArticles();
        }}
        style={
          postingOrder === 'near'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        임박예정
      </p>
      <p
        className='order'
        onClick={() => {
          dispatch(setPostingOrder('new'));
          getAllConcerts();
          // getAllArticles();
        }}
        style={
          postingOrder === 'new'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        등록일
      </p>
    </div>
  );
}
export default ConChinPostingOrderBox;
