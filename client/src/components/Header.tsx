/* Config import */
import { persistor } from '../index';
/* CSS import */
import logo from '../images/allConLogo.png';
import menu from '../images/menu.png';
import search from '../images/search.png';
import user from '../images/user.png';
/* Component import */
import AutoComplete from './AutoComplete';
/* Store import */
import { RootState } from '../index';
import {
  showLoginModal,
  showSideMenuModal,
  showMyDropDown,
  showConcertModal,
} from '../store/ModalSlice';
import {
  setAllArticles,
  setArticleTotalPage,
  setArticleCurPage,
  setTargetArticle,
  setArticleRendered,
} from '../store/ConChinSlice';
import {
  setIsScrolled,
  setScrollCount,
  setTimerMessage,
} from '../store/HeaderSlice';
import { setPageNum } from '../store/ConcertCommentSlice';
import {
  setMainToConcert,
  setOrder,
  setTarget,
  setTargetIdx,
  setIsHeaderClick,
} from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { allConcerts, targetIdx, target, order } = useSelector(
    (state: RootState) => state.main,
  );
  const {
    loginModal,
    signupModal,
    sideMenuModal,
    myDropDown,
    conChinProfileModal,
    mainKakaoModal,
  } = useSelector((state: RootState) => state.modal);
  const { isScrolled, scrollCount, timerMessage } = useSelector(
    (state: RootState) => state.header,
  );
  const { articleOrder, allArticles } = useSelector(
    (state: RootState) => state.conChin,
  );

  /* Header Timer => 잘 돌아가긴 하지만 고도화 필요.. */
  let tid = setInterval(msg_time, 1000); // 타이머 1초간격으로 수행

  let stDate = new Date().getTime();
  let edDate = new Date('2222-12-31 09:00:00').getTime(); // 종료날짜
  let RemainDate = edDate - stDate;

  function msg_time() {
    let hours: string | number = Math.floor(
      (RemainDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let miniutes: string | number = Math.floor(
      (RemainDate % (1000 * 60 * 60)) / (1000 * 60),
    );
    let seconds: string | number = Math.floor(
      (RemainDate % (1000 * 60)) / 1000,
    );
    if (String(hours).length === 1) {
      miniutes = `0${hours}`;
    }
    if (String(miniutes).length === 1) {
      miniutes = `0${miniutes}`;
    }
    if (String(seconds).length === 1) {
      seconds = `0${seconds}`;
    }

    let m = `다음 콘서트를 업데이트하기까지 ${hours}:${miniutes}:${seconds}`; // 남은 시간 text형태로 변경
    dispatch(setTimerMessage(m));
    if (RemainDate < 0) {
      // 시간이 종료 되면
      clearInterval(tid); // 타이머 해제
    } else {
      RemainDate = RemainDate - 1000; // 남은시간 -1초
    }
  }
  /* Header Timer */

  /* 스크롤 위치 저장 useEffect */
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });
  /* 해당 모달 띄워져있을 시 스크롤바 제거 useEffect */
  useEffect(() => {
    if (loginModal || signupModal || conChinProfileModal || mainKakaoModal)
      document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  });

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
  };

  /* 전체 게시물 받아오기 */
  const getAllArticles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
        dispatch(setArticleCurPage(1));
      } else {
        console.log('없거나 실수로 못가져왔어요..');
      }
    } catch (err) {
      console.log(err);
      console.log('에러가 났나봐요.');
    }
  };

  /* 메뉴별 이동시 상태 초기화 핸들러 */
  const resetHandler = (menu: string) => {
    /* Common */
    dispatch(showConcertModal(false)); // concertPage 모달창
    /* LandingPage */
    if (menu === 'logo') {
      showTimer();
    } else if (menu === 'main') {
      /* MainPage */
      dispatch(setTarget({}));
      dispatch(setTargetIdx(0));
      dispatch(setOrder('view'));
      dispatch(setPageNum(1));
      dispatch(setMainToConcert(false));
      dispatch(setIsHeaderClick(true));
      navigate('/main');
    } else if (menu === 'concert') {
      /* ConcertPage */
      dispatch(setTarget({}));
      dispatch(setOrder('view'));
      navigate('/concert');
    } else if (menu === 'conchin') {
      /* ConChinPage */
      dispatch(setTarget({}));
      dispatch(setTargetArticle({}));
      dispatch(setArticleRendered(false));
      dispatch(setArticleCurPage(1));
      getAllArticles();
      navigate('/conchin');
    }
  };

  return (
    /* 해당 모달들(loginModal, signupModal 등) 띄워져있을 시 헤더 통채로 교체 */
    <div
      id={
        loginModal || signupModal || conChinProfileModal || mainKakaoModal
          ? 'headerSecondContainer'
          : 'headerContainer'
      }
    >
      {/* 스크롤 후 히든타이머 제거 */}
      <div id={isScrolled === false ? 'firstHiddenBar' : 'hiddenBar'}>
        {timerMessage}
      </div>

      <div id='logoBar'>
        <Link to='/' onClick={() => resetHandler('logo')}>
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
        <AutoComplete />
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
          <p className='menu' onClick={() => resetHandler('main')}>
            홈
          </p>
          <p className='menu' onClick={() => resetHandler('concert')}>
            콘서트
          </p>
          <p className='menu' onClick={() => resetHandler('conchin')}>
            콘친 찾기
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
