/* Config import */
import { REACT_APP_API_URL } from '../config.js'
/* CSS Import */
import defaultImg from '../images/landingImage1.png';
import ConcertBox from '../components/ConcertPage/ConcertBox';
import ConcertChosenBox from '../components/ConcertPage/ConcertChosenBox';
import Footer from '../components/Footer';
/* Store import */
import { showConcertModal, showAlertModal, insertAlertText } from '../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function ConcertPage() {
  const dispatch = useDispatch();

  /* 정렬순 상태 */
  const [order, setOrder] = useState<string>('view');

  /* 정렬 핸들러 */
  const orderByHandler = async (order: string) => {
    try{
      const response = await axios.get(
        `${REACT_APP_API_URL}/concert?${order}`,
      );
  
      console.log(response.data.data);
      setOrder(order);
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
            {(order==='view' && '조회수') || (order==='near' && '임박예정') || (order==='new' && '등록일')} 순
          </h1>
          <p className='orderBy' onClick={() => orderByHandler('view')}>조회수</p>
          <p className='orderBy' onClick={() => orderByHandler('near')}>임박예정</p>
          <p className='orderBy' onClick={() => orderByHandler('new')}>등록일</p>
        </div>
      </div>
      <div id='concertsBoard'>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper' onClick={() => dispatch(showConcertModal(true))}>
          <ConcertChosenBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
        <div id='concertBoxWrapper'>
          <ConcertBox />
        </div>
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
