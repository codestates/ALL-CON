/* Store import */
import { RootState } from '../../index';
import {
  setConChinPageAllComments,
  setConChinPageNum,
  setConChinTotalNum,
  setConChinTotalComments,
} from '../../store/ConChinCommentSlice';
import { setIsLoadingArticleComment } from '../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function ConChinCommentPagination() {
  const dispatch = useDispatch();
  const { target } = useSelector((state: RootState) => state.main);
  const { targetArticle } = useSelector((state: RootState) => state.conChin);
  const { conChinPageNum, conChinTotalNum } = useSelector(
    (state: RootState) => state.conChinComments,
  );

  /* useState => 지역상태 */
  const [conChinConChinPageNum, setConChinConChinPageNum] = useState<number>(0);
  const [conChinPageArr, setConChinPageArr] = useState<any[]>(
    Array.from({ length: conChinTotalNum }, (v, i) => i + 1),
  );

  /* 페이지 클릭시 페이지에 맞는 댓글 리스트 갱신 */
  const getClickedPageNumber = (pageNum: number) => {
    dispatch(setConChinPageNum(pageNum));
    getPageComments(pageNum);
  };

  /* 모든 댓글 가져오기 함수 */
  const getPageComments = async (pageNum: number) => {
    try {
      /* 로딩 상태 세팅 articleComment */
      dispatch(setIsLoadingArticleComment(false));
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${targetArticle.id}/comment?pageNum=${pageNum}`,
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
      if (response.data) {
        /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */
        dispatch(setIsLoadingArticleComment(true));
        dispatch(setConChinPageAllComments([]));
        dispatch(setConChinTotalNum(0));
        dispatch(setConChinTotalNum(response.data.data.totalPage));
        dispatch(
          setConChinPageAllComments(response.data.data.articleCommentInfo),
        );
        dispatch(setConChinTotalComments(response.data.data.totalComment));
      }
    } catch (err) {
      /* 로딩 상태 세팅 articleComment */
      dispatch(setIsLoadingArticleComment(false));
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${
          targetArticle.id
        }/comment?pageNum=${1}`,
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
      if (response.data) {
        dispatch(setIsLoadingArticleComment(true));
        /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */
        dispatch(setConChinPageAllComments([]));
        dispatch(
          setConChinPageAllComments(response.data.data.articleCommentInfo),
        );
        dispatch(setConChinTotalComments(response.data.data.totalComment));
      }
    }
  };

  /* 현재 페이지에 맞는 댓글 리스트 갱신, 지역상태 할당 */
  useEffect(() => {
    getPageComments(conChinPageNum);
    setConChinConChinPageNum(conChinPageNum);
  }, [conChinPageNum]);

  /* 전체 페이지 갱신 때마다 pagination 렌더링 */
  useEffect(() => {
    setConChinPageArr(Array.from({ length: conChinTotalNum }, (v, i) => i + 1));
  }, [conChinTotalNum]);

  return (
    <div id='pagination'>
      {/* 페이지 map */}
      {conChinPageArr.map((num, idx) => (
        <ul
          className={num === conChinConChinPageNum ? 'pageChosen' : 'page'}
          onClick={() => {
            getClickedPageNumber(num);
          }}
        >
          <p className='text' key={idx}>
            {num}
          </p>
        </ul>
      ))}
    </div>
  );
}
export default ConChinCommentPagination;
