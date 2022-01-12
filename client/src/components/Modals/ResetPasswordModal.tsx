import padlock from '../../images/falsyPadlock.png';

function ResetPasswordModal() {
  return (
    <div id='resetPasswordModal'>
      <div id='bg' />
      <div id='modalBox'>
        <div id='modal'>
          <div id='titlesBox'>
            <div id='titleWrapper'>
              <p className='title'>비밀번호 재설정</p>
            </div>
            <div id='explainWrapper'>
              <p className='explain'>비밀번호를 변경해 주세요.</p>
            </div>
          </div>
          <div id='exceptTitlesBox'>
            <div id='emailWrapper'>
              <div id='titleWrapper'>
                <p className='title'>이메일</p>
              </div>
              <span className='email'>azussi@gmail.com</span>
            </div>
            <div className='newPasswordWrapper'>
              <div id='titleWrapper'>
                <p className='title'>새 비밀번호</p>
              </div>
              <div id='inputWrapper'>
                <input className='input'></input>
                <img className='padlock' src={padlock} />
              </div>
            </div>
            <div className='confirmPasswordWrapper'>
              <div id='titleWrapper'>
                <p className='title'>새 비밀번호 확인</p>
              </div>
              <div id='inputWrapper'>
                <input className='input'></input>
                <img className='padlock' src={padlock} />
              </div>
            </div>
            <div className='btnWrapper'>
              <button className='resetButton'>비밀번호 재설정</button>
              <button className='cancelButton'>취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResetPasswordModal;
