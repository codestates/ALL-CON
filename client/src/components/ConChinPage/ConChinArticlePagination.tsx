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
import React, { useState } from 'react';

function ConChinArticlePagination() {
  const dispatch = useDispatch();
  const { articleTotalPage, articleCurPage } = useSelector(
    (state: RootState) => state.conChin,
  );
  const { target } = useSelector((state: RootState) => state.main);
  const { articleOrder, allArticles } = useSelector(
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
            console.log(
              'ConChinArticlePagination=> 타겟이 없으니 정렬순으로 전체 표시합니다.',
            );
            console.log(allArticles);
          } else {
            console.log(
              'ConChinArticlePagination=> 없거나 실수로 못가져왔어요.',
            );
          }
        } else if (Object.keys(target).length > 0) {
          //target이 있을 때, target의 게시물에서 클릭한 pageNum 조회
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=${articleOrder}&pageNum=${pageNum}`,
            { withCredentials: true },
          );
          if (response.data) {
            dispatch(setAllArticles(response.data.data.articleInfo));
            console.log(
              'ConChinArticlePagination=> 타겟이 있으니 타겟에 종속된 게시물들을 표시합니다.',
            );
            console.log(allArticles);
          } else {
            console.log(
              'ConChinArticlePagination=> 없거나 실수로 못가져왔어요.',
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
      console.log(
        'ConChinArticlePagination=> 에러가 났나봐요. 게시물 없음 처리합니다.',
      );
      console.log(pageArr);
      dispatch(setAllArticles([]));
      dispatch(setArticleTotalPage(0));
    }
  };

  const getClickedPageNumber = (pageNum: number) => {
    console.log(pageNum);
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
