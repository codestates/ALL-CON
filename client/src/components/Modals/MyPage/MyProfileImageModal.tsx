import profileImage from '../../../images/taeyang.png';
import camera from '../../../images/camera.png';

function MyProfileImageModal() {
  return (
    <div id='myProfileImageModal'>
      <div id='bg' />
      <div id='modalBox'>
        <div id='modal'>
          <div id='titleWrapper'>
            <p id='title'>프로필 사진 변경</p>
          </div>
          <div id='imgBox'>
            <div id='imgWrapper'>
              <img className='img' src={profileImage} alt='profileImage' />
            </div>
            <div id='cameraWrapper'>
              <img className='camera' src={camera} alt='camera' />
            </div>
          </div>
          <div id='modifyBtnWrapper'>
            <button className='modifyBtn'>변경</button>
            <button className='cancleBtn'>변경 안함</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyProfileImageModal;
