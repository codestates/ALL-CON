/* Component import */
import JumbotronTabBar from './JumbotronTabBar';
/* CSS import */
import PosterSlide from './PosterSlide';
import left from '../images/left_arrow.png';
import right from '../images/right_arrow.png';
/* Store import */
import { RootState } from '../index';
import {
  setOrder,
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
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Jumbotron() {
  const dispatch = useDispatch();

  const { order } = useSelector((state: RootState) => state.main);
  const { target } = useSelector((state: RootState) => state.main);
  const { allConcerts } = useSelector((state: RootState) => state.main);
  const { targetIdx } = useSelector((state: RootState) => state.main);

  const [isClick, setIsClick] = useState('disclicked');

  let lastIdx = allConcerts.length - 1;

  /*전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${order}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setTarget(allConcerts[0])); // target을 0번째 콘서트로 세팅
        //targetIdx의 인덱스 세팅
        let allConcertsId = allConcerts.map(el => el.id);
        dispatch(setTargetIdx(allConcertsId.indexOf(target.id)));
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
    } else if (targetIdx === 1) {
      /*targetIdx가 1일때 (오른쪽 넘김 +1)*/
      //firstIdx가 클릭할때마다 1씩 커진다.
      dispatch(setFirstConcert(allConcerts[lastIdx]));
      dispatch(setSecondConcert(allConcerts[targetIdx - 1]));
      dispatch(setThirdConcert(allConcerts[targetIdx]));
      dispatch(setFourthConcert(allConcerts[targetIdx + 1]));
      dispatch(setFifthConcert(allConcerts[targetIdx + 2]));
    } else {
      //firstIdx가 클릭할때마다 1씩 커진다.
      dispatch(setFirstConcert(allConcerts[targetIdx - 2]));
      dispatch(setSecondConcert(allConcerts[targetIdx - 1]));
      dispatch(setThirdConcert(allConcerts[targetIdx]));
      dispatch(setFourthConcert(allConcerts[targetIdx + 1]));
      dispatch(setFifthConcert(allConcerts[targetIdx + 2]));
    }
  };

  const updateFiveConcertsLeft = () => {
    /*targetIdx가 2일때 (처음 상황)*/
    if (targetIdx === 2) {
      dispatch(setFirstConcert(allConcerts[lastIdx - 1]));
      dispatch(setSecondConcert(allConcerts[lastIdx]));
      dispatch(setThirdConcert(allConcerts[targetIdx]));
      dispatch(setFourthConcert(allConcerts[targetIdx + 1]));
      dispatch(setFifthConcert(allConcerts[targetIdx + 2]));
      console.log('targetIdx', targetIdx);
    } else if (targetIdx === 3) {
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
      updateFiveConcertsLeft();
      getTargetPoster();
      setIsClick('clicked');
      setIsClick('disclicked');
      dispatch(setTargetIdx(targetIdx - 1));
    } else if (targetIdx === 0) {
      updateFiveConcertsLeft();
      getTargetPoster();
      setIsClick('clicked');
      setIsClick('disclicked');
    } else if (targetIdx === lastIdx) {
      updateFiveConcertsLeft();
      getTargetPoster();
      setIsClick('clicked');
      setIsClick('disclicked');
      dispatch(setTargetIdx(targetIdx - 1));
    }
  };

  const onClickHandlerRight = () => {
    if (allConcerts.length > 5 && targetIdx <= lastIdx) {
      if (targetIdx >= 0 && targetIdx !== lastIdx) {
        updateFiveConcertsRight();
        getTargetPoster();
        setIsClick('clicked');
        setIsClick('disclicked');
        dispatch(setTargetIdx(targetIdx + 1));
      } else if (targetIdx === lastIdx) {
        updateFiveConcertsRight();
        getTargetPoster();
        setIsClick('clicked');
        setIsClick('disclicked');
      } else if (targetIdx === -1) {
        updateFiveConcertsRight();
        getTargetPoster();
        setIsClick('clicked');
        setIsClick('disclicked');
        dispatch(setTargetIdx(targetIdx + 1));
      }
    }
  };

  useEffect(() => {
    getTargetPoster();
  }, [isClick]);

  useEffect(() => {
    getAllConcerts();
  }, [order]);

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
            {order === 'hot' ? (
              <h1 id='jumboClassify'>HOT</h1>
            ) : order === 'near' ? (
              <h1 id='jumboClassify'>NEAR</h1>
            ) : order === 'new' ? (
              <h1 id='jumboClassify'>NEW</h1>
            ) : null}
          </div>
          {/*오른쪽 상단 탭 바*/}
          <JumbotronTabBar getAllConcerts={getAllConcerts} />
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
                  : () => {
                      console.log('처음상태입니다. 왼쪽으로 넘길 수 없어요');
                    }
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
