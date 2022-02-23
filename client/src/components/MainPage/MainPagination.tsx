/* Store import */
import { RootState } from '../../index';
import {
  setPageAllComments,
  setTotalNum,
  setPageNum,
  setComment,
} from '../../store/ConcertCommentSlice';
import { setMainTotalComments } from '../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function MainPagination() {
  const dispatch = useDispatch();
  const { target, isRendering, allConcerts, targetIdx } = useSelector(
    (state: RootState) => state.main,
  );
  const { pageNum, totalNum } = useSelector(
    (state: RootState) => state.concertComments,
  );

  /* useState => 지역상태 */
  const [pageNumMain, setPageNumMain] = useState<number>(0);
  const [pageArrMain, setPageArrMain] = useState<any[]>(
    Array.from({ length: totalNum }, (v, i) => i + 1),
  );

  /* 모든 댓글 가져오기 함수 */
  const getPageComments = async (pageNum: number) => {
    try {
      /* response 변수에 서버 응답결과를 담는다 */
      if (isRendering && target) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/${target.id}/comment?pageNum=${pageNum}`,
          { withCredentials: true },
        );
        /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
        if (response.data) {
          /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */
          dispatch(setTotalNum(response.data.data.totalPage));
          dispatch(setPageAllComments(response.data.data.concertCommentInfo));
          dispatch(setMainTotalComments(response.data.data.totalComment));
          // dispatch(setPageNum(1));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 페이지 클릭시 페이지에 맞는 댓글 리스트 갱신 */
  const getClickedPageNumber = (pageNum: number) => {
    dispatch(setPageNum(pageNum));
    getPageComments(pageNum);
  };

  /* 현재 페이지에 맞는 댓글 리스트 갱신, 지역상태 할당 */
  useEffect(() => {
    getPageComments(pageNum);
    setPageNumMain(pageNum);
  }, [pageNum]);

  /* 전체 페이지 갱신 때마다 pagination 렌더링 */
  useEffect(() => {
    setPageArrMain(Array.from({ length: totalNum }, (v, i) => i + 1));
  }, [totalNum]);

  return (
    <div id='paginationWrapper'>
      <div id='pagination'>
        {/* 페이지 map */}
        {pageArrMain.map((num, idx) => (
          <ul
            className={num === pageNumMain ? 'pageChosen' : 'page'}
            key={idx}
            onClick={() => {
              getClickedPageNumber(num);
            }}
          >
            <p className='text'>{num}</p>
          </ul>
        ))}
      </div>
    </div>
  );
}
export default MainPagination;
