import profileImage from '../../images/taeyang.png';
import camera from '../../images/camera.png';
import kakao from '../../images/kakaoOAuth.png';
import google from '../../images/googleOAuth.png';
import shield from '../../images/shield.png';

function MyProfileBox() {
  return (
    <div id='myProfileBox'>
      <div id='imgBox'>
        <div id='imgWrapper'>
          <img className='img' src={profileImage} />
        </div>
        <div id='cameraWrapper'>
          <img className='camera' src={camera} />
        </div>
      </div>
      <div id='introductionBox'>
        <div id='nickNameWrapper'>
          <div id='oauthWrapper'>
            <img className='oauth' src={google} />
          </div>
          <p className='nickName'>유태양발닦개</p>
          <div id='shieldWrapper'>
            <img className='shield' src={shield} />
          </div>
        </div>
        <div id='textWrapper'>
          <textarea id='introduction'>
            유태양 찐팬 경기/30/누구든 콘친 ㄱㄱ
          </textarea>
        </div>
        <div id='modifyBtnWrapper'>
          <button className='btn'>프로필 수정</button>
          <button className='btn'>콘친 인증</button>
        </div>
        <div id='resignBtnWrapper'>
          <button className='btn'>회원 탈퇴</button>
        </div>
      </div>
    </div>
  );
}

export default MyProfileBox;
