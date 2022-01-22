/* CSS import */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* Store import */
import { RootState } from '../index';
/* Library import */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider, { Settings } from 'react-slick';

function LandingPosterSlide() {
  const [imageIdx, setImageIdx] = useState(0);

  const { allConcerts } = useSelector((state: RootState) => state.main);

  const settings: Settings = {
    infinite: true,
    lazyLoad: 'ondemand', //progressive
    speed: 300,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1800,
    cssEase: 'linear',
    arrows: false,
    // dotsClass: 'dots',
    slidesToShow: 5,
    centerMode: true,
    centerPadding: '10px',
    swipeToSlide: true,
    beforeChange: (current: any, next: any) => {
      setImageIdx(next);
    },
  };

  return (
    <div className='posterContainer'>
      <Slider {...settings} className='sliderWrapper'>
        {allConcerts.map((el, idx) => {
          const lastIdx = allConcerts.length - 1;
          //imageIdx가 0일때 ->
          // lastIdx-1 lastIdx imageIdx imageIdx+1 imageIdx+2
          if (imageIdx === 0) {
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
          }
          //imageIdx가 1일때 ->
          //lastIdx imageIdx-1 imageIdx imageIdx+1 imageIdx+2
          else if (imageIdx === 1) {
            if (allConcerts.indexOf(el) === lastIdx) {
              return (
                <div className='edge_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === imageIdx - 1) {
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
          }
          //imageIdx가 lastIdx -1일때 ->
          //imageIdx-2 imageIdx-1 imageIdx imageIdx+1 0번째인덱스
          else if (imageIdx === lastIdx - 1) {
            if (allConcerts.indexOf(el) === imageIdx - 2) {
              return (
                <div className='edge_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === imageIdx - 1) {
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
          //imageIdx가 lastIdx일때 ->
          // imageIdx-2 imageIdx-1 imageIdx 0 1번째 인덱스
          else if (imageIdx === lastIdx) {
            if (allConcerts.indexOf(el) === imageIdx - 2) {
              return (
                <div className='edge_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === imageIdx - 1) {
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
          // imageIdx -2 imageIdx-1 imageIdx imageIdx+1 imageIdx +2
          else {
            if (allConcerts.indexOf(el) === imageIdx - 2) {
              return (
                <div className='edge_l' key={el.id}>
                  <img src={el.image_concert} alt='콘서트 이미지' />
                  <div className='posterCover2'></div>
                </div>
              );
            } else if (allConcerts.indexOf(el) === imageIdx - 1) {
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
          }
        })}
      </Slider>
    </div>
  );
}

export default LandingPosterSlide;
