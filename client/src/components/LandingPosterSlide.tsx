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

function LandingPosterSlide() {
  const [imageIdx, setImageIdx] = useState(0);

  const { allConcerts } = useSelector((state: RootState) => state.main);

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
      setImageIdx(next);
    },
  };

  return (
    <div className='posterContainer'>
      <Slider {...settings}>
        {allConcerts.map((el, idx) => {
          const lastIdx = allConcerts.length - 1;
          //imageIdx가 0일때 ->
          // lastIdx-1 lastIdx targetIdx targetIdx+1 targetIdx+2
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
          } else if (allConcerts.indexOf(el) === imageIdx) {
            return (
              <div className='center' key={el.id}>
                <img src={el.image_concert} alt='콘서트 이미지' />
              </div>
            );
          } else if (allConcerts.indexOf(el) === imageIdx + 1) {
            return (
              <div className='side_r' key={el.id}>
                <img src={el.image_concert} alt='콘서트 이미지' />
                <div className='posterCover'></div>
              </div>
            );
          } else if (allConcerts.indexOf(el) === imageIdx + 2) {
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
        })}
      </Slider>
    </div>
  );
}

export default LandingPosterSlide;
