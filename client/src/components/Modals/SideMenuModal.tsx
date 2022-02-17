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
} from '../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function SideMenuModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scrollCount } = useSelector((state: RootState) => state.header);
  const { target } = useSelector((state: RootState) => state.main);

  /* 메뉴별 이동시 상태 초기화 핸들러 */
  const resetHandler = (menu: string) => {
    /* Common */
    dispatch(showConcertModal(false)); // concertPage 모달창
    /* LandingPage */
    if (menu === 'logo') {
    } else if (menu === 'main') {
      /* MainPage */
      dispatch(setTarget({}));
      dispatch(setTargetIdx(0));
      dispatch(setOrder('view'));
      dispatch(setPageNum(1));
      dispatch(setIsRendering(false));
      dispatch(setPassToConcert(false));
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
      navigate('/conchin');
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
