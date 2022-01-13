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
import { showLoginModal, showSideMenuModal } from '../store/ModalSlice';
/* Library import */
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { sideMenuModal } = useSelector((state: RootState) => state.modal);
  const [ scrollPosition, setScrollPosition ] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });
  /* 스크롤 위치 저장 */
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  /* 로그아웃 핸들러 */
  const logoutHandler = async () => {
    try {
      await axios.post(
        `${REACT_APP_API_URL}/logout`,
        {},
        { withCredentials: true },
      );

      /* 로그인 상태 변경 & main 페이지로 이동 */
      dispatch(logout());
      navigate('/main');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='headerContainer'>
      <div id='hiddenBar'>다음 콘서트를 업데이트하기까지 13:49:06</div>
      <div id='logoBar'>
        <Link to='/main'>
          <img className='logo' alt='logoImg' src={logo} />
        </Link>
      </div>
      {/* 스크롤위치에 따라 헤더 포지션 변경 */}
      <div id={scrollPosition < 48 ? 'absoluteBar' : 'fixedBar'}>
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
              onClick={() => logoutHandler()}
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
