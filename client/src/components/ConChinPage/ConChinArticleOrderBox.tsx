/* Store import */
import { RootState } from '../../index';
import {
  setArticleOrder,
  setAllArticles,
  setArticleTotalPage,
  setArticleCurPage,
  setArticleRendered,
  setIsLoadingArticle,
} from '../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConChinArticleOrderBox() {
  const dispatch = useDispatch();
  const { articleOrder, allArticles } = useSelector(
    (state: RootState) => state.conChin,
  );
  const { target } = useSelector((state: RootState) => state.main);

  /* useState => 지역상태 */
  const [conChinArticleOrder, setConChinArticleOrder] =
    useState<string>('view');

  const getAllArticles = async (viewOrNew: string) => {
    try {
      /* 로딩 상태 세팅 article */
      dispatch(setIsLoadingArticle(false));
      /* 타겟은 있지만 종속된 게시물이 없을때, 게시물 없음 표시 */
      if (
        Object.keys(target).length === 0 &&
        Object.keys(allArticles).length === 0
      ) {
      } else if (
        Object.keys(target).length === 0 &&
        Object.keys(allArticles).length !== 0
      ) {
        /* 타겟이 없지만 전체 표시중일 때 게시물 전체 정렬순에 맞게 정렬 */
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/article?order=${viewOrNew}`,
          { withCredentials: true },
        );
        if (response.data) {
          dispatch(setIsLoadingArticle(true));
          dispatch(setAllArticles(response.data.data.articleInfo));
          dispatch(setArticleTotalPage(response.data.data.totalPage));
          dispatch(setArticleCurPage(1));
        } else {
        }
      } else if (target === undefined || target === null) {
        dispatch(setArticleCurPage(1));
      } else {
        /* 로딩 상태 세팅 article */
        dispatch(setIsLoadingArticle(false));
        /* 타겟에 종속된 게시물 정렬순표시 */

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=${viewOrNew}`,
          { withCredentials: true },
        );
        if (response.data) {
          dispatch(setIsLoadingArticle(true));
          dispatch(setAllArticles(response.data.data.articleInfo));
          dispatch(setArticleTotalPage(response.data.data.totalPage));
          dispatch(setArticleCurPage(1));
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setArticleRendered(true));
      dispatch(setAllArticles([]));
      dispatch(setArticleTotalPage(0));
    }
  };

  /* 게시물 정렬순 교체 및 게시물 조회*/
  const setArticleOrderAndGetAllArticles = (viewOrNew: string) => {
    dispatch(setArticleOrder(viewOrNew));
    getAllArticles(viewOrNew);
  };

  /* articleOrder 변경시 지역상태 conChinArticleOrder 변경  */
  useEffect(() => {
    setConChinArticleOrder(articleOrder);
  }, [articleOrder]);

  return (
    <div id='noLineOrderBox'>
      <p
        className='order'
        onClick={() => {
          setArticleOrderAndGetAllArticles('view');
        }}
        style={
          conChinArticleOrder === 'view'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        조회수순
      </p>
      <p
        className='order'
        onClick={() => {
          setArticleOrderAndGetAllArticles('new');
        }}
        style={
          conChinArticleOrder === 'new'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        최신순
      </p>
    </div>
  );
}

export default ConChinArticleOrderBox;
