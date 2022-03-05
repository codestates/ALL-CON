/* Config import */
import { persistor } from '../../index';
/* CSS import */
import logo from '../images/allConLogo.png';
import menu from '../images/menu.png';
import search from '../images/search.png';
import user from '../images/user.png';
/* Store import */
import { RootState } from '../../index';
import {
  showLoginModal,
  showSideMenuModal,
  showMyDropDown,
  showConcertModal,
} from '../../store/ModalSlice';
import {
  setAllArticles,
  setArticleTotalPage,
  setArticleCurPage,
  setTargetArticle,
  setArticleRendered,
  setPostingOrder,
  setArticleOrder,
  setIsLoadingArticle,
} from '../../store/ConChinSlice';
import {
  setIsClosed,
  setScrollCount,
  setTimerMessage,
  setHeaderAllConcerts,
} from '../../store/HeaderSlice';
import { setPageNum } from '../../store/ConcertCommentSlice';
import {
  setPassToConcert,
  setOrder,
  setTarget,
  setTargetIdx,
  setIsRendering,
  setMainLoading,
  setAllConcerts,
  setIsOrderClicked,
} from '../../store/MainSlice';
import { setIsLoading } from '../../store/ConcertSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function SideMenuModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scrollCount } = useSelector((state: RootState) => state.header);
  const { isMainVisited, target } = useSelector(
    (state: RootState) => state.main,
  );

  /* 메뉴별 이동시 상태 초기화 핸들러 */
  const resetHandler = (menu: string) => {
    /* Common */
    dispatch(showConcertModal(false)); // concertPage 모달창
    /* LandingPage */
    if (menu === 'logo') {
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
    } else if (menu === 'concert') {
      /* ConcertPage */
      getAllConcerts();
      dispatch(setTarget({}));
      dispatch(setOrder('view'));
      navigate('/concert');
    } else if (menu === 'conchin') {
      /* ConChinPage */
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

  return (
    <div id='sideMenuModal'>
      <div
        id={scrollCount < 0.5 ? 'bg' : 'bgUp'}
        onClick={() => dispatch(dispatch(showSideMenuModal(false)))}
      />
      <div
        id={scrollCount < 0.5 ? 'modalBox' : 'downedModalBox'}
        onClick={() => dispatch(dispatch(showSideMenuModal(false)))}
      >
        <div id={scrollCount < 0.5 ? 'modal' : 'downedModal'}>
          <div id='sidemenuWrapper'>
            <Link
              to='/main'
              className='menus'
              onClick={() => resetHandler('main')}
            >
              <p>홈</p>
            </Link>
            <Link
              to='/concert'
              className='menus'
              onClick={() => resetHandler('concert')}
            >
              <p>콘서트</p>
            </Link>
            <Link
              to='/conchin'
              className='menus'
              onClick={() => resetHandler('conchin')}
            >
              <p>콘친 찾기</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenuModal;
