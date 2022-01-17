/* CSS import */
import PosterSlide from './PosterSlide';
import left from '../images/left_arrow.png';
import right from '../images/right_arrow.png';
/* Store import */
import { RootState } from '../index';
import {
  setTarget,
  setTargetIdx,
  setAllConcerts,
  setOrder,
} from '../store/MainSlice';
import { showAlertModal, insertAlertText } from '../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Jumbotron() {
  const dispatch = useDispatch();
  const [isClick, setIsClick] = useState<boolean>(false);
  const { target, order, targetIdx, allConcerts } = useSelector(
    (state: RootState) => state.main,
  );

  /* 렌더링 useEffect */
  useEffect(() => {
    getAllConcerts();
  }, [isClick]);

  /*전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${order}`,
        { withCredentials: true },
      );
      if (response.data) {
        /* 서버 응답값이 있다면 클릭 & target 상태 변경 */
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setTargetIdx(0));
        dispatch(setTarget(allConcerts[targetIdx]));
        setIsClick(false);
      }
    } catch (err) {
      dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  const leftClickHandler = () => {
    if (targetIdx > 0) {
      dispatch(setTargetIdx(targetIdx - 1));
      dispatch(setTarget(allConcerts[targetIdx - 1]));
    }
  };

  const rigthClickHandler = () => {
    if (targetIdx < allConcerts.length - 1) {
      dispatch(setTargetIdx(targetIdx + 1));
      dispatch(setTarget(allConcerts[targetIdx + 1]));
    }
  };

  const orderClickHandler = (clickOrder: string) => {
    dispatch(setTargetIdx(0));
    dispatch(setTarget({}));
    setIsClick(true);
    dispatch(setOrder(clickOrder));
  };

  return (
    <div id='jumboContainer'>
      <div id='jumboMiniContainer'></div>
      {/*점보트론 검은배경 전체*/}
      <div className='jumboTopBox'>
        <div id='jumboTextsAlignBox'>
          {/*WHAT'S HOT 문구*/}
          <div className='jumboTextBox'>
            <h1 id='jumboWhat'>WHAT'S</h1>
            {order === 'hot' && <h1 id='jumboClassify'>HOT</h1>}
            {order === 'near' && <h1 id='jumboClassify'>NEAR</h1>}
            {order === 'new' && <h1 id='jumboClassify'>NEW</h1>}
          </div>
          {/*오른쪽 상단 탭 바*/}
          <div id='tabBar'>
            <p
              id={order === 'hot' ? 'hot' : undefined}
              onClick={() => {
                orderClickHandler('hot');
              }}
            >
              HOT
            </p>
            <p
              id={order === 'near' ? 'near' : undefined}
              onClick={() => {
                orderClickHandler('near');
              }}
            >
              NEAR
            </p>
            <p
              id={order === 'new' ? 'new' : undefined}
              onClick={() => {
                orderClickHandler('new');
              }}
            >
              NEW
            </p>
          </div>
        </div>
        {/*포스터 wrapper*/}
        <div id='jumboPosterSlideWrapper'>
          <div id='arrows'>
            <img
              id='left'
              src={left}
              alt='왼쪽 화살표'
              onClick={leftClickHandler}
            ></img>
            <img
              id='right'
              src={right}
              alt='오른쪽 화살표'
              onClick={rigthClickHandler}
            ></img>
          </div>
          <PosterSlide />
        </div>
      </div>
    </div>
  );
}
export default Jumbotron;
