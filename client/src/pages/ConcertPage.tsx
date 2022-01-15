/* CSS Import */
import defaultImg from '../images/landingImage1.png';
import ConcertBox from '../components/ConcertPage/ConcertBox';
import Footer from '../components/Footer';
/* Store import */
import { RootState } from '../index';
import { setAllConcerts, setTarget } from '../store/MainSlice';
import { showConcertModal, showAlertModal, insertAlertText } from '../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConcertPage() {
  const dispatch = useDispatch();
  const { allConcerts } = useSelector((state: RootState) => state.main);
  /* 정렬순 상태 */
  const [concertOrder, setConcertOrder] = useState<string>('view');

  useEffect(() => {
    orderByHandler(concertOrder);
  }, [concertOrder]);

  /* 정렬 핸들러 */
  const orderByHandler = async (order: string) => {
    try{
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${concertOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setTarget({}));
        dispatch(showConcertModal(false));
      }
    } catch(err){
      const error = err as AxiosError;
      if(error.response?.status===400) dispatch(insertAlertText('잘못된 요청입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  }

  /* 콘서트 클릭 핸들러 */
  const concertClickHandler = async (concertId: number) => {
    try{
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${concertId}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTarget(response.data.data.concertInfo));
        dispatch(showConcertModal(true));
      }
    } catch(err){
      const error = err as AxiosError;
      if(error.response?.status===400) dispatch(insertAlertText('잘못된 요청입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  }

  return (
    <div id='concertContainer'>
      <div id='lineOrderWrapper'>
        <div id='bottomLineOrderBox'>
          <h1>
            {(concertOrder==='view' && '조회수') || (concertOrder==='near' && '임박예정') || (concertOrder==='new' && '등록일')} 순
          </h1>
          <p className='orderBy' onClick={() => setConcertOrder('view')}>조회수</p>
          <p className='orderBy' onClick={() => setConcertOrder('near')}>임박예정</p>
          <p className='orderBy' onClick={() => setConcertOrder('new')}>등록일</p>
        </div>
      </div>
      <div id='concertsBoard'>
        {/* 콘서트 목록 */}
        {allConcerts.map((concert)=>(
          <div id='concertBoxWrapper' onClick={() => {
            concertClickHandler(concert.id);
          }}>
            <ConcertBox concert={concert}/>
          </div>
        ))}
      </div>
      <div id='modalBoard'>
        <div id='concertWrapper'>
          <h1>콘서트를 선택해주세요!</h1>
          <img src={defaultImg} alt='defaultImg'/>
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
