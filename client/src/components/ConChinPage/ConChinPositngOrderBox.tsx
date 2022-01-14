/* Config import */
import { REACT_APP_API_URL } from '../../config';
/* Store import */
import { RootState } from '../../index';
import { setTarget, setAllConcerts } from '../../store/MainSlice';
import { setPostingOrder } from '../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

function ConChinPostingOrderBox() {
  const dispatch = useDispatch();
  const { postingOrder } = useSelector((state: RootState) => state.conChin);
  const { target } = useSelector((state: RootState) => state.main);
  /*전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/concert?order=${postingOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllConcerts(response.data.data.concertInfo));
        resetTarget();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllConcerts();
  }, [postingOrder]);

  /* 타겟 초기화 핸들러 */
  const resetTarget = () => {
    dispatch(setTarget({}));
  };
  return (
    <div
      id={
        Object.keys(target).length === 0
          ? 'bottomLineOrderBox'
          : 'bottomLineOrderBoxChosen'
      }
    >
      <p
        className='order'
        onClick={() => {
          dispatch(setPostingOrder('hot'));
          getAllConcerts();
        }}
        style={
          postingOrder === 'hot'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        조회수
      </p>
      <p
        className='order'
        onClick={() => {
          dispatch(setPostingOrder('near'));
          getAllConcerts();
        }}
        style={
          postingOrder === 'near'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        임박예정
      </p>
      <p
        className='order'
        onClick={() => {
          dispatch(setPostingOrder('new'));
          getAllConcerts();
        }}
        style={
          postingOrder === 'new'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        등록일
      </p>
    </div>
  );
}
export default ConChinPostingOrderBox;
