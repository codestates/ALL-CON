/* CSS import */
import view from '../../images/view.png';
import viewWhite from '../../images/viewWhite.png';
/* Store import */
import { RootState } from '../../index';
/* Library import */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* props Type 설정 */
interface concertProps { 
  concert: {
    id?: number;
    exclusive?: string;
    open_date?: Date;
    post_date?: string;
    image_concert?: string;
    title?: string;
    period?: string;
    place?: string;
    plrice?: string;
    running_time?: string;
    rating?: string;
    link?: string;
    view?: number;
    total_comment?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
}

function ConcertBox( { concert }: concertProps ) {
  const dispatch = useDispatch();
  const { target } = useSelector((state: RootState) => state.main);

  const [ isChosen, setIsChosen ] = useState<boolean>(false);

  useEffect(() => {
    if(target.id === concert.id) setIsChosen(true);
    else setIsChosen(false);
  }, [target]);

  /* D-DAY 계산기 */
  const dayCalculator = (openDate?: Date): string => {
    if(openDate){
      const today = new Date();
      const targetDay = new Date(openDate);
      const gap = targetDay.getTime() - today.getTime();
      const count = Math.ceil(gap / (1000 * 60 * 60 * 24));
      /* 남은 일수에 따라 디데이 리턴 */
      if(count === 1) return 'D-0';
      else if(count < 1) return '';
      else return 'D-'+(count-1);
    }
    return '';
  }

  return (
    <div id={isChosen ? 'concertChosenBoxOuterContainer' : 'concertBoxOuterContainer'}>
      <div id='concertBoxContainer'>
        <div className='imgWrapper'>
          <img id='poster' src={concert.image_concert} alt='포스터'/>
          <div id={dayCalculator(concert.open_date) ? 'round' : 'hidden'}>{dayCalculator(concert.open_date)}</div>
        </div>
        <div className='infos'>
          <h2>{concert.title}</h2>
          <div className='miniBox'>
            <div id='left'>
              {(concert.exclusive==='') && <div className='tagWrapper'><p id='whereTag'>인터파크</p><p id='whereTag'>YES24</p></div>}
              {(concert.exclusive==='인터파크') && <div className='tagWrapper'><p id='whereTag'>인터파크</p></div>}
              {(concert.exclusive==='YES24') && <div className='tagWrapper'><p id='whereTag'>YES24</p></div>}
              <p id='date'>{concert.post_date}</p>
            </div>
            <div id='right'>
              <div className='viewWrapper'>
                <img src={isChosen ? viewWhite : view} alt='viewImg' />
                <p id='view'>{concert.view}</p>
              </div>
              <p id='place'>{concert.place}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertBox;