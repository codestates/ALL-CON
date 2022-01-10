import MyProfileBox from '../components/MyPage/MyProfileBox';
import Footer from '../components/Footer';

function MyEditPage() {
  return (
    <div id='myEditPage'>
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
          <div id='nickNameWrapper'>
            <div id='titleWrapper'>
              <p className='title'>닉네임</p>
            </div>
            <div id='nickNameBox'>
              <input id='nickName' placeholder='유태양발닦개' />
            </div>
          </div>
          <div id='resetBox'>
            <div id='titleWrapper'>
              <p className='title'>비밀번호 변경</p>
            </div>
            <input className='reset' />
          </div>
          <div id='confirmBox'>
            <div id='titleWrapper'>
              <p className='title'>비밀번호 확인</p>
            </div>
            <input className='confirm' />
          </div>
          <div id='btnBox'>
            <div id='btnWrapper'>
              <button className='completeBtn'>인증 완료</button>
              <button className='cancelBtn'>취소</button>
            </div>
          </div>
        </div>
      </div>
      <div id='fullFooter'>
        <div id='footerWrapper'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MyEditPage;
