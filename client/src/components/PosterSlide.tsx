/* CSS import */
import left from '../images/left_arrow.png';
import right from '../images/right_arrow.png';
import back from '../images/concertFriend.png';
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
  /* 지역상태 interface */
  interface mainTarget {
    id?: number;
    exclusive?: string;
    open_date?: Date;
    post_date?: string;
    image_concert?: string;
    title?: string;
    period?: string;
    place?: string;
    price?: string;
    running_time?: string;
    rating?: string;
    link?: string;
    view?: number;
    total_comment?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }

  /* useState => 지역상태 */
  const [allConcertsMain, setAllConcertsMain] = useState<any>([]);
  const [targetMain, setTargetMain] = useState<mainTarget>({});
  const [targetIdxMain, setTargetIdxMain] = useState(0);

  //isRendering이 변할때마다(즉 받아오는 이미지들이 변할때마다) targetIdx 변화
  useEffect(() => {
    //콘서트 페이지에서 왔다면
    if (targetIdx) {
      // 해당 타겟인덱스로 이동, 보이도록 만들기
      setTargetIdxMain(targetIdx);
      setTargetMain(allConcertsMain[targetIdxMain]);
      dispatch(setTarget(allConcerts[targetIdx]));
      setCenterfunc();
    }

    //오더 바꿔 누를때마다 or 처음 페이지가 렌더링될 때
    else {
      setTargetIdxMain(0);
      setTargetMain(allConcertsMain[targetIdxMain]);
      //0번째 포스터가 가운데로 이동 (지역상태로 타겟을 바꿔줌)
      setCenterfunc();
    }
  }, [isRendering]);
  //console.log(targetIdxMain);
  useEffect(() => {
    //타겟 인덱스가 변할때마다 타겟 바꿔주기
    // dispatch(setTarget(allConcerts[targetIdx]));
    setTargetMain(allConcertsMain[targetIdxMain]);
    //타겟 인덱스가 변할때마다 타겟이 점보트론에 보이도록 이동하기
    setCenterfunc();
  }, [targetIdx]);

  /* 전체 콘서트 받아올 때 지역상태 allConcertsMain 변경  */
  useEffect(() => {
    setAllConcertsMain(allConcerts);
  }, [allConcerts]);

  /* 타겟 변경시 지역상태 targetMain 변경  */
  useEffect(() => {
    setTargetMain(target);
    console.log('포스터 타겟', targetMain);
  }, [target]);

  /* 타겟 변경시 지역상태 targetMain 변경  */
  useEffect(() => {
    setTargetIdxMain(targetIdx);
    console.log('targetIdxMain', targetIdxMain);
  }, [targetIdx]);

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

  //선택된 타겟인덱스가 있으면 그 타겟으로 이동하기
  const setCenterfunc = (index?: number, bool?: boolean): any => {
    // console.log(targetIdx);
    sliderRef.current.slickGoTo(targetIdxMain, true);
  };

  const settings: Settings = {
    infinite: true,
    lazyLoad: 'ondemand', //progressive
    speed: 500,
    dots: false,
    // dotsClass: 'dots',
    focusOnSelect: true,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: '5px',
    swipeToSlide: true,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: any, next: any) => {
      setTargetIdxMain(next);
    },
  };

  return (
    <div className='posterContainer'>
      <Slider {...settings} ref={sliderRef} className='sliderWrapper'>
        {allConcertsMain.map((el: any) => {
          const lastIdx = allConcertsMain.length - 1;
          //targetIdx가 0일때 ->
          // lastIdx-1 lastIdx targetIdx targetIdx+1 targetIdx+2
          if (targetIdxMain === 0) {
            if (allConcertsMain.indexOf(el) === lastIdx - 1) {
              return (
                <div className='edge_l' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === lastIdx) {
              return (
                <div className='side_l' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain) {
              return (
                <div className='center' key={el.id}>
                  <div className='card'>
                    <img
                      className='frontImg'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                    <div className='back'>
                      <div id='alignDay'>
                        {/* <div
                          id={dayCalculator(target.open_date) ? 'dDay' : 'hide'}
                        >
                          {dayCalculator(target.open_date)}
                        </div> */}
                      </div>
                      <img
                        className='backImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain + 1) {
              return (
                <div className='side_r' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain + 2) {
              return (
                <div className='edge_r' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className='else' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            }
          }
          //targetIdxMain가 1일때 ->
          //lastIdx targetIdxMain-1 targetIdxMain targetIdxMain+1 targetIdxMain+2
          else if (targetIdxMain === 1) {
            if (allConcertsMain.indexOf(el) === lastIdx) {
              return (
                <div className='edge_l' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain - 1) {
              return (
                <div className='side_l' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain) {
              return (
                <div className='center' key={el.id}>
                  <div className='card'>
                    <img
                      className='frontImg'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                    <div className='back'>
                      <div id='alignDay'>
                        {/* <div
                          id={dayCalculator(target.open_date) ? 'dDay' : 'hide'}
                        >
                          {dayCalculator(target.open_date)}
                        </div> */}
                      </div>
                      <img
                        className='backImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain + 1) {
              return (
                <div className='side_r' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain + 2) {
              return (
                <div className='edge_r' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className='else' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            }
          }
          //targetIdxMain가 lastIdx -1일때 ->
          //targetIdxMain-2 targetIdxMain-1 targetIdxMain targetIdxMain+1 0번째인덱스
          else if (targetIdxMain === lastIdx - 1) {
            if (allConcertsMain.indexOf(el) === targetIdxMain - 2) {
              return (
                <div className='edge_l' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain - 1) {
              return (
                <div className='side_l' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain) {
              return (
                <div className='center' key={el.id}>
                  <div className='card'>
                    <img
                      className='frontImg'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                    <div className='back'>
                      <div id='alignDay'>
                        {/* <div
                          id={dayCalculator(target.open_date) ? 'dDay' : 'hide'}
                        >
                          {dayCalculator(target.open_date)}
                        </div> */}
                      </div>
                      <img
                        className='backImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain + 1) {
              return (
                <div className='side_r' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === 0) {
              return (
                <div className='edge_r' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className='else' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            }
          }
          //targetIdxMain가 lastIdx일때 ->
          // targetIdxMain-2 targetIdxMain-1 targetIdxMain 0 1번째 인덱스
          else if (targetIdxMain === lastIdx) {
            if (allConcertsMain.indexOf(el) === targetIdxMain - 2) {
              return (
                <div className='edge_l' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain - 1) {
              return (
                <div className='side_l' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain) {
              return (
                <div className='center' key={el.id}>
                  <div className='card'>
                    <img
                      className='frontImg'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                    <div className='back'>
                      <div id='alignDay'>
                        {/* <div
                          id={dayCalculator(target.open_date) ? 'dDay' : 'hide'}
                        >
                          {dayCalculator(target.open_date)}
                        </div> */}
                      </div>
                      <img
                        className='backImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === 0) {
              return (
                <div className='side_r' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === 1) {
              return (
                <div className='edge_r' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className='else' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            }
          }
          //그 외 ->
          // targetIdxMain -2 targetIdxMain-1 targetIdxMain targetIdxMain+1 targetIdxMain +2
          else {
            if (allConcertsMain.indexOf(el) === targetIdxMain - 2) {
              return (
                <div className='edge_l' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain - 1) {
              return (
                <div className='side_l' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain) {
              return (
                <div className='center' key={el.id}>
                  <div className='card'>
                    <img
                      className='frontImg'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                    <div className='back'>
                      <div id='alignDay'>
                        {/* <div
                          id={dayCalculator(target.open_date) ? 'dDay' : 'hide'}
                        >
                          {dayCalculator(target.open_date)}
                        </div> */}
                      </div>
                      <img
                        className='backImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain + 1) {
              return (
                <div className='side_r' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else if (allConcertsMain.indexOf(el) === targetIdxMain + 2) {
              return (
                <div className='edge_r' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className='else' key={el.id}>
                  <div className='card'>
                    <div className='front'>
                      <div className='posterCover2'></div>
                      <img
                        className='frontImg'
                        src={el.image_concert}
                        alt='콘서트 이미지'
                      />
                    </div>
                    <img
                      className='back'
                      src={el.image_concert}
                      alt='콘서트 이미지'
                    />
                  </div>
                </div>
              );
            }
          }
        })}
      </Slider>
      {/* <input
        id='sliderBar'
        type='range'
        value={targetIdxMain}
        onChange={e => {
          sliderRef.current.slickGoTo(e.target.value);
          func(e.target.value);
        }}
        min={0}
        max={allConcertsMain.length - 1}
      /> */}
    </div>
  );
}

export default PosterSlide;
