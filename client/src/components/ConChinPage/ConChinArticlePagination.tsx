/* Store import */
import {
  setAllArticles,
  setArticleTotalPage,
  setArticleCurPage,
  setIsLoadingArticle,
} from '../../store/ConChinSlice';
import { RootState } from '../../index';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function ConChinArticlePagination() {
  const dispatch = useDispatch();
  const { articleTotalPage, articleCurPage } = useSelector(
    (state: RootState) => state.conChin,
  );
  const { target } = useSelector((state: RootState) => state.main);
  const { articleOrder } = useSelector((state: RootState) => state.conChin);

  /* useState => 지역상태 */
  const [conChinArticleCurPage, setConChinArticleCurPage] = useState<number>(0);
  const [conChinPageArr, setConChinPageArr] = useState<any[]>(
    Array.from({ length: articleTotalPage }, (v, i) => i + 1),
  );

  /* 페이지 클릭시 페이지에 맞는 게시물 리스트 갱신 */
  const getClickedPageNumber = (pageNum: number) => {
    dispatch(setArticleCurPage(pageNum));
    getPageArticles(pageNum);
  };

  /* 페이지에 맞는 게시물 받아오기 */
  const getPageArticles = async (pageNum: number) => {
    try {
      /* 로딩 상태 세팅 article */
      dispatch(setIsLoadingArticle(false));
      //페이지 길이가 1 이상일 때
      if (conChinPageArr.length > 0) {
        //target이 없을 때, 전체 게시물에서 클릭한 pageNum 조회
        if (Object.keys(target).length === 0) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}&pageNum=${pageNum}`,
            { withCredentials: true },
          );
          if (response.data) {
            dispatch(setIsLoadingArticle(true));
            dispatch(setAllArticles(response.data.data.articleInfo));
            dispatch(setArticleTotalPage(response.data.data.totalPage));
          } else {
          }
        } else if (Object.keys(target).length > 0) {
          /* 로딩 상태 세팅 article */
          dispatch(setIsLoadingArticle(false));
          //target이 있을 때, target의 게시물에서 클릭한 pageNum 조회
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=${articleOrder}&pageNum=${pageNum}`,
            { withCredentials: true },
          );
          if (response.data) {
            dispatch(setIsLoadingArticle(true));
            dispatch(setAllArticles(response.data.data.articleInfo));
            dispatch(setArticleTotalPage(response.data.data.totalPage));
          } else {
          }
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setAllArticles([]));
      dispatch(setArticleTotalPage(0));
    }
  };

  /* 현재 페이지에 맞는 게시물 리스트 갱신, 지역상태 할당 */
  useEffect(() => {
    getPageArticles(articleCurPage);
    setConChinArticleCurPage(articleCurPage);
  }, [articleCurPage]);

  /* 전체 페이지 갱신 때마다 pagination 렌더링 */
  useEffect(() => {
    setConChinPageArr(
      Array.from({ length: articleTotalPage }, (v, i) => i + 1),
    );
  }, [articleTotalPage]);

  return (
    <div id='pagination'>
      {conChinPageArr.length > 0
        ? conChinPageArr.map((el, idx) => {
            return (
              <ul
                className={
                  conChinArticleCurPage === idx + 1 ? 'pageChosen' : 'page'
                }
                key={idx}
                onClick={() => {
                  getClickedPageNumber(el);
                }}
              >
                <p className='text'>{el}</p>
              </ul>
            );
          })
        : null}
    </div>
  );
}

export default ConChinArticlePagination;
