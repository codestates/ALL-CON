/* CSS import */
import map from '../../../images/map.jpg';
import xButton from '../../../images/xButton.png';
/* Component import */
import KakaoMap from '../../ConcertPage/KakaoMap';
/* Store import */
import { RootState } from '../../../index';
import { showConcertModal } from '../../../store/ModalSlice';
import { setIsRendering, setPassToConcert, setTargetIdx } from '../../../store/MainSlice';
import { setPageNum } from '../../../store/ConcertCommentSlice';
/* Library import */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function ConcertModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { target, allConcerts } = useSelector((state: RootState) => state.main);
  
  useEffect(() => {
  }, [target]);

  /* D-DAY 계산기 */
  const dayCalculator = (openDate?: Date): string => {
    if(openDate){
      const today = new Date();
      const targetDay = new Date(openDate);
      const gap = targetDay.getTime() - today.getTime();
      const count = Math.ceil(gap / (1000 * 60 * 60 * 24));
      /* 남은 일수에 따라 디데이 리턴 */
      if(count === 1) return 'D-DAY';
      else if(count < 1) return '';
      else return 'D-'+(count-1);
    }
    return '';
  }

  /* Date 객체 형변환 */
  const dayFormatter = (openDate?: Date): string => {
    if(openDate){
      const strOpenDate = String(openDate);

      const year = strOpenDate.substring(0,4);
      const month = strOpenDate.substring(5,7);
      const date = strOpenDate.substring(8,10);
      const hour = Number(strOpenDate.substring(11,13));
      const minute = strOpenDate.substring(14,16);

      return String(year+'년 '+month+'월 '+date+'일 '+hour+' : '+minute);
    }
    return '';
  }

  /* 자세히 보기 버튼 클릭 핸들러 (현재 target Concert 상태로 mainPage 이동) */
  const moveMainHandler = () => {
    dispatch(setPassToConcert(true));
    dispatch(setIsRendering(false));
    dispatch(setPageNum(1));
    dispatch(setTargetIdx(allConcerts.findIndex(concert => concert.id === target.id)));
    dispatch(showConcertModal(false));
    navigate('/main');
  }

  return (
    <div id='concertModalContainer'>
      <div id='background'></div>
      <div id='concertModal'>
        <div id='closeBox'>
          <img src={xButton} alt='xButtonImg' onClick={() => dispatch(showConcertModal(false))}/>
        </div>
        <div id='AlignBox'>
          <div id='top_box'>
            <div id='titleAndDay'>
              <h2>{target.title}</h2>
              <p>{dayCalculator(target.open_date)}</p>
            </div>
            <div id='whereAndDate'>
              {target.exclusive==='' && <div className='whereWrapper'><p id='where'>인터파크</p><p id='where'>YES24</p></div>}
              {target.exclusive==='인터파크' && <div className='whereWrapper'><p id='where'>인터파크</p></div>}
              {target.exclusive==='YES24' && <div className='whereWrapper'><p id='where'>YES24</p></div>}
              <div className='dateWrapper'>
                <p id='date'>등록일: {target.post_date}  |  조회수: {target.view}</p>
              </div>
            </div>
          </div>
          <div id='mid_box'>
            <div className='posterWrapper'>
              <img id='poster' src={target.image_concert} alt='posterImg'/>
            </div>
            <div id='right-side'>
              <div id='conInfo'>
                <div id='miniTitle'>
                  {target.open_date && <p>티켓오픈일</p>}
                  {target.running_time && <p>관람시간</p>}
                  {target.rating && <p>등급</p>}
                  {target.place && <p>공연장소</p>}
                </div>
                <div id='answer'>
                  {target.open_date && <p>{dayFormatter(target.open_date)}</p>}
                  {target.running_time && <p>{target.running_time}</p>}
                  {target.rating && <p>{target.rating}</p>}
                  {target.place && <p>{target.place}</p>}
                </div>
              </div>
              <button id='more' onClick={moveMainHandler}>자세히 보기</button>
            </div>
          </div>
          {target.place ? 
          <div id='bottom_box'> <KakaoMap place={target.place}/></div> :
          <div id='bottom_box'>
            <h1>콘서트 위치정보를 찾을수 없습니다!</h1>
            <img id='noMap' src={map} alt='지도 이미지'></img>
          </div>}
        </div>
      </div>
    </div>
  );
}
export default ConcertModal;
