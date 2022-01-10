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
          </div>
          <div id='genderBox'>
            <div id='titleWrapper'>
              <p className='title'>성별</p>
            </div>
            <span className='gender'>성별</span>
          </div>
          <div id='phoneBox'>
            <div id='titleWrapper'>
              <p className='title'>휴대전화</p>
            </div>
            <div id='region'>대한민국 +82</div>
            <div id='certificationWrapper'>
              <div id='recieveWrapper'>
                <input className='number' placeholder='전화번호 입력' />
                <button className='receiveBtn'>인증번호 받기</button>
              </div>
              <div id='confirmWrapper'>
                <input
                  className='number'
                  placeholder='인증번호를 입력하세요.'
                />
                <button className='confirmBtn'>인증번호 확인</button>
              </div>
            </div>
          </div>
          <div id='btnBox'>
            <div id='btnWrapper'>
              <button className='completeBtn'>인증 완료</button>
              <button className='cancelBtn'>취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConChinCertificationPage;
