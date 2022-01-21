/* CSS import */
import left from '../images/left_arrow.png';
import right from '../images/right_arrow.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* Store import */
import { RootState } from '../index';
/* Library import */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider, { Settings } from 'react-slick';
import { setTarget, setTargetIdx } from '../store/MainSlice';
function PosterSlide() {
  const dispatch = useDispatch();

  const { target, targetIdx, allConcerts } = useSelector(
    (state: RootState) => state.main,
  );
  const [imageIndex, setImageIndex] = useState(0);

  /* D-DAY 계산기 */
  const dayCalculator = (openDate?: Date): string => {
    if (openDate) {
      const today = new Date();
      const targetDay = new Date(openDate);
      const gap = targetDay.getTime() - today.getTime();
      const count = Math.ceil(gap / (1000 * 60 * 60 * 24));
      /* 남은 일수에 따라 디데이 리턴 */
      if (count === 1) return 'D-0';
      else if (count < 1) return '';
      else return 'D-' + (count - 1);
    }
    return '';
  };

  const NextArrow = ({ onClick }: any) => {
    return (
      <div className='arrow next' onClick={onClick}>
        <img src={right} />
      </div>
    );
  };

  const PrevArrow = ({ onClick }: any) => {
    return (
      <div className='arrow prev' onClick={onClick}>
        <img src={left} />
      </div>
    );
  };

  const settings: Settings = {
    infinite: true,
    lazyLoad: 'progressive', //ondemand랑 뭐가 다른지 체크해보기
    speed: 500,
    dots: true,
    // dotsClass: 'dots',
    slidesToShow: 5,
    centerMode: true,
    centerPadding: '10px',
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: any, next: any) => {
      setImageIndex(next);
      dispatch(setTargetIdx(next));
      // console.log('타겟', target);
      // console.log('타겟인덱스', targetIdx);
    },
  };

  useEffect(() => {
    dispatch(setTarget(allConcerts[imageIndex]));
  }, [imageIndex]);

  return (
    <div className='posterContainer'>
      {/* {allConcerts[targetIdx - 2] && (
        <div id='posterWrapper1'>
          <img
            alt='포스터'
            src={allConcerts[targetIdx - 2].image_concert}
            className='posterImg'
            id='poster'
          />
          <div className='posterCover2'></div>
        </div>
      )}
      {allConcerts[targetIdx - 1] && (
        <div id='posterWrapper2'>
          <img
            alt='포스터'
            src={allConcerts[targetIdx - 1].image_concert}
            className='posterImg'
            id='poster'
          />
          <div className='posterCover'></div>
        </div>
      )}
      {allConcerts[targetIdx] && (
        <div id='posterWrapper3'>
          <img
            alt='포스터'
            src={allConcerts[targetIdx].image_concert}
            className='posterImg'
            id='poster'
          />
          <div id='alignDay'>
            <div id={dayCalculator(target.open_date) ? 'dDay' : 'hide'}>
              {dayCalculator(target.open_date)}
            </div>
          </div>
        </div>
      )}
      {allConcerts[targetIdx + 1] && (
        <div id='posterWrapper4'>
          <img
            alt='포스터'
            src={allConcerts[targetIdx + 1].image_concert}
            className='posterImg'
            id='poster'
          />
          <div className='posterCover'></div>
        </div>
      )}
      {allConcerts[targetIdx + 2] && (
        <div id='posterWrapper5'>
          <img
            alt='포스터'
            src={allConcerts[targetIdx + 2].image_concert}
            className='posterImg'
            id='poster'
          />
          <div className='posterCover2'></div>
        </div>
      )} */}
      <Slider {...settings} className='sliderWrapper'>
        {allConcerts.map((el, idx) => (
          <div className={idx === imageIndex ? 'center' : 'side'}>
            <img src={el.image_concert} alt='콘서트 이미지' />
          </div>
          //인덱스가 targetIdx+2또는 targetIdx-2라면
          //width,height값을 줄인다. (targetIdx가 0일때랑 lastIdx일때 예외처리)
        ))}
      </Slider>
    </div>
  );
}

export default PosterSlide;
