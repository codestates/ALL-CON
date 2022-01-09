import MyProfileBox from '../components/MyPage/MyProfileBox';
function ConChinCertificationPage() {
  return (
    <div id='conChinCertificationPage'>
      <div id='profileBoxWrapper'>
        <MyProfileBox />
      </div>
      <div id='userInfoWrapper'>
        <div id='userInfoBox'>
          <div id='emailWrapper'>
            <div id='titleWrapper'>
              <p className='title'>이메일</p>
            </div>
            <div id='email'>burgerking@gmail.com</div>
          </div>
          <div id='birthdayWrapper'>
            <div id='titleWrapper'>
              <p className='title'>생년월일</p>
            </div>
            <div id='birthdayBox'>
              <input className='short' placeholder='년(4자)' />
              <input className='short' placeholder='월' />
              <input className='short' placeholder='일' />
            </div>
            <div id='genderBox'>
              <div id='titleWrapper'>
                <p className='title'>성별</p>
              </div>
              <div className='gender'>성별</div>
            </div>
            <div id='phoneBox'>
              <div id='titleWrapper'>
                <p className='title'>휴대전화</p>
              </div>
              <div id='inputBoxWrapper'>
                <div className='region'>대한민국 +82</div>
                <div id='certificationWrapper'>
                  <input className='number' placeholder='전화번호 입력' />
                  <button className='receiveBtn'>인증번호 받기</button>
                </div>
                <input className='long' placeholder='인증번호를 입력하세요.' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConChinCertificationPage;
