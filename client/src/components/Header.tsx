/* Config import */
import { REACT_APP_API_URL } from '../config.js';
import { persistor } from '../index';
/* CSS import */
import logo from '../images/allConLogo.png';
import menu from '../images/menu.png';
import search from '../images/search.png';
import user from '../images/user.png';
/* Store import */
import { RootState } from '../index';
import { logout } from '../store/AuthSlice';
import {
  showLoginModal,
  showSideMenuModal,
  showMyDropDown,
} from '../store/ModalSlice';
import {
  setIsScrolled,
  setScrollCount,
  setTimerMessage,
} from '../store/HeaderSlice';
import { setTarget } from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { loginModal, signupModal, sideMenuModal, myDropDown } = useSelector(
    (state: RootState) => state.modal,
  );
  const { isScrolled, scrollCount, timerMessage } = useSelector(
    (state: RootState) => state.header,
  );
  const { target } = useSelector((state: RootState) => state.main);
  const { allConcerts } = useSelector((state: RootState) => state.main);
  /* 타이머 변수 설정: 현재 시간 */
  let now = new Date();
  const sc = 1000;
  const mt = sc * 60;
  const hr = mt * 60;
  let nowHours = now.getHours() * hr;
  let nowMinutes = now.getMinutes() * mt;
  let nowSeconds = now.getSeconds() * sc;

  /* 타이머 변수 설정: 오픈 시간 */
  let openHours = 65;

  if (now.getHours() >= 9) {
    openHours -= now.getHours();
  } else {
    openHours = (11 - now.getHours()) * 2;
  }
  let openTime = openHours * hr;
  let nowTime = nowHours + nowMinutes + nowSeconds;
  let distance = openTime - nowTime;

  /* 타이머 변수 설정: 남은 시간 */
  let dHours: string | number = Math.floor(distance / hr / 2);
  let dMinutes: string | number = Math.floor((distance % hr) / mt);
  let dSeconds: string | number = Math.floor((distance % mt) / sc);

  /* 한자리 수일경우 옆에 0 붙이기 */
  if (String(dHours).length === 1) {
    dHours = `0${String(dHours)}`;
  }
  if (String(dMinutes).length === 1) {
    dMinutes = `0${String(dMinutes)}`;
  }
  if (String(dSeconds).length === 1) {
    dSeconds = `0${String(dSeconds)}`;
  }

  dispatch(
    setTimerMessage(
      `다음 콘서트를 업데이트하기까지 ${dHours}:${dMinutes}:${dSeconds}`,
    ),
  );

  /* 스크롤 위치 저장 useEffect */
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });
  /* 해당 모달 띄워져있을 시 스크롤바 제거 useEffect */
  useEffect(() => {
    if (loginModal || signupModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  });

  /* 현재시간 타이머 useEffect */
  useEffect(() => {
    const countdown = setInterval(
      () => {
        /* 현재 시간 */
        now = new Date();
        nowHours = now.getHours() * hr;
        nowMinutes = now.getMinutes() * mt;
        nowSeconds = now.getSeconds() * sc;
        nowTime = nowHours + nowMinutes + nowSeconds;
        distance = openTime - nowTime;

        /* 남은 시, 초, 분 */
        dHours = Math.floor(distance / hr / 2);
        dMinutes = Math.floor((distance % hr) / mt);
        dSeconds = Math.floor((distance % mt) / sc);
        /* 한자리 수일 경우 0 붙이기 */
        if (String(dHours).length === 1) {
          dHours = `0${String(dHours)}`;
        }
        if (String(dMinutes).length === 1) {
          dMinutes = `0${String(dMinutes)}`;
        }
        if (String(dSeconds).length === 1) {
          dSeconds = `0${String(dSeconds)}`;
        }
        dispatch(
          setTimerMessage(
            `다음 콘서트를 업데이트하기까지 ${dHours}:${dMinutes}:${dSeconds}`,
          ),
        );
      },
      1000,
      timerMessage,
    );
  }, [now]);

  /* 드랍다운 오픈 상태 변경 핸들러 */
  const displayMyDropDown = () => {
    dispatch(showMyDropDown(!myDropDown));
  };
  /* 스크롤 위치 저장 핸들러 */
  const updateScroll = () => {
    dispatch(
      setScrollCount(window.scrollY || document.documentElement.scrollTop),
    );
    if (scrollCount > 0.5) dispatch(setIsScrolled(true));
  };
  /* 랜딩 페이지 클릭 시 히든타이머 호출 핸들러 */
  const showTimer = () => {
    dispatch(setIsScrolled(false));
    dispatch(setTarget({}));
  };
  /* 타겟 초기화 핸들러 */
  const resetTarget = () => {
    dispatch(setTarget({}));
    dispatch(logout());
  };

  return (
    /* 해당 모달들(loginModal, signupModal 등) 띄워져있을 시 헤더 통채로 교체 */
    <div
      id={
        loginModal || signupModal ? 'headerSecondContainer' : 'headerContainer'
      }
    >
      {/* 스크롤 후 히든타이머 제거 */}
      <div id={isScrolled === false ? 'firstHiddenBar' : 'hiddenBar'}>
        {timerMessage}
      </div>

      <div id='logoBar'>
        <Link to='/' onClick={showTimer}>
          {/* 스크롤 후 로고 호출*/}
          <img
            className={isScrolled === false ? 'logohide' : 'logo'}
            alt='logoImg'
            src={logo}
          />
        </Link>
      </div>
      {/* 스크롤위치에 따라 헤더 포지션 변경 */}
      <div id={scrollCount < 48 ? 'absoluteBar' : 'fixedBar'}>
        {/* 사이드메뉴 open여부에따라 open/close */}
        <div
          id='menuWrapper'
          onClick={() => dispatch(showSideMenuModal(!sideMenuModal))}
        >
          <img className='menu' alt='menuImg' src={menu} />
        </div>
        <div id='searchWrapper'>
          <img className='search' alt='searchImg' src={search} />
        </div>
        <div id='loginWrapper'>
          {/* 로그인 여부에 따라 프로필 이미지 혹은 로그인 버튼 출력 */}
          {isLogin ? (
            <img
              className='profile'
              alt='profileImg'
              src={userInfo.image ? userInfo.image : user}
              onClick={() => dispatch(displayMyDropDown())}
            />
          ) : (
            <p className='login' onClick={() => dispatch(showLoginModal(true))}>
              로그인
            </p>
          )}
        </div>
        <div id='hiddenMenuBox'>
          <Link to='/main' onClick={resetTarget}>
            <p className='menu'>홈</p>
          </Link>
          <Link to='/concert' onClick={resetTarget}>
            <p className='menu'>콘서트</p>
          </Link>
          <Link to='/conchin' onClick={resetTarget}>
            <p className='menu'>콘친 찾기</p>
          </Link>
        </div>
        <div id='hiddenSearchBox'>
          <div id='searchWrapper'>
            <input
              className='searchBar'
              placeholder='검색어를 입력해주세요.'
            ></input>
          </div>
          <div id='imgWrapper'>
            <img className='img' alt='searchImg' src={search} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
