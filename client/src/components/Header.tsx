/* Config import */
import { REACT_APP_API_URL } from '../config.js';
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
import { setIsScrolled, setScrollCount } from '../store/HeaderSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { loginModal, signupModal, sideMenuModal, myDropDown } = useSelector(
    (state: RootState) => state.modal,
  );
  const { isScrolled, scrollCount } = useSelector(
    (state: RootState) => state.header,
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
  /* 드랍다운 오픈 상태 변경 핸들러 */
  const displayMyDropDown = () => {
    dispatch(showMyDropDown(!myDropDown));
  };
  /* 스크롤 위치 저장 핸들러 */
  const updateScroll = () => {
    dispatch(setIsScrolled(true));
    dispatch(
      setScrollCount(window.scrollY || document.documentElement.scrollTop),
    );
  };

  return (
    /* 해당 모달 띄워져있을 시 헤더 통채로 교체 */
    <div
      id={
        loginModal || signupModal ? 'headerSecondContainer' : 'headerContainer'
      }
    >
      {/* 첫 스크롤 전까지는 타이머 고정, 그 후부터는 숨겨지게 변경*/}
      <div id={isScrolled === false ? 'firstHiddenBar' : 'hiddenBar'}>
        다음 콘서트를 업데이트하기까지 13:49:06
      </div>

      <div id='logoBar'>
        <Link to='/landing'>
          {/* 첫 스크롤 전까지는 로고 숨김, 그 후부터는 나타나게 변경*/}
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
          <Link to='/main'>
            <p className='menu'>홈</p>
          </Link>
          <Link to='/concert'>
            <p className='menu'>콘서트</p>
          </Link>
          <Link to='/conchin'>
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
