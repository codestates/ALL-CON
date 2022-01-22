/* CSS import */
import left from '../images/left_arrow.png';
import right from '../images/right_arrow.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* Store import */
import { RootState } from '../index';
/* Library import */
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider, { Settings } from 'react-slick';
import { setTarget, setTargetIdx } from '../store/MainSlice';

function PosterSlide() {
  const dispatch = useDispatch();

  const { target, targetIdx, allConcerts, isRendering } = useSelector(
    (state: RootState) => state.main,
  );

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

  const sliderRef = useRef<any>(null);

  const setCenterfunc = (index?: number, bool?: boolean): any => {
    console.log(targetIdx);
    sliderRef.current.slickGoTo(targetIdx, false);
  };

  const settings: Settings = {
    infinite: true,
    lazyLoad: 'ondemand', //progressive
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
      dispatch(setTargetIdx(next));
    },
  };

  //isRendering이 변할때마다(즉 받아오는 이미지들이 변할때마다)
  //beforeChange로 0번부터 시작하게 만들고싶다
  useEffect(() => {
    if (settings.beforeChange) {
      settings.beforeChange(targetIdx, 0);
      //0번째 포스터가 가운데로 이동
      setCenterfunc();
    }
  }, [isRendering]);

  useEffect(() => {
    dispatch(setTarget(allConcerts[targetIdx]));
  }, [targetIdx]);

  return (
    <div className='posterContainer'>
      <Slider {...settings} ref={sliderRef} className='sliderWrapper'>
        {allConcerts.map((el, idx) => {
          const lastIdx = allConcerts.length - 1;
          //targetIdx가 0일때 ->
          // lastIdx-1 lastIdx targetIdx targetIdx+1 targetIdx+2
          if (targetIdx === 0) {
            if (allConcerts.indexOf(el) === lastIdx - 1) {
              return (
                <div className='edge_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === lastIdx) {
              return (
                <div className='side_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx) {
              return (
                <div className='center' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx + 1) {
              return (
                <div className='side_r' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx + 2) {
              return (
                <div className='edge_r' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else {
              return (
                <div className='else' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            }
          }
          //targetIdx가 1일때 ->
          //lastIdx targetIdx-1 targetIdx targetIdx+1 targetIdx+2
          else if (targetIdx === 1) {
            if (allConcerts.indexOf(el) === lastIdx) {
              return (
                <div className='edge_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx - 1) {
              return (
                <div className='side_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx) {
              return (
                <div className='center' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx + 1) {
              return (
                <div className='side_r' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx + 2) {
              return (
                <div className='edge_r' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else {
              return (
                <div className='else' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            }
          }
          //targetIdx가 lastIdx -1일때 ->
          //targetIdx-2 targetIdx-1 targetIdx targetIdx+1 0번째인덱스
          else if (targetIdx === lastIdx - 1) {
            if (allConcerts.indexOf(el) === targetIdx - 2) {
              return (
                <div className='edge_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx - 1) {
              return (
                <div className='side_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx) {
              return (
                <div className='center' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx + 1) {
              return (
                <div className='side_r' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === 0) {
              return (
                <div className='edge_r' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else {
              return (
                <div className='else' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            }
          }
          //targetIdx가 lastIdx일때 ->
          // targetIdx-2 targetIdx-1 targetIdx 0 1번째 인덱스
          else if (targetIdx === lastIdx) {
            if (allConcerts.indexOf(el) === targetIdx - 2) {
              return (
                <div className='edge_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx - 1) {
              return (
                <div className='side_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx) {
              return (
                <div className='center' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                </div>
              );
            } else if (allConcerts.indexOf(el) === 0) {
              return (
                <div className='side_r' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === 1) {
              return (
                <div className='edge_r' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else {
              return (
                <div className='else' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            }
          }
          //그 외 ->
          // targetIdx -2 targetIdx-1 targetIdx targetIdx+1 targetIdx +2
          else {
            if (allConcerts.indexOf(el) === targetIdx - 2) {
              return (
                <div className='edge_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx - 1) {
              return (
                <div className='side_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx) {
              return (
                <div className='center' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx + 1) {
              return (
                <div className='side_r' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === targetIdx + 2) {
              return (
                <div className='edge_r' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else {
              return (
                <div className='else' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            }
          }
        })}
      </Slider>
    </div>
  );
}

export default PosterSlide;
