import profileImage from '../../../images/nyang.png';
import shield from '../../../images/shield.png';

function ConChinProfileModal() {
  return (
    <div id='conChinProfileModal'>
      <div id='bg' />
      <div id='modalBox'>
        <div id='modal'>
          <div id='profileBox'>
            <div id='imgWrapper'>
              <img className='img' src={profileImage} alt='profileImage' />
            </div>
            <div id='nickNameWrapper'>
              <p className='nickName'>냥냐라냥냥</p>
              <div id='shieldWrapper'>
                <img className='shield' src={shield} />
              </div>
            </div>
          </div>
          <div id='introductionBox'>
            <div id='emailWrapper'>
              <p className='title'>이메일</p>
              <span className='email'>catcatcat@cat.com</span>
            </div>
            <div id='genderAndAgeWrapper'>
              <p className='title'>성별</p>
              <span className='gender'>여</span>
              <p className='title2'>나이</p>
              <span className='age'>27</span>
            </div>
            <span id='introductionTitle'>자기소개</span>
            <div id='introductionWrapper'>
              <span id='introduction'>
                <p className='text'>이마크 이마 크다</p>
              </span>
            </div>
          </div>
          <div id='btnBox'>
            <button className='closeBtn'>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConChinProfileModal;
