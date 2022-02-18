/* CSS import */
import refreshBtn from '../../images/refresh.png';
/* Store import */
import { RootState } from '../../index';
import { setTarget, setAllConcerts } from '../../store/MainSlice';
import {
  setAllArticles,
  setArticleTotalPage,
  setTargetArticle,
  setPostingOrder,
  setArticleOrder,
  setArticleCurPage,
  setArticleRendered,
} from '../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

function ConChinPostingOrderBox() {
  const dispatch = useDispatch();
  const { target, allConcerts } = useSelector((state: RootState) => state.main);
  const {
    postingOrder,
    articleOrder,
    allArticles,
    articleRendered,
    targetArticle,
  } = useSelector((state: RootState) => state.conChin);

  /* useState => 지역상태 */
  const [conChinPostingOrder, setConChinPostingOrder] =
    useState<String>('view');

  /*전체 콘서트 받아오기 */
  const getAllConcerts = async (clickedPostingOrder: String) => {
    if (Object.keys(targetArticle).length === 0) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert?order=${clickedPostingOrder}`,
          { withCredentials: true },
        );
        if (response.data) {
          dispatch(setAllConcerts(response.data.data.concertInfo));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  /* 전체 게시물 받아오기 */
  const getAllArticles = async (order: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/article?order=${order}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 타겟 초기화 핸들러 */
  const resetTargetHandler = () => {
    dispatch(setPostingOrder('view'));
    dispatch(setArticleOrder('view'));
    dispatch(setTarget({}));
    dispatch(setArticleRendered(false));
    dispatch(setTargetArticle({}));
    dispatch(setArticleCurPage(1));
    getAllConcerts('view');
    getAllArticles('view');
  };

  /* postingOrder 변경시 지역상태 conChinPostingOrder 변경  */
  useEffect(() => {
    setConChinPostingOrder(postingOrder);
  }, [postingOrder]);

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
          if (Object.keys(target).length === 0) {
            dispatch(setPostingOrder('view'));
            getAllConcerts('view');
            getAllArticles(articleOrder);
          }
        }}
        style={
          conChinPostingOrder === 'view'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        조회수
      </p>
      <p
        className='order'
        onClick={() => {
          if (Object.keys(target).length === 0) {
            dispatch(setPostingOrder('near'));
            getAllConcerts('near');
            getAllArticles(articleOrder);
          }
        }}
        style={
          conChinPostingOrder === 'near'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        임박예정
      </p>
      <p
        className='order'
        onClick={() => {
          if (Object.keys(target).length === 0) {
            dispatch(setPostingOrder('new'));
            getAllConcerts('new');
            getAllArticles(articleOrder);
          }
        }}
        style={
          conChinPostingOrder === 'new'
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
