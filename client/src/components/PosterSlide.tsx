/* CSS import */
import left from '../images/left_arrow.png';
import right from '../images/right_arrow.png';
import back from '../images/concertFriend.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* Store import */
import { RootState } from '../index';
import {
  setPageAllComments,
  setTotalNum,
  setPageNum,
  setComment,
} from '../store/ConcertCommentSlice';
import { setTarget, setTargetIdx, setDetail, setMainTotalComments } from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider, { Settings } from 'react-slick';


function PosterSlide() {
  const dispatch = useDispatch();
  const { pageNum } = useSelector((state: RootState) => state.concertComments);
  const { target, targetIdx, allConcerts, order, isRendering, passToConcert } =
    useSelector((state: RootState) => state.main);

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
  const [allConcertsMain, setAllConcertsMain] = useState<any[]>([]);
  const [targetMain, setTargetMain] = useState<mainTarget>({});
  const [targetIdxMain, setTargetIdxMain] = useState(0);

  const sliderRef = useRef<any>();

  //전역상태가 변할때마다 지역상태도 변경됌
  useEffect(() => {
    setAllConcertsMain(allConcerts);
    // concerts 목록이 새로고침 될 때마다, slick 위치를 0번째 인덱스로 이동
    sliderRef.current.slickGoTo(0);
  }, [allConcerts]);

  useEffect(() => {
    setTargetMain(target);
  }, [target]);

  useEffect(() => {
    //지역상태 변경
    setTargetIdxMain(targetIdx);
    getDetailInfo(allConcerts[targetIdx].id);
  }, [targetIdx]);

  /* 상세 콘서트 받아오기 */
  const getDetailInfo = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${id}`,
        { withCredentials: true },
      );
      if (response.data.data) {
        /* 서버 응답값이 있다면 detail(상세정보) 갱신 */
        dispatch(setDetail(response.data.data.concertInfo));
        //console.log('디스패치 실행중');
        getAllComments(id);
        //타겟 인덱스가 변할때마다 타겟 바꿔주기
        dispatch(setTarget(allConcerts[targetIdx]));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 모든 댓글 가져오기 함수 */
  const getAllComments = async (id: number) => {
    try {
      if (target) {
        /* response 변수에 서버 응답결과를 담는다 */
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/${id}/comment?pageNum=${pageNum}`,
          { withCredentials: true },
        );
        /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
        if (response.data) {
          /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */
          dispatch(setTotalNum(response.data.data.totalPage));
          dispatch(setPageAllComments(response.data.data.concertCommentInfo));
          dispatch(setMainTotalComments(response.data.data.totalComment));
        }
      }
    } catch (err) {
      console.log(err);
    }
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
    // infinite: false,
    lazyLoad: 'ondemand', //progressive
    speed: 500,
    // dots: false,
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
      dispatch(setTargetIdx(next));
    },
  };

  return (
    <div className='posterContainer'>
      <Slider {...settings} ref={sliderRef} className='sliderWrapper'>
        {allConcertsMain.map((el, idx) => {
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
        })}
      </Slider>
    </div>
  );
}

export default PosterSlide;
