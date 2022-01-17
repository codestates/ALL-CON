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
} from '../store/MainSlice';
import { showAlertModal, insertAlertText } from '../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Jumbotron() {
  const dispatch = useDispatch();
  const { order, targetIdx, allConcerts } = useSelector(
    (state: RootState) => state.main,
  );

  const leftClickHandler = () => {
    if (targetIdx > 0) {
      dispatch(setTargetIdx(targetIdx - 1));
      dispatch(setTarget(allConcerts[targetIdx - 1]));
    }
  };

  const rigthClickHandler = () => {
    if (targetIdx < allConcerts.length - 1) {
      dispatch(setTargetIdx(targetIdx + 1));
      dispatch(setTarget(allConcerts[targetIdx + 1]));
    }
  };

  const orderClickHandler = (clickOrder: string) => {
    /* 정렬 버튼 클릭시 렌더링: false, 타겟값 초기화, order 갱신 */
    dispatch(setIsRendering(false));
    dispatch(setTargetIdx(0));
    dispatch(setTarget({}));
    dispatch(setOrder(clickOrder));
  };

  return (
    <div id='jumboContainer'>
      <div id='jumboMiniContainer'></div>
      {/*점보트론 검은배경 전체*/}
      <div className='jumboTopBox'>
        <div id='jumboTextsAlignBox'>
          {/*WHAT'S HOT 문구*/}
          <div className='jumboTextBox'>
            <h1 id='jumboWhat'>WHAT'S</h1>
            {order === 'hot' && <h1 id='jumboClassify'>HOT</h1>}
            {order === 'near' && <h1 id='jumboClassify'>NEAR</h1>}
            {order === 'new' && <h1 id='jumboClassify'>NEW</h1>}
          </div>
          {/*오른쪽 상단 탭 바*/}
          <div id='tabBar'>
            <p id={order === 'hot' ? 'hot' : undefined} onMouseUp={() => { orderClickHandler('hot') }} onMouseDown={() => { orderClickHandler('hot') }}>
              HOT
            </p>
            <p id={order === 'near' ? 'near' : undefined} onMouseUp={() => { orderClickHandler('near') }} onMouseDown={() => { orderClickHandler('near') }}>
              NEAR
            </p>
            <p id={order === 'new' ? 'new' : undefined} onMouseUp={() => { orderClickHandler('new') }} onMouseDown={() => { orderClickHandler('new') }}>
              NEW
            </p>
          </div>
        </div>
        {/*포스터 wrapper*/}
        <div id='jumboPosterSlideWrapper'>
          <div id='arrows'>
            <img
              id='left'
              src={left}
              alt='왼쪽 화살표'
              onClick={leftClickHandler}
            ></img>
            <img
              id='right'
              src={right}
              alt='오른쪽 화살표'
              onClick={rigthClickHandler}
            ></img>
          </div>
          <PosterSlide />
        </div>
      </div>
    </div>
  );
}
export default Jumbotron;
