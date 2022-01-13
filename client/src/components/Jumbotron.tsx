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
} from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Jumbotron() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order } = useSelector((state: RootState) => state.main);
  const { target } = useSelector((state: RootState) => state.main);
  const { allConcerts } = useSelector((state: RootState) => state.main);
  const { fiveConcerts } = useSelector((state: RootState) => state.main);

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
<<<<<<< HEAD
=======
  /*전체 콘서트 5개만 받아오기*/
  const getFiveConcerts = () => {
    const slicedArr: Array<object> = allConcerts.slice(-2);
    //마지막 인덱스2개랑 처음꺼 3개
    const frontConcerts = allConcerts.slice(0, 3);
    const five = slicedArr.concat(frontConcerts);
    dispatch(setFiveConcerts(five));
    console.log(allConcerts);
  };

  useEffect(() => {
    getAllConcerts();
    getFiveConcerts();
  }, []);
>>>>>>> 4ef42b714bc31955b09a6ee691afc4852e81fba6

  return (
    <div id='jumboContainer'>
      <div id='jumboMiniContainer'>
        {/* 뒷배경 선택된 포스터*/}
        {/* <img src={target.image_concert} alt='선택된 포스터' id='jumboChosen' /> */}
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
            <img id='right' src={right} alt='오른쪽 화살표'></img>
          </div>
          <PosterSlide />
        </div>
      </div>
    </div>
  );
}
export default Jumbotron;
