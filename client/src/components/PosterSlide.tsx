/* CSS import */
import crown from '../images/crown.png';
/* Store import */
import { RootState } from '../index';
/* Library import */
import { useSelector } from 'react-redux';

function PosterSlide() {
  const { target, targetIdx, allConcerts } = useSelector(
    (state: RootState) => state.main,
  );

  /* D-DAY 계산기 */
  const dayCalculator = (openDate?: Date): string => {
    if (openDate) {
      const today = new Date();
      const targetDay = new Date(openDate);
      const gap = targetDay.getTime() - today.getTime();
      const count = Math.ceil(gap / (1000 * 60 * 60 * 24));
      /* 남은 일수에 따라 디데이 리턴 */
      if (count === 1) return 'D-0';
      else if (count < 1) return '';
      else return 'D-' + (count - 1);
    }
    return '';
  };

  return (
    <div className='posterContainer'>
      {allConcerts[targetIdx - 2] && (
        <div id='posterWrapper1'>
          <img
            alt='포스터'
            src={allConcerts[targetIdx - 2].image_concert}
            className='posterImg'
            id='poster'
          />
          <div className='posterCover2'></div>
        </div>
      )}
      {allConcerts[targetIdx - 1] && (
        <div id='posterWrapper2'>
          <img
            alt='포스터'
            src={allConcerts[targetIdx - 1].image_concert}
            className='posterImg'
            id='poster'
          />
          <div className='posterCover'></div>
        </div>
      )}
      {allConcerts[targetIdx] && (
        <div id='posterWrapper3'>
          <img
            alt='포스터'
            src={allConcerts[targetIdx].image_concert}
            className='posterImg'
            id='poster'
          />
          <div id='alignDay'>
            <div id={dayCalculator(target.open_date) ? 'dDay' : 'hide'}>
              {dayCalculator(target.open_date)}
            </div>
          </div>
        </div>
      )}
      {allConcerts[targetIdx + 1] && (
        <div id='posterWrapper4'>
          <img
            alt='포스터'
            src={allConcerts[targetIdx + 1].image_concert}
            className='posterImg'
            id='poster'
          />
          <div className='posterCover'></div>
        </div>
      )}
      {allConcerts[targetIdx + 2] && (
        <div id='posterWrapper5'>
          <img
            alt='포스터'
            src={allConcerts[targetIdx + 2].image_concert}
            className='posterImg'
            id='poster'
          />
          <div className='posterCover2'></div>
        </div>
      )}
    </div>
  );
}

export default PosterSlide;
