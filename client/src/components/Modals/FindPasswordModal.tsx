/* Store import */
import { RootState } from '../../index';
import { showFindPasswordModal } from '../../store/ModalSlice';
/* Library import */
import { useSelector, useDispatch } from 'react-redux';

function FindPasswordModal() {
  const dispatch = useDispatch();

  return (
    <div id='findPasswordModal'>
      <div id='bg' onClick={() => dispatch(showFindPasswordModal(false))}/>
      <div id='modalBox'>
        <div id='modal'>
          <div id='titlesBox'>
            <div id='titleWrapper'>
              <p className='title'>비밀번호 찾기</p>
            </div>
            <div id='explainWrapper'>
              <p className='explain'>
                비밀번호를 찾고자 하는 아이디를 입력해 주세요.
                <br />
                이메일로 전송된 인증번호로 본인확인해 주세요.
              </p>
            </div>
          </div>
          <div id='emailBox'>
            <div id='titleWrapper'>
              <p className='title'>이메일</p>
            </div>
            <div id='inputWrapper'>
              <input className='input' placeholder='이메일을 입력해주세요.' />
              <div id='btnWrapper'>
                <button className='btn'>인증번호 받기</button>
              </div>
            </div>
          </div>
          <div id='btnBox'>
            <button className='btn' onClick={() => dispatch(showFindPasswordModal(false))}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FindPasswordModal;
