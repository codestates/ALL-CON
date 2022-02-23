/* CSS Import */
import defaultImg from '../images/landingImage1.png';
import ConcertBox from '../components/ConcertPage/ConcertBox';
import Footer from '../components/Footer';
/* Store import */
import { RootState } from '../index';
import { setAllConcerts, setPassToConcert, setOrder, setTarget } from '../store/MainSlice';
import {
  showConcertModal,
  showAlertModal,
  insertAlertText,
} from '../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConcertPage() {
  const dispatch = useDispatch();
  /* useSelector => 전역상태 */
  const { allConcerts, order, passToConcert } = useSelector((state: RootState) => state.main);
  /* useState => 지역상태 */
  const [concertOrder, setConcertOrder] = useState<String>('view');

  /* order, passToConcert 전역상태 변경시 지역상태 concertOrder 변경 */
  useEffect(() => {
    setConcertOrder(order);
  }, [order, passToConcert]);

  /* 정렬 핸들러 */
  const orderByHandler = async (clickedOrder: String) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${clickedOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setTarget({}));
        dispatch(showConcertModal(false));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400) dispatch(insertAlertText('잘못된 요청입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  /* 콘서트 클릭 핸들러 */
  const concertClickHandler = async (concertId: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${concertId}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTarget(response.data.data.concertInfo));
        dispatch(setPassToConcert(false));
        dispatch(showConcertModal(true));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400)
        dispatch(insertAlertText('잘못된 요청입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  return (
    <div id='concertContainer'>
      <div id='lineOrderWrapper'>
        <div id='bottomLineOrderBox'>
          <h1>
            {(order === 'view' && '조회수') ||
              (order === 'near' && '임박예정') ||
              (order === 'new' && '등록일')} 순
          </h1>
          <p className={order === 'view' ? 'click' : 'orderBy'} onClick={() => {
            dispatch(setOrder('view'));
            orderByHandler('view');
            dispatch(setPassToConcert(false));
          }}>
            조회수
          </p>
          <p className={order === 'near' ? 'click' : 'orderBy'}  onClick={() => {
            dispatch(setOrder('near'));
            orderByHandler('near');
            dispatch(setPassToConcert(false));
          }}>
            임박예정
          </p>
          <p className={order === 'new' ? 'click' : 'orderBy'}  onClick={() => {
            dispatch(setOrder('new'));
            orderByHandler('new');
            dispatch(setPassToConcert(false));
          }}>
            등록일
          </p>
        </div>
      </div>
      <div id='concertsBoard'>
        {/* 콘서트 목록 */}
        {allConcerts.map((concert, idx) => (
          <div
            id='concertBoxWrapper'
            key={idx}
            onClick={() => {
              concertClickHandler(concert.id);
            }}
          >
            <ConcertBox concert={concert} />
          </div>
        ))}
      </div>
      <div id='modalBoard'>
        <div id='concertWrapper'>
          <h1>콘서트를 선택해주세요!</h1>
          <img src={defaultImg} alt='defaultImg' />
        </div>
      </div>
      <div id='fullFooter'>
        <div id='footerWrapper'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ConcertPage;
