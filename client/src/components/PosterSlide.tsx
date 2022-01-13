/* CSS import */
import crown from '../images/crown.png';
import sf9 from '../images/sf99.jpg';
import six from '../images/six.gif';
import victon from '../images/victon.gif';
import hiphop2 from '../images/hiphop2.gif';
import kimjh from '../images/kimjh.jpg';
import defaultPoster from '../images/default_poster.jpg';
/* Store import */
import { RootState } from '../index';
import { setOrder, setTarget } from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function PosterSlide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { target } = useSelector((state: RootState) => state.main);

  return (
    <>
      <div className='posterContainer'>
        <div id='crownWrapper'>
          <img id='posterCrown' src={crown} alt='왕관아이콘'></img>
        </div>
        <div id='posterWrapper1'>
          <img
            alt='포스터'
            src={defaultPoster}
            className='posterImg'
            id='poster'
          ></img>
          <div className='posterCover2'></div>
        </div>
        <div id='posterWrapper2'>
          <img
            alt='포스터'
            src={defaultPoster}
            className='posterImg'
            id='poster'
          ></img>
          <div className='posterCover'></div>
        </div>
        <div id='posterWrapper3'>
          <img
            alt='포스터'
            src={target.image_concert}
            className='posterImg'
            id='poster'
          ></img>
          <div className='dDay'>
            <p>D-5</p>
          </div>
        </div>
        <div id='posterWrapper4'>
          <img alt='포스터' src={six} className='posterImg' id='poster'></img>
          <div className='posterCover'></div>
        </div>
        <div id='posterWrapper5'>
          <img
            alt='포스터'
            src={victon}
            className='posterImg'
            id='poster'
          ></img>
          <div className='posterCover2'></div>
        </div>
      </div>
    </>
  );
}

export default PosterSlide;
