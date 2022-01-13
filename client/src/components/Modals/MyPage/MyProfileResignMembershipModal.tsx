/* Config import */
import { REACT_APP_API_URL } from '../../../config'
/* CSS import */
import ticket from '../../../images/resignTicket.png';
/* Store import */
import { logout } from '../../../store/AuthSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/* 타입 스크립트 */
type MyProfileResignMembershipModalProps = {
  handleAccountDeleteBackground: () => void;
}

function MyProfileResignMembershipModal({ handleAccountDeleteBackground }: MyProfileResignMembershipModalProps) {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* useSelector */

  /* 지역상태 - useState */

  /* useEffect */
  // 회원탈퇴 모달 상태

  /* handler 함수 (기능별 정렬) */
  // 취소 버튼
  const handleCancelBtn = async () => {
    console.log('취소 버튼을 클릭하셨습니다!')
    handleAccountDeleteBackground();
  }
  // 회원탈퇴 버튼
  const handleResignMembership = async () => {
    console.log('회원탈퇴 버튼을 클릭하셨습니다!')
    // navigate('/main');
    try {
      await axios.delete(
        `${REACT_APP_API_URL}/user/me`,
        { withCredentials: true }
      );
      alert('ALL-CON\nGoodbye! 😖') 
      /* 로그인 상태 변경 & main 페이지로 이동 */
      dispatch(logout());
      navigate('/main')
    } catch(error) {
      console.log(error)
    }
  }
  

  return (
    <div id='myProfileResignMembershipModal' >
      <div id='bg' onClick={() => {handleCancelBtn()}}/>
      <div id='modalBox'>
        <div id='modal'>
          <div id='titleWrapper'>
            <p id='title'>회원탈퇴</p>
          </div>
          <div id='imgBox'>
            <div id='imgWrapper'>
              <img className='img' src={ticket} alt='ticket' />
            </div>
          </div>
          <div id='explainWrapper'>
            <p className='explain' >
              유태양발닦개 (님)
              <br />
              정말 탈퇴하시겠습니까?
            </p>
          </div>
          <div id='resignBtnWrapper'>
            <button className='resignBtn' onClick={() => {handleCancelBtn()}}>취소</button>
            <button className='cancleBtn' onClick={() => {handleResignMembership()}}>회원 탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileResignMembershipModal;
