/* CSS import */
import crown from '../images/crown.png';
import sf9 from '../images/sf99.jpg';
import six from '../images/six.gif';
import victon from '../images/victon.gif';
import hiphop2 from '../images/hiphop2.gif';
import kimjh from '../images/kimjh.jpg';
import defaultPoster from '../images/default_poster.jpg';
/* Store import */
import { RootState } from '../index';
import { setOrder, setTarget } from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function PosterSlide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { target } = useSelector((state: RootState) => state.main);
  const { fiveConcerts } = useSelector((state: RootState) => state.main);
  let firstConcert = fiveConcerts[0];
  let secondConcert = fiveConcerts[1];
  let thirdConcert = fiveConcerts[2];
  let fourthConcert = fiveConcerts[3];
  let fifthConcert = fiveConcerts[4];

  //현재 선택된 포스터 바꾸기(뒷배경 큰 포스터)
  const getTargetPoster = () => {
    dispatch(setTarget(thirdConcert));
  };

  useEffect(() => {
    getTargetPoster();
  }, []);

  // 버튼을 누르면 fiveConcerts 배열이 변하게 만들기(인덱스 이동)
  //allConcerts에서 받아온 콘서트들 인덱스
  const updateFiveConcerts = () => {};

  return (
    <>
      <div className='posterContainer'>
        <div id='crownWrapper'>
          <img id='posterCrown' src={crown} alt='왕관아이콘'></img>
        </div>
        {fiveConcerts ? (
          <>
            <div id='posterWrapper1'>
              <img
                alt='포스터'
                src={firstConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover2'></div>
            </div>
            <div id='posterWrapper2'>
              <img
                alt='포스터'
                src={secondConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover'></div>
            </div>
            <div id='posterWrapper3'>
              <img
                alt='포스터'
                src={thirdConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='dDay'>
                <p>D-5</p>
              </div>
            </div>
            <div id='posterWrapper4'>
              <img
                alt='포스터'
                src={fourthConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover'></div>
            </div>
            <div id='posterWrapper5'>
              <img
                alt='포스터'
                src={fifthConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover2'></div>
            </div>
          </>
        ) : (
          <p>받아온 콘서트 정보가 없습니다.</p>
        )}
      </div>
    </>
  );
}

export default PosterSlide;
