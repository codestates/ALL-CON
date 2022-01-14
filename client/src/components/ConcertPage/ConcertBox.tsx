/* Store import */
import { RootState } from '../../index';
/* Library import */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
  // /* 전역 상태 */
  // const { target } = useSelector((state: RootState) => state.main);
  // /* 클릭 상태 */
  // const [ isChosen, setIsChosen ] = useState<boolean>(false);

  // useEffect(() => {
  //   if(target.id === concert.id) setIsChosen(true);
  //   else {
  //     setIsChosen(false);
  //   }
  // }, [target]);

  return (
    <div id='concertBoxOuterContainer'>
      <div id='concertBoxContainer'>
        <div className='imgWrapper'>
          <img id='poster' src={concert.image_concert} alt='포스터'/>
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
              <p id='view'>{concert.view}</p>
              <p id='place'>{concert.place}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertBox;
