/* CSS import */
import crown from '../images/crown.png';
/* Store import */
import { RootState } from '../index';
import { setOrder, setTarget } from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function PosterSlide() {
  const { firstConcert } = useSelector((state: RootState) => state.main);
  const { secondConcert } = useSelector((state: RootState) => state.main);
  const { thirdConcert } = useSelector((state: RootState) => state.main);
  const { fourthConcert } = useSelector((state: RootState) => state.main);
  const { fifthConcert } = useSelector((state: RootState) => state.main);
  const { targetIdx } = useSelector((state: RootState) => state.main);
  const { target } = useSelector((state: RootState) => state.main);

  const [isClick, setIsClick] = useState(false);

  /* D-DAY 계산기 */
  const dayCalculator = (openDate?: Date): string => {
    if (openDate) {
      const today = new Date();
      const targetDay = new Date(openDate);
      const gap = targetDay.getTime() - today.getTime();
      const count = Math.ceil(gap / (1000 * 60 * 60 * 24));
      /* 남은 일수에 따라 디데이 리턴 */
      if (count === 1) return 'D';
      else if (count < 1) return '';
      else return 'D-' + (count - 1);
    }
    return '';
  };

  return (
    <>
      <div className='posterContainer'>
        <div id='crownWrapper'>
          <img
            id={targetIdx === 0 ? 'posterCrown' : 'posterCrownDown'}
            src={crown}
            alt='왕관아이콘'
          ></img>
        </div>
        <>
          {firstConcert ? (
            <div id='posterWrapper1'>
              <img
                alt='포스터'
                src={firstConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover2'></div>
            </div>
          ) : (
            <div></div>
          )}
          {secondConcert ? (
            <div id='posterWrapper2'>
              <img
                alt='포스터'
                src={secondConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover'></div>
            </div>
          ) : (
            <div></div>
          )}
          {thirdConcert ? (
            <div
              id='posterWrapper3'
              onClick={() => {
                setIsClick(!isClick);
              }}
            >
              <img
                alt='포스터'
                src={thirdConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div id='alignDay'>
                <div id='dDay'>
                  <p>{target ? dayCalculator(target.open_date) : undefined}</p>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {fourthConcert ? (
            <div id='posterWrapper4'>
              <img
                alt='포스터'
                src={fourthConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover'></div>
            </div>
          ) : (
            <div></div>
          )}
          {fifthConcert ? (
            <div id='posterWrapper5'>
              <img
                alt='포스터'
                src={fifthConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover2'></div>
            </div>
          ) : (
            <div></div>
          )}
        </>
      </div>
    </>
  );
}

export default PosterSlide;
