/* CSS import */
import PosterSlide from './PosterSlide';
import left from '../images/left_arrow.png';
import right from '../images/right_arrow.png';
/* Store import */
import { RootState } from '../index';
import {
  setTarget,
  setTargetIdx,
  setOrder,
  setIsRendering,
  setPassToConcert,
  setAllConcerts,
  setDetail,
} from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPageNum } from '../store/ConcertCommentSlice';

function Jumbotron() {
  const dispatch = useDispatch();
  const { order, target, targetIdx, allConcerts } = useSelector(
    (state: RootState) => state.main,
  );

  /* useState => 지역상태 */
  const [orderJumbo, setOrderJumbo] = useState('view');

  useEffect(() => {
    setOrderJumbo(order);
  }, [order]);

  /* 포스터 이동 핸들러 */
  const moveHandler = (move: string) => {
    if (move === 'left') {
      if (targetIdx > 0) {
        dispatch(setTargetIdx(targetIdx - 1));
        dispatch(setTarget(allConcerts[targetIdx - 1]));
        dispatch(setPageNum(1));
      }
    } else if (move === 'right') {
      if (targetIdx < allConcerts.length - 1) {
        dispatch(setTargetIdx(targetIdx + 1));
        dispatch(setTarget(allConcerts[targetIdx + 1]));
        dispatch(setPageNum(1));
      }
    }
    dispatch(setPassToConcert(false)); // 콘서트 -> 메인 페이지 상태 false
  };

  /* orderClick 핸들러 */
  const orderClickHandler = (clickValue: string) => {
    /* 정렬 버튼 클릭시 렌더링: false, 타겟값 초기화, order 갱신 */
    dispatch(setIsRendering(false));
    dispatch(setTargetIdx(0));
    // dispatch(setTarget(allConcerts[targetIdx]));
    dispatch(setOrder(clickValue));
    getAllConcerts(clickValue);
    dispatch(setPageNum(1));
  };

  /*전체 콘서트 받아오기 */
  const getAllConcerts = async (clickValue: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${clickValue}`,
        { withCredentials: true },
      );
      if (response.data) {
        /* 서버 응답값이 있다면 & target 상태 변경 */
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setTarget(response.data.data.concertInfo[0]));
        /* 상세 콘서트 받아오기 & 렌더링 상태 변경 */
        dispatch(setIsRendering(true));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div id='jumboContainer'>
        <div id='jumboMiniContainer'></div>
        {/*점보트론 검은배경 전체*/}
        <div className='jumboTopBox'>
          <div id='jumboTextsAlignBox'>
            {/*WHAT'S HOT 문구*/}
            <div className='jumboTextBox'>
              <h1 id='jumboWhat'>WHAT'S</h1>
              {orderJumbo === 'view' && <h1 id='jumboClassify'>HOT</h1>}
              {orderJumbo === 'near' && <h1 id='jumboClassify'>NEAR</h1>}
              {orderJumbo === 'new' && <h1 id='jumboClassify'>NEW</h1>}
            </div>
            {/*오른쪽 상단 탭 바*/}
            <div id='tabBar'>
              <p
                id={orderJumbo === 'view' ? 'hotChosen' : 'hot'}
                onClick={() => {
                  orderClickHandler('view');
                }}
              >
                HOT
              </p>
              <p
                id={orderJumbo === 'near' ? 'nearChosen' : 'near'}
                onClick={() => {
                  orderClickHandler('near');
                }}
              >
                NEAR
              </p>
              <p
                id={orderJumbo === 'new' ? 'newChosen' : 'new'}
                onClick={() => {
                  orderClickHandler('new');
                }}
              >
                NEW
              </p>
            </div>
          </div>
          {/*포스터 wrapper*/}
          <div id='jumboPosterSlideWrapper'>
            <div id='posterCover'></div>
            <PosterSlide />
          </div>
        </div>
      </div>
    </>
  );
}
export default Jumbotron;
