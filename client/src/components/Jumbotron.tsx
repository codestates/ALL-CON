/* Config import */
import { REACT_APP_API_URL } from '../config';
/* CSS import */
import PosterSlide from './PosterSlide';
import six from '../images/six.gif';
/* Store import */
import { setOrder } from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Jumbotron() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div id='jumboContainer'>
      <div id='jumboMiniContainer'>
        <img src={six} alt='선택된 포스터' id='jumboChosen' />
      </div>
      <div className='jumboTopBox'>
        <div id='jumboTextsAlignBox'>
          <div className='jumboTextBox'>
            <h1 id='jumboWhat'>WHAT'S</h1>
            <h1 id='jumboClassify'>HOT</h1>
          </div>
          <div id='tabBar'>
            <p>HOT</p>
            <p>NEAR</p>
            <p>NEW</p>
          </div>
        </div>
        <div id='jumboPosterSlideWrapper'>
          <PosterSlide />
        </div>
      </div>
    </div>
  );
}
export default Jumbotron;
