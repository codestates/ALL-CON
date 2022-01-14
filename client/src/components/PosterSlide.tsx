/* CSS import */
import crown from '../images/crown.png';
/* Store import */
import { RootState } from '../index';
import { setOrder, setTarget, setFirstIdx } from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

type concertProps = {
  firstConcert: {
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
  };
  secondConcert: {
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
  };
  thirdConcert: {
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
  };
  fourthConcert: {
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
  };
  fifthConcert: {
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
  };
};

function PosterSlide({
  firstConcert,
  secondConcert,
  thirdConcert,
  fourthConcert,
  fifthConcert,
}: concertProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fiveConcerts } = useSelector((state: RootState) => state.main);

  return (
    <>
      <div className='posterContainer'>
        <div id='crownWrapper'>
          <img id='posterCrown' src={crown} alt='왕관아이콘'></img>
        </div>
        {fiveConcerts ? (
          <>
            <div id='posterWrapper1'>
              <img
                alt='포스터'
                src={fourthConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover2'></div>
            </div>
            <div id='posterWrapper2'>
              <img
                alt='포스터'
                src={fifthConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover'></div>
            </div>
            <div id='posterWrapper3'>
              <img
                alt='포스터'
                src={firstConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='dDay'>
                <p>D-5</p>
              </div>
            </div>
            <div id='posterWrapper4'>
              <img
                alt='포스터'
                src={secondConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover'></div>
            </div>
            <div id='posterWrapper5'>
              <img
                alt='포스터'
                src={thirdConcert.image_concert}
                className='posterImg'
                id='poster'
              ></img>
              <div className='posterCover2'></div>
            </div>
          </>
        ) : (
          <p>받아온 콘서트 정보가 없습니다.</p>
        )}
      </div>
    </>
  );
}

export default PosterSlide;
