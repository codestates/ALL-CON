/* Store import */
import { RootState } from '../../index';
import { showSideMenuModal } from '../../store/ModalSlice';
/* Library import */
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function SideMenuModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scrollCount } = useSelector((state: RootState) => state.header);

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
