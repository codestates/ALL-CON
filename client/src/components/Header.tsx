import menu from '../images/menu.png';
import search from '../images/search.png';
import logo from '../images/allConLogo.png';
import { useState, useEffect } from 'react';

function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });
  return (
    <div id='headerContainer'>
      <div id='logoBar'>
        <img className='logo' src={logo} />
      </div>
      <div id={scrollPosition < 48 ? 'absoluteBar' : 'fixedBar'}>
        <div id='menuWrapper'>
          <img className='menu' src={menu} />
        </div>
        <div id='searchWrapper'>
          <img className='search' src={search} />
        </div>
        <div id='loginWrapper'>
          <p className='login'>로그인</p>
        </div>
        <div id='hiddenMenuBox'>
          <p className='menu'>홈</p>
          <p className='menu'>콘서트</p>
          <p className='menu'>콘친 찾기</p>
        </div>
        <div id='hiddenSearchBox'>
          <div id='searchWrapper'>
            <input
              className='searchBar'
              placeholder='검색어를 입력해주세요.'
            ></input>
          </div>
          <div id='imgWrapper'>
            <img className='img' src={search} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
