import redLock from '../../images/falsyPadlock.png';

function SignUpModal() {
  return (
    <div id='signUpModalContainer'>
      <div id='background'>
        <div id='signUpModal'>
          <div id='alignContainer'>
            <div id='topBox'>
              <h2>회원가입</h2>
              <div id='goSignUp'>
                <h3 id='no1' className='fontMatch'>
                  이미 회원이신가요?
                </h3>
                <u id='no2' className='fontMatch'>
                  로그인 하기
                </u>
              </div>
            </div>
            <div id='midBox'>
              <p className='fontMatch'>닉네임</p>

              <div className='outerTextBox'>
                <input className='textBoxMatch2'></input>
                <button>중복확인</button>
              </div>
              <div className='warningMsg'>이미 사용중인 닉네임입니다.</div>

              <p className='fontMatch'>이메일</p>
              <div className='outerTextBox'>
                <input className='textBoxMatch2'></input>
                <button>인증하기</button>
              </div>
              <div className='warningMsg'>이미 사용중인 이메일입니다.</div>

              <p className='fontMatch'>비밀번호</p>
              <div className='outerTextBox'>
                <input className='textBoxMatch2'></input>
                <div id='no1'>
                  <img src={redLock} className='Img' alt='자물쇠 아이콘'></img>
                </div>
              </div>
              <div className='warningMsg'>
                8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
              </div>

              <p className='fontMatch'>비밀번호 확인</p>
              <div className='outerTextBox'>
                <input className='textBoxMatch2'></input>
                <div id='no2'>
                  <img src={redLock} className='Img' alt='자물쇠 아이콘'></img>
                </div>
              </div>
              <div className='warningMsg'>비밀번호가 일치하지 않습니다.</div>
            </div>

            <div id='bottomBox'>
              <div id='agreeBox'>
                <div className='checkBox fontMatch2'>
                  <input type='checkbox'></input>
                  <p>전체동의</p>
                </div>
                <div className='checkBox fontMatch2'>
                  <input type='checkbox'></input>
                  <p>[필수]ALL-CON 이용 약관 동의</p>
                </div>
                <div className='checkBox fontMatch2'>
                  <input type='checkbox'></input>
                  <p>[필수]개인정보 수집/이용/취급 위탁 동의</p>
                </div>
              </div>
              <div id='buttons'>
                <button className='fontMatch textBoxMatch3' id='signUpBtn'>
                  가입하기
                </button>
                <button className='fontMatch textBoxMatch3' id='exitBtn'>
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpModal;
