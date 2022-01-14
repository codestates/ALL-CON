/* Config import */
import { REACT_APP_API_URL } from '../../config';
/* Store import */
import { RootState } from '../../index';
import { setTarget, setAllConcerts } from '../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* Component import */
import ConChinPostingOrderBox from './ConChinPositngOrderBox';

function ConChinPostingBox() {
  const dispatch = useDispatch();
  const { postingOrder } = useSelector((state: RootState) => state.conChin);
  const { target } = useSelector((state: RootState) => state.main);
  const { allConcerts } = useSelector((state: RootState) => state.main);

  /*전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/concert?${postingOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllConcerts(response.data.data.concertInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllConcerts();
  }, [target]);

  return (
    <li id='conChinPostingBox'>
      <h1 id={Object.keys(target).length === 0 ? 'curOrder' : 'curOrderChosen'}>
        {postingOrder === 'hot'
          ? '조회수 순'
          : postingOrder === 'near'
          ? '임박예정 순'
          : postingOrder === 'new'
          ? '등록일 순'
          : null}
      </h1>
      <ConChinPostingOrderBox />
      <div
        id={
          Object.keys(target).length === 0
            ? 'postingBoxWrapper'
            : 'postingBoxWrapperChosen'
        }
      >
        {allConcerts.map(concert => {
          return (
            <ul
              className={
                target.id === concert.id
                  ? 'postingChosen'
                  : Object.keys(target).length === 0
                  ? 'posting'
                  : 'postingunChosen'
              }
              key={concert.id}
              onClick={() => dispatch(setTarget(concert))}
            >
              <h1 className='title'>{concert.title}</h1>
              <p className='date'>
                {' '}
                오픈일
                <br /> {concert.post_date}
              </p>
              <p className='view'> 조회수 {concert.view}</p>
              <p className='place'> {concert.place}</p>
            </ul>
          );
        })}
      </div>
    </li>
  );
}
export default ConChinPostingBox;
