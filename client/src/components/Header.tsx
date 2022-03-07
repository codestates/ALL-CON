/* CSS import */
import logo from '../images/allConLogo.png';
import menu from '../images/menu.png';
import search from '../images/search.png';
import yellowSearch from '../images/yellowSearch.png';
import user from '../images/user.png';
import xButton from '../images/xWhiteButton.png';
/* Component import */
import AutoComplete from './AutoComplete';
/* Store import */
import { RootState } from '../index';
import { setIsLoading } from '../store/ConcertSlice';
import {
  showLoginModal,
  showSideMenuModal,
  showMyDropDown,
  showConcertModal,
} from '../store/ModalSlice';
import { setIsOrderClicked, setMainLoading } from '../store/MainSlice';
import {
  setAllArticles,
  setArticleTotalPage,
  setArticleCurPage,
  setTargetArticle,
  setArticleRendered,
  setPostingOrder,
  setArticleOrder,
  setIsLoadingArticle,
} from '../store/ConChinSlice';
import {
  setIsClosed,
  setScrollCount,
  setTimerMessage,
  setHeaderAllConcerts,
  setIsPaused,
} from '../store/HeaderSlice';
import { setPageNum } from '../store/ConcertCommentSlice';
import {
  setPassToConcert,
  setOrder,
  setTarget,
  setTargetIdx,
  setIsRendering,
  setAllConcerts,
} from '../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* 타이머 함수 */
let timer: any;

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const {
    loginModal,
    signupModal,
    sideMenuModal,
    myDropDown,
    conChinProfileModal,
    conChinWritingModal,
    mainKakaoModal,
  } = useSelector((state: RootState) => state.modal);
  const { target, isMainVisited } = useSelector(
    (state: RootState) => state.main,
  );
  const { isClosed, scrollCount, timerMessage, isPaused } = useSelector(
    (state: RootState) => state.header,
  );

  /* search 버튼 클릭 상태 */
  const [searchClicked, setSearchClicked] = useState<boolean>(false);

  /* Header Timer */
  const [isPause, setIsPause] = useState<boolean>(false);

  let stDate = new Date().getTime();
  let edDate = new Date('2222-12-31 09:00:00').getTime(); // 종료날짜
  let RemainDate = edDate - stDate;
  /* 헤더 타이머 시작 핸들러 */
  const startTimer = () => {
    timer = setInterval(msg_time, 1000); // 타이머 1초간격으로 수행
  };
  /* 헤더 타이머 멈춤 핸들러 */
  const stopTimer = () => {
    clearInterval(timer);
  };

  /* 랜딩 페이지 클릭 시 히든타이머 호출 핸들러 */
  const showTimer = () => {
    dispatch(setIsClosed(false));
    dispatch(setIsPaused(false));
  };

  function msg_time() {
    if (isPause === false) {
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
        hours = `0${hours}`;
      }
      if (String(miniutes).length === 1) {
        miniutes = `0${miniutes}`;
      }
      if (String(seconds).length === 1) {
        seconds = `0${seconds}`;
      }
      let m = `다음 콘서트를 업데이트하기까지 ${hours}:${miniutes}:${seconds}`; // 남은 시간 text형태로 변경
      // console.log(m);
      dispatch(setTimerMessage(m));
      if (RemainDate < 0) {
        // 시간이 종료 되면
        stopTimer(); // 타이머 해제
        dispatch(setIsClosed(true));
      } else {
        RemainDate = RemainDate - 1000; // 남은시간 -1초
      }
    }
  }

  /* 드랍다운 오픈 상태 변경 핸들러 */
  const displayMyDropDown = () => {
    dispatch(showMyDropDown(!myDropDown));
  };
  /* 스크롤 위치 저장 핸들러 */
  const updateScroll = () => {
    dispatch(
      setScrollCount(window.scrollY || document.documentElement.scrollTop),
    );
  };

  /* 전체 게시물 받아오기 */
  const getAllArticles = async () => {
    try {
      /* 로딩 상태 세팅 article */
      dispatch(setIsLoadingArticle(false));
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/article?order=view`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setIsLoadingArticle(true));
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
        dispatch(setArticleCurPage(1));
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*전체 콘서트 받아오기 */
  const getMainAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=view`,
        { withCredentials: true },
      );
      if (response.data) {
        /* 서버 응답값이 있다면 & target 상태 변경 */
        setTimeout(() => {
          dispatch(setAllConcerts(response.data.data.concertInfo));
        }, 50);
        if (response.data.data.concertInfo[0].id !== target.id)
          dispatch(setTarget({}));
        dispatch(setOrder('view'));
        dispatch(setIsOrderClicked(false));
        setTimeout(() => {
          dispatch(setTargetIdx(0));
        }, 100);
        setTimeout(() => {
          dispatch(setTarget(response.data.data.concertInfo[0]));
        }, 150);
        dispatch(setPageNum(1));
        /* 상세 콘서트 받아오기 & 렌더링 상태 변경 */
        dispatch(setIsRendering(true));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 헤더 전체 콘서트 받아오기(정렬순:view) */
  const getHeaderAllConcerts = async () => {
    try {
      setSearchClicked(!searchClicked);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=view`,
        { withCredentials: true },
      );
      if (response.data) {
        /* 서버 응답값이 있다면 & target 상태 변경 */
        dispatch(setHeaderAllConcerts(response.data.data.concertInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 콘서트 페이지 전체 콘서트 받아오기(정렬순:view) */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=view`,
        { withCredentials: true },
      );
      if (response.data) {
        /* 서버 응답값이 있다면 & allConcerts 상태 변경 */
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setIsLoading(true));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 메뉴별 이동시 상태 초기화 핸들러 */
  const resetHandler = (menu: string) => {
    /* Common */
    dispatch(showConcertModal(false)); // concertPage 모달창
    /* LandingPage */
    if (menu === 'logo') {
      showTimer();
      setSearchClicked(false);
    } else if (menu === 'main') {
      /* MainPage */
      dispatch(setMainLoading(false));
      dispatch(setIsRendering(false));
      dispatch(setPassToConcert(false));
      if (isMainVisited === true) getMainAllConcerts();
      setTimeout(() => {
        dispatch(setMainLoading(true));
        navigate('/main');
      }, 500);
      setSearchClicked(false);
    } else if (menu === 'concert') {
      /* ConcertPage */
      getAllConcerts();
      dispatch(setTarget({}));
      dispatch(setOrder('view'));
      navigate('/concert');
      setSearchClicked(false);
    } else if (menu === 'conchin') {
      /* ConChinPage */
      dispatch(setTarget({}));
      dispatch(setTargetArticle({}));
      dispatch(setArticleRendered(false));
      dispatch(setArticleCurPage(1));
      navigate('/conchin');
      dispatch(setPostingOrder('view'));
      dispatch(setArticleOrder('view'));
      getAllConcerts();
      getAllArticles();
      setSearchClicked(false);
    }
  };
  //
  //
  /* Header Timer useEffect : 첫 렌더링시에만 */
  useEffect(() => {
    showTimer();
    setSearchClicked(false);
    dispatch(setScrollCount(0));
  }, []);

  useEffect(() => {
    if (isPaused === false) {
      startTimer();
    } else if (isPaused === true) {
      stopTimer();
    }
  }, [isPaused]);

  /* 스크롤 위치 저장 useEffect */
  useEffect(() => {
    if (scrollCount < 48) {
      window.addEventListener('scroll', updateScroll);
    }
  }, [scrollCount]);

  /* 해당 모달 띄워져있을 시 스크롤바 제거 useEffect */
  useEffect(() => {
    if (
      loginModal ||
      signupModal ||
      conChinProfileModal ||
      mainKakaoModal ||
      conChinWritingModal
    )
      document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [
    loginModal,
    signupModal,
    conChinProfileModal,
    mainKakaoModal,
    conChinWritingModal,
  ]);

  return (
    /* 해당 모달들(loginModal, signupModal 등) 띄워져있을 시 헤더 통채로 교체 */
    <div
      id={
        loginModal ||
        signupModal ||
        conChinProfileModal ||
        mainKakaoModal ||
        conChinProfileModal ||
        conChinWritingModal
          ? 'headerSecondContainer'
          : 'headerContainer'
      }
    >
      {/* x버튼 클릭 후 히든타이머 제거 */}
      {isClosed === false ? (
        <div id='firstHiddenBar'>
          {timerMessage}
          <div
            className='closeButtonWrapper'
            onClick={() => {
              dispatch(setIsClosed(true));
              dispatch(setIsPaused(true));
            }}
          >
            <img className='closeButton' src={xButton} />
          </div>
        </div>
      ) : null}
      <div id='logoBar'>
        <Link to='/main' onClick={() => resetHandler('logo')}>
          {/* 로고 호출 */}

          <img
            className={
              isClosed === false || searchClicked ? 'logohide' : 'logo'
            }
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
        <div
          id={searchClicked ? 'autoCompleteWrapper' : 'autoCompleteWrapperHide'}
        >
          <AutoComplete />
        </div>

        <div id='searchWrapper'>
          <img
            className='search'
            alt='searchImg'
            src={searchClicked ? yellowSearch : search}
            onClick={getHeaderAllConcerts}
          />
        </div>
        <div id='loginWrapper'>
          {/* 로그인 여부에 따라 프로필 이미지 혹은 로그인 버튼 출력 */}
          {isLogin ? (
            <div id='profileWrapper'>
              <img
                className='profile'
                alt='profileImg'
                src={userInfo.image ? userInfo.image : user}
                onClick={() => dispatch(displayMyDropDown())}
              />
            </div>
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
