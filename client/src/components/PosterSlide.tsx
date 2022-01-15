/* CSS import */
import crown from '../images/crown.png';
/* Store import */
import { RootState } from '../index';
import { setOrder, setTarget, setFirstIdx } from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function PosterSlide() {
  const { firstConcert } = useSelector((state: RootState) => state.main);
  const { secondConcert } = useSelector((state: RootState) => state.main);
  const { thirdConcert } = useSelector((state: RootState) => state.main);
  const { fourthConcert } = useSelector((state: RootState) => state.main);
  const { fifthConcert } = useSelector((state: RootState) => state.main);

  return (
    <>
      {/* <div className='posterContainer'>
        <div id='crownWrapper'>
          <img id='posterCrown' src={crown} alt='왕관아이콘'></img>
        </div>
        <>
          <div id='posterWrapper1'>
            {fourthConcert.image_concert ? (
              <img
                alt='포스터'
                src={fourthConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
            ) : (
              console.log('받아온 이미지가 없습니다')
            )}
            <div className='posterCover2'></div>
          </div>
          <div id='posterWrapper2'>
            {fifthConcert.image_concert ? (
              <img
                alt='포스터'
                src={fifthConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
            ) : (
              console.log('받아온 이미지가 없습니다')
            )}
            <div className='posterCover'></div>
          </div>
          <div id='posterWrapper3'>
            {firstConcert.image_concert ? (
              <img
                alt='포스터'
                src={firstConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
            ) : (
              console.log('받아온 이미지가 없습니다')
            )}
            <div className='dDay'>
              <p>D-5</p>
            </div>
          </div>
          <div id='posterWrapper4'>
            {secondConcert.image_concert ? (
              <img
                alt='포스터'
                src={secondConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
            ) : (
              console.log('받아온 이미지가 없습니다')
            )}
            <div className='posterCover'></div>
          </div>
          <div id='posterWrapper5'>
            {thirdConcert.image_concert ? (
              <img
                alt='포스터'
                src={thirdConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
            ) : (
              console.log('받아온 이미지가 없습니다')
            )}
            <div className='posterCover2'></div>
          </div>
        </>
      </div> */}
    </>
  );
}

export default PosterSlide;
