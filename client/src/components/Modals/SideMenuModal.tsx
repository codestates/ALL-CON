/* Store import */
import { RootState } from '../../index';
import { showSideMenuModal } from '../../store/ModalSlice';
import { setTarget, setAllConcerts } from '../../store/MainSlice';
/* Library import */
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function SideMenuModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scrollCount } = useSelector((state: RootState) => state.header);
  const { target } = useSelector((state: RootState) => state.main);

  /* 타겟 초기화 핸들러 */
  const resetTarget = () => {
    dispatch(setTarget({}));
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
            <Link to='/main' className='menus' onClick={resetTarget}>
              <p>홈</p>
            </Link>
            <Link to='/concert' className='menus' onClick={resetTarget}>
              <p>콘서트</p>
            </Link>
            <Link to='/conchin' className='menus' onClick={resetTarget}>
              <p>콘친 찾기</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenuModal;
