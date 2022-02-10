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
  const { target, allConcerts } = useSelector((state: RootState) => state.main);
  const { articleOrder, allArticles, articleRendered, targetArticle } =
    useSelector((state: RootState) => state.conChin);

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
  const getAllArticles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        // console.log('PostingOrderBox=> 전체 게시물을 받아왔습니다.');
        // resetTarget();

        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
      } else {
        // console.log('없거나 실수로 못가져왔어요..');
      }
    } catch (err) {
      console.log(err);
      console.log('에러가 났나봐요.');
    }
  };

  /* useEffect: 정렬순으로 전체 콘서트, 게시물 받아오기  */
  // useEffect(() => {
  //   /* 타겟이 없을 때 모든 콘서트 보여주기 */
  //   if (Object.keys(target).length === 0) {
  //     getAllConcerts();
  //     getAllArticles();
  //     dispatch(setTarget({}));
  //     dispatch(setArticleRendered(false));
  //     dispatch(setTargetArticle({}));
  //     dispatch(setArticleCurPage(1));
  //     /* 타겟이 있고 타겟 게시물이 없을 때 타겟에 대한 게시물만 보여주기*/
  //   } else if (
  //     Object.keys(target).length > 0 &&
  //     Object.keys(targetArticle).length === 0
  //   ) {
  //     dispatch(setTargetArticle({}));
  //     dispatch(setArticleRendered(true));
  //     dispatch(setArticleCurPage(1));
  //   }
  // }, [postingOrder]);

  /* 타겟 초기화 핸들러 */
  const resetTargetHandler = () => {
    dispatch(setTarget({}));
    dispatch(setArticleRendered(false));
    dispatch(setTargetArticle({}));
    dispatch(setArticleCurPage(1));
    getAllConcerts(conChinPostingOrder);
    getAllArticles();
  };

  /* postingOrder 변경시 지역상태 conChinPostingOrder 변경  */
  useEffect(() => {
    setConChinPostingOrder(postingOrder);
    // console.log('conChinPostingOrder:');
    // console.log(conChinPostingOrder);
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
            getAllArticles();
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
            getAllArticles();
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
            getAllArticles();
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
