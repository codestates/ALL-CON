/* Store import */
import { RootState } from '../../index';
import { showSideMenuModal } from '../../store/ModalSlice';
/* Library import */
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SideMenuModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  /* 스크롤 위치 저장 */
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  return (
    <div id='sideMenuModal'>
      <div
        id='bg'
        onClick={() => dispatch(dispatch(showSideMenuModal(false)))}
      />
      <div id={scrollPosition < 0.5 ? 'modalBox' : 'downedModalBox'}>
        <div id={scrollPosition < 0.5 ? 'modal' : 'downedModal'}>
          <div id='sidemenuWrapper'>
            <Link to='/main' className='menus'>
              <p>홈</p>
            </Link>
            <Link to='/concert' className='menus'>
              <p>콘서트</p>
            </Link>
            <Link to='/conchin' className='menus'>
              <p>콘친 찾기</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenuModal;
