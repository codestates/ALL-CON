import poster from '../../../images/hiphop2.gif';
import map from '../../../images/map.jpg';
import xButton from '../../../images/xButton.png';
/* Store import */
import { showConcertModal, showAlertModal, insertAlertText } from '../../../store/ModalSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function ConcertModal() {
  const dispatch = useDispatch();
  
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
              <h2>앙코르 핸즈포히어로 힙합페스티발</h2>
              <p>D-5</p>
            </div>
            <div id='whereAndDate'>
              <p id='where'>YES24</p>
              <p id='date'>등록일: 202x.xx.xx | 조회수: 1,715</p>
            </div>
          </div>
          <div id='mid_box'>
            <img id='poster' src={poster} alt='포스터'></img>
            <div id='right-side'>
              <div id='conInfo'>
                <div id='miniTitle'>
                  <p id='place'>장소</p>
                  <p id='time'>공연일시</p>
                </div>
                <div id='answer'>
                  <p id='place_r'>KBS 아레나</p>
                  <p id='time_r'>202x년 xx월 xx일 (x) 오후 x시</p>
                </div>
              </div>
              <button id='more'>자세히 보기</button>
            </div>
          </div>
          <div id='bottom_box'>
            <h1>콘서트 위치정보를 찾을수 없습니다!</h1>
            <img id='map' src={map} alt='지도 이미지'></img>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConcertModal;
