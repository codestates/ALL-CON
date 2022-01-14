/* Config import */
import { REACT_APP_API_URL } from '../../../config.js';
/* Store import */
import { RootState } from '../../../index';
import { setScrollCount } from '../../../store/HeaderSlice';
import { showMyDropDown } from '../../../store/ModalSlice';
import { setTarget } from '../../../store/MainSlice';
import { logout } from '../../../store/AuthSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function MyDropDown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { scrollCount } = useSelector((state: RootState) => state.header);
  const { target } = useSelector((state: RootState) => state.main);

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
      dispatch(setScrollCount(0));
      dispatch(setTarget({}));
      console.log(target);
    } catch (err) {
      console.log(err);
    }
  };

  const resetTarget = () => {
    dispatch(setTarget({}));
    console.log(target);
  };

  return (
    <div id='myDropModal'>
      <div id='bg' onClick={() => dispatch(dispatch(showMyDropDown(false)))} />
      <div
        id={scrollCount < 0.5 ? 'modalBox' : 'downedModalBox'}
        onClick={() => dispatch(dispatch(showMyDropDown(false)))}
      >
        <div id={scrollCount < 0.5 ? 'modal' : 'downedModal'}>
          <div id='myMenuWrapper'>
            <Link to='/mypage' className='menus' onClick={resetTarget}>
              <p>마이페이지</p>
            </Link>
            <Link to='/main' className='menus' onClick={() => logoutHandler()}>
              <p>로그아웃</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDropDown;
