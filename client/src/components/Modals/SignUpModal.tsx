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
              <input className='textBoxMatch2'></input>
              <p className='fontMatch'>이메일</p>
              <input className='textBoxMatch2'></input>
              <p className='fontMatch'>비밀번호</p>
              <input className='textBoxMatch2'></input>
              <p className='fontMatch'>비밀번호 확인</p>
              <input className='textBoxMatch2'></input>
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
