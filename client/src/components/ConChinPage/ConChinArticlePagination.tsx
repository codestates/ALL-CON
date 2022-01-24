/* Store import */
import {
  setAllArticles,
  setArticleTotalPage,
  setArticleCurPage,
} from '../../store/ConChinSlice';
import { setTarget } from '../../store/MainSlice';
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
  const { articleOrder, allArticles, targetArticle } = useSelector(
    (state: RootState) => state.conChin,
  );

  const pageArr = Array.from({ length: articleTotalPage }, (v, i) => i + 1);

  const getPageArticles = async (pageNum: number) => {
    try {
      //페이지 길이가 1 이상일 때
      if (pageArr.length > 0) {
        //target이 없을 때, 전체 게시물에서 클릭한 pageNum 조회
        if (Object.keys(target).length === 0) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}&pageNum=${pageNum}`,
            { withCredentials: true },
          );
          if (response.data) {
            dispatch(setAllArticles(response.data.data.articleInfo));
            dispatch(setArticleTotalPage(response.data.data.totalPage));
          } else {
            // console.log(
            //   'ConChinArticlePagination=> 없거나 실수로 못가져왔어요.',
            // );
          }
        } else if (Object.keys(target).length > 0) {
          //target이 있을 때, target의 게시물에서 클릭한 pageNum 조회
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=${articleOrder}&pageNum=${pageNum}`,
            { withCredentials: true },
          );
          if (response.data) {
            dispatch(setAllArticles(response.data.data.articleInfo));
            dispatch(setArticleTotalPage(response.data.data.totalPage));
          } else {
            // console.log(
            //   'ConChinArticlePagination=> 없거나 실수로 못가져왔어요.',
            // );
          }
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setAllArticles([]));
      dispatch(setArticleTotalPage(0));
    }
  };

  useEffect(() => {
    getPageArticles(articleCurPage);
  }, [articleCurPage]);
  useEffect(() => {
    getPageArticles(articleCurPage);
  }, [articleTotalPage]);

  const getClickedPageNumber = (pageNum: number) => {
    // console.log(pageNum);
    dispatch(setArticleCurPage(pageNum));
    getPageArticles(pageNum);
  };

  return (
    <div id='pagination'>
      {pageArr.length > 0
        ? pageArr.map((el, idx) => {
            return (
              <ul
                className={articleCurPage === idx + 1 ? 'pageChosen' : 'page'}
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
