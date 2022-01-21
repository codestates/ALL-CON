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
import { $CombinedState } from 'redux';
function PosterSlide() {
  const dispatch = useDispatch();

  const { target, targetIdx, allConcerts, isRendering } = useSelector(
    (state: RootState) => state.main,
  );
  const [isClick, setIsClick] = useState(false);

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

  const sliderRef = useRef();

  const func = (index?: number, bool?: boolean): any => {
    console.log('func작동');
    setIsClick(true);
    // sliderRef.current.slickGoTo(targetIdx, true);
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
  console.log('타겟', target);
  console.log('타겟인덱스', targetIdx);
  //isRendering이 변할때마다(즉 받아오는 이미지들이 변할때마다)
  //beforeChange로 0번부터 시작하게 만들고싶다
  useEffect(() => {
    if (settings.beforeChange) {
      settings.beforeChange(targetIdx, 0);
      //+ slick-dot의 0번을 누른 상태
      func();
    }
  }, [isRendering]);

  useEffect(() => {
    dispatch(setTarget(allConcerts[targetIdx]));
  }, [targetIdx]);

  return (
    <div className='posterContainer'>
      <Slider {...settings} className='sliderWrapper'>
        {allConcerts.map((el, idx) => (
          <div className={idx === targetIdx ? 'center' : 'side'} key={el.idx}>
            <img src={el.image_concert} alt='콘서트 이미지' />
          </div>
          //인덱스가 targetIdx+2또는 targetIdx-2라면
          //width,height값을 줄인다. (targetIdx가 0일때랑 lastIdx일때 예외처리)
        ))}
        <ul className='slick-dots'>
          {
            /*map돌려서 li가 나옴. 
          거기서 현재 onClick된 버튼이 className="slick-active"
          버튼이 클릭된 상태 isClick.
          isClick이 켜진 상태로 만들기..?
          -> slick-active가 0번째 li가되게 만들면 될 듯
           */
            allConcerts.map(el => {
              return <li></li>;
            })
          }
        </ul>
      </Slider>
    </div>
  );
}

export default PosterSlide;
