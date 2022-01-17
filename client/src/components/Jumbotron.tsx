/* CSS import */
import PosterSlide from './PosterSlide';
import left from '../images/left_arrow.png';
import right from '../images/right_arrow.png';
/* Store import */
import { RootState } from '../index';
import {
  setTarget,
  setTargetZero,
  setTargetIdx,
  setAllConcerts,
  setFirstConcert,
  setSecondConcert,
  setThirdConcert,
  setFourthConcert,
  setFifthConcert,
} from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Jumbotron() {
  const dispatch = useDispatch();

  const { target } = useSelector((state: RootState) => state.main);
  const { allConcerts } = useSelector((state: RootState) => state.main);
  const { targetIdx } = useSelector((state: RootState) => state.main);

  const [isClick, setIsClick] = useState(false);
  const [clickedOrder, setClickedOrder] = useState('hot');

  console.log(clickedOrder);
  let lastIdx = allConcerts.length - 1;

  /*전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${clickedOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        //allConcerts 배열에 전체 콘서트 정보를 담음
        dispatch(setAllConcerts(response.data.data.concertInfo));
        //targetIdx의 인덱스 세팅
        dispatch(setTargetIdx(0));
        dispatch(setTarget(allConcerts[0])); // target을 0번째 콘서트로 세팅
        updateFiveConcertsRight();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //현재 선택된 포스터 바꾸기(뒷배경 큰 포스터)
  const getTargetPoster = () => {
    dispatch(setTarget(allConcerts[targetIdx]));
  };

  const updateFiveConcertsRight = () => {
    if (targetIdx === 0) {
      /*targetIdx가 0일때 (처음 상황)*/
      dispatch(setFirstConcert(allConcerts[lastIdx - 1]));
      dispatch(setSecondConcert(allConcerts[lastIdx]));
      dispatch(setThirdConcert(allConcerts[targetIdx]));
      dispatch(setFourthConcert(allConcerts[targetIdx + 1]));
      dispatch(setFifthConcert(allConcerts[targetIdx + 2]));
      console.log('targetIdx', targetIdx);
    } else if (targetIdx === 1) {
      /*targetIdx가 1일때 (오른쪽 넘김 +1)*/
      dispatch(setFirstConcert(allConcerts[lastIdx]));
      dispatch(setSecondConcert(allConcerts[targetIdx - 1]));
      dispatch(setThirdConcert(allConcerts[targetIdx]));
      dispatch(setFourthConcert(allConcerts[targetIdx + 1]));
      dispatch(setFifthConcert(allConcerts[targetIdx + 2]));
      console.log('targetIdx', targetIdx);
    } else {
      dispatch(setFirstConcert(allConcerts[targetIdx - 2]));
      dispatch(setSecondConcert(allConcerts[targetIdx - 1]));
      dispatch(setThirdConcert(allConcerts[targetIdx]));
      dispatch(setFourthConcert(allConcerts[targetIdx + 1]));
      dispatch(setFifthConcert(allConcerts[targetIdx + 2]));
      console.log('targetIdx', targetIdx);
    }
  };

  const updateFiveConcertsLeft = () => {
    if (targetIdx === 0) {
      dispatch(setFirstConcert(allConcerts[lastIdx - 1]));
      dispatch(setSecondConcert(allConcerts[lastIdx]));
      dispatch(setThirdConcert(allConcerts[targetIdx]));
      dispatch(setFourthConcert(allConcerts[targetIdx + 1]));
      dispatch(setFifthConcert(allConcerts[targetIdx + 2]));
      console.log('targetIdx', targetIdx);
    } else if (targetIdx === 1) {
      dispatch(setFirstConcert(allConcerts[lastIdx]));
      dispatch(setSecondConcert(allConcerts[targetIdx - 1]));
      dispatch(setThirdConcert(allConcerts[targetIdx]));
      dispatch(setFourthConcert(allConcerts[targetIdx + 1]));
      dispatch(setFifthConcert(allConcerts[targetIdx + 2]));
      console.log('targetIdx', targetIdx);
    } else {
      dispatch(setFirstConcert(allConcerts[targetIdx - 2]));
      dispatch(setSecondConcert(allConcerts[targetIdx - 1]));
      dispatch(setThirdConcert(allConcerts[targetIdx]));
      dispatch(setFourthConcert(allConcerts[targetIdx + 1]));
      dispatch(setFifthConcert(allConcerts[targetIdx + 2]));
      console.log('targetIdx', targetIdx);
    }
  };

  const onClickHandlerLeft = () => {
    if (targetIdx > 0) {
      dispatch(setTargetIdx(targetIdx - 1));
      updateFiveConcertsLeft();
      setIsClick(!isClick);
    } else if (targetIdx === 0) {
      updateFiveConcertsLeft();
      setIsClick(!isClick);
    } else if (targetIdx === lastIdx) {
      dispatch(setTargetIdx(targetIdx - 1));
      updateFiveConcertsLeft();
      setIsClick(!isClick);
    }
  };

  const onClickHandlerRight = () => {
    if (allConcerts.length > 5 && targetIdx <= lastIdx) {
      if (targetIdx >= 0 && targetIdx !== lastIdx) {
        dispatch(setTargetIdx(targetIdx + 1));
        updateFiveConcertsRight();
        setIsClick(!isClick);
      } else if (targetIdx === lastIdx) {
        updateFiveConcertsRight();
        setIsClick(!isClick);
      } else if (targetIdx === -1) {
        dispatch(setTargetIdx(targetIdx + 1));
        updateFiveConcertsRight();
        setIsClick(!isClick);
      }
    }
  };

  useEffect(() => {
    getTargetPoster();
  }, [isClick]);

  useEffect(() => {
    getAllConcerts();
  }, [clickedOrder]);

  return (
    <div id='jumboContainer'>
      <div id='jumboMiniContainer'>
        {/* 뒷배경 선택된 포스터*/}
        {target ? (
          <img
            src={target.image_concert}
            alt='선택된 포스터'
            id='jumboChosen'
          />
        ) : null}
      </div>
      {/*점보트론 검은배경 전체*/}
      <div className='jumboTopBox'>
        <div id='jumboTextsAlignBox'>
          {/*WHAT'S HOT 문구*/}
          <div className='jumboTextBox'>
            <h1 id='jumboWhat'>WHAT'S</h1>
            {clickedOrder === 'hot' ? (
              <h1 id='jumboClassify'>HOT</h1>
            ) : clickedOrder === 'near' ? (
              <h1 id='jumboClassify'>NEAR</h1>
            ) : clickedOrder === 'new' ? (
              <h1 id='jumboClassify'>NEW</h1>
            ) : null}
          </div>
          {/*오른쪽 상단 탭 바*/}
          <div id='tabBar'>
            <p
              id={clickedOrder === 'hot' ? 'hot' : undefined}
              onClick={() => {
                setClickedOrder('hot');
                setIsClick(!isClick);
              }}
            >
              HOT
            </p>
            <p
              id={clickedOrder === 'near' ? 'near' : undefined}
              onClick={() => {
                setClickedOrder('near');
                setIsClick(!isClick);
              }}
            >
              NEAR
            </p>
            <p
              id={clickedOrder === 'new' ? 'new' : undefined}
              onClick={() => {
                setClickedOrder('new');
                setIsClick(!isClick);
              }}
            >
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
              onClick={
                targetIdx >= 0
                  ? () => {
                      onClickHandlerLeft();
                    }
                  : undefined
              }
            ></img>
            <img
              id='right'
              src={right}
              alt='오른쪽 화살표'
              onClick={
                allConcerts.length > 5 && targetIdx <= lastIdx
                  ? () => {
                      onClickHandlerRight();
                    }
                  : () => {
                      console.log('마지막입니다. 오른쪽으로 넘길 수 없어요');
                    }
              }
            ></img>
          </div>
          <PosterSlide />
        </div>
      </div>
    </div>
  );
}
export default Jumbotron;
