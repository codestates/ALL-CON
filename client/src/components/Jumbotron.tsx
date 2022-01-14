/* Config import */
import { REACT_APP_API_URL } from '../config';
/* CSS import */
import PosterSlide from './PosterSlide';
import six from '../images/six.gif';
import left from '../images/left_arrow.png';
import right from '../images/right_arrow.png';
/* Store import */
import { RootState } from '../index';
import {
  setOrder,
  setTarget,
  setAllConcerts,
  setFiveConcerts,
  setFirstIdx,
  addNumberToFirstIdx,
} from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Jumbotron() {
  console.log('확인');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order } = useSelector((state: RootState) => state.main);
  const { target } = useSelector((state: RootState) => state.main);
  const { allConcerts } = useSelector((state: RootState) => state.main);
  const { fiveConcerts } = useSelector((state: RootState) => state.main);
  const { firstIdx } = useSelector((state: RootState) => state.main);

  /*포스터 5개 순서*/
  let firstConcert = fiveConcerts[0]; //{}
  let secondConcert = fiveConcerts[1];
  let thirdConcert = fiveConcerts[2];
  let fourthConcert = fiveConcerts[3];
  let fifthConcert = fiveConcerts[4];

  /*전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/concert?${order}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllConcerts(response.data.data.concertInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*전체 콘서트 5개만 받아오기*/
  const getFiveConcerts = () => {
    //마지막 인덱스2개랑 처음꺼 3개
    const frontConcerts = allConcerts.slice(0, 3);
    const slicedArr: Array<object> = allConcerts.slice(-2);
    const five = frontConcerts.concat(slicedArr);
    dispatch(setFiveConcerts(five));
  };

  //현재 선택된 포스터 바꾸기(뒷배경 큰 포스터)
  const getTargetPoster = () => {
    dispatch(setTarget(firstConcert));
  };

  const updateFiveConcerts = async () => {
    console.log(allConcerts);
    console.log('처음five', fiveConcerts);
    console.log('처음first', firstIdx);
    try {
      //allConcerts에서의 firstConcerts의 인덱스를 찾음
      dispatch(addNumberToFirstIdx());
      //firstIdx가 하나 옮겨감 0 -> 1
      console.log('바뀐first', firstIdx);
      /*------배열 끝에서 끊기는 경우------*/
      //첫번째,두번째,세번째,네번째 인덱스가allConcerts.length -1 와 같을 경우
      if (firstIdx === allConcerts.length - 1) {
        let array1 = allConcerts.slice(firstIdx);
        let array2 = allConcerts.slice(0, 4);
        let array3 = array1.concat(array2);
        dispatch(setFiveConcerts(array3));
      } else if (firstIdx === allConcerts.length - 2) {
        let array1 = allConcerts.slice(firstIdx);
        // console.log('array1', array1);
        let array2 = allConcerts.slice(0, 3);
        console.log('array2', array2);
        let array3 = array1.concat(array2);
        // console.log('array3', array3);
        dispatch(setFiveConcerts(array3));
        console.log('나중 five', fiveConcerts);
      } else if (firstIdx === allConcerts.length - 3) {
        let array1 = allConcerts.slice(firstIdx);
        let array2 = allConcerts.slice(0, 2);
        let array3 = array1.concat(array2);
        dispatch(setFiveConcerts(array3));
      } else if (firstIdx === allConcerts.length - 4) {
        let array1 = allConcerts.slice(firstIdx);
        let array2 = allConcerts.slice(0, 1);
        let array3 = array1.concat(array2);
        dispatch(setFiveConcerts(array3));
      } else {
        /*------배열이 끊기지 않게 인덱스가 나오는 경우------*/
        dispatch(setFiveConcerts(allConcerts.slice(firstIdx, firstIdx + 4)));
        console.log('안끊기고 잘 나옴');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllConcerts();
  }, []);

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
          <div id='tabBar'>
            <p
              id={order === 'hot' ? 'hot' : undefined}
              onClick={() => {
                dispatch(setOrder('hot'));
              }}
            >
              HOT
            </p>
            <p
              id={order === 'near' ? 'near' : undefined}
              onClick={() => {
                dispatch(setOrder('near'));
              }}
            >
              NEAR
            </p>
            <p
              id={order === 'new' ? 'new' : undefined}
              onClick={() => {
                dispatch(setOrder('new'));
              }}
            >
              NEW
            </p>
          </div>
        </div>
        {/*포스터 wrapper*/}
        <div id='jumboPosterSlideWrapper'>
          <div id='arrows'>
            <img id='left' src={left} alt='왼쪽 화살표'></img>
            <img
              id='right'
              src={right}
              alt='오른쪽 화살표'
              onClick={
                allConcerts.length > 5
                  ? () => updateFiveConcerts()
                  : () =>
                      console.log(
                        '전체 포스터의 갯수가 5개 이하라 움직이지 않아요',
                      )
              }
            ></img>
          </div>
          <PosterSlide
            firstConcert={firstConcert}
            secondConcert={secondConcert}
            thirdConcert={thirdConcert}
            fourthConcert={fourthConcert}
            fifthConcert={fifthConcert}
          />
        </div>
      </div>
    </div>
  );
}
export default Jumbotron;
