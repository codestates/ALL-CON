/* Config import */
import { REACT_APP_API_URL } from '../../config';
/* CSS import */
import six from '../images/six.gif';
import left from '../images/left_arrow.png';
import right from '../images/right_arrow.png';
/* Store import */
import { RootState } from '../../index';
import {
  setOrder,
  setTarget,
  setAllConcerts,
  setFiveConcerts,
} from '../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* Component import */
import ConChinPostingOrderBox from './ConChinPositngOrderBox';

function ConChinPostingBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order } = useSelector((state: RootState) => state.main);
  const { target } = useSelector((state: RootState) => state.main);
  const { allConcerts } = useSelector((state: RootState) => state.main);

  /*전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/concert?${order}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllConcerts(response.data.data.concertInfo));
        const allTitle = allConcerts.map(el => {
          return el.title;
        });
        console.log(allConcerts);
        console.log(allConcerts[0].title);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllConcerts();
  }, []);

  return (
    <li id='conChinPostingBox'>
      <h1 id='curOrder'>조회수 순</h1>
      <ConChinPostingOrderBox />
      <ul className='posting'>
        <h1 className='title'>[진주] 2021-22 YB 전국투어 콘서트〈LIGHTS〉</h1>
        <p className='date'>2022.02.26 ~ 2022.02.27</p>
        <p className='view'>조회수 2,366</p>
        <p className='place'>경남문화예술회관 대공...</p>
      </ul>
      <ul className='posting'>
        <h1 className='title'>2022 AB6IX CONCERT [COMPLETE WITH...</h1>
        <p className='date'>2022.01.15 ~ 2022.01.26</p>
        <p className='view'>조회수 1,746</p>
        <p className='place'>잠실실내체육관</p>
      </ul>
      <ul className='posting'>
        <h1 className='title'>2022 SF9 LIVE FANTASY #3 IMPERFECT</h1>
        <p className='date'>2022.01.21 ~ 2022.01.23</p>
        <p className='view'>조회수 536</p>
        <p className='place'>올림픽공원 올림픽홀</p>
      </ul>
    </li>
  );
}
export default ConChinPostingBox;
