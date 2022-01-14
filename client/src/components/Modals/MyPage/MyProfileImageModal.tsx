/* Config import */
import { REACT_APP_API_URL, REACT_APP_DEFAULTUSERIMAGE_URL, REACT_APP_IMAGE_URL  } from '../../../config'
/* CSS import */
import profileImage from '../../../images/taeyang.png';
import camera from '../../../images/camera.png';
/* Store import */
import { RootState } from '../../../index';
import { logout, getUserInfo } from '../../../store/AuthSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

/* 타입 스크립트 */
type MyProfileImageModalProps = {
  handleProfileEditBackground: () => void;
}

function MyProfileImageModal({ handleProfileEditBackground }: MyProfileImageModalProps) {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  /* 지역상태 - useState */

  const [content, setContent] = useState<object>({})

  // 미리보기 이미지 상태
  const [preview, setPreview] = useState<string>('')
  const [previewHandle, setPreviewHandle] = useState<boolean>(false)

  /* useEffect */
  // 프로필 이미지가 선택되었을 때 (미리보기)
  useEffect(()  => {
      // handleImageUpload()
      console.log('-------- userInfo 확인 ----------------', userInfo)
      console.log('-------- userInfo image 확인 ----------------', userInfo.image)
  }, [content])

  /* handler 함수 (기능별 정렬) */
  // useEffect handle 함수 (async 못쓰기 때문에...)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if(e.target.files) {

      // formData 빈 객체를 만들어준다
      const formData = new FormData();

      formData.append('img', e.target.files[0]);
      // 선택한 이미지를 서버와 s3 bucket에 업로드한다
      const response = await axios.post(`${REACT_APP_API_URL}/upload`, formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      // AWS 버킷 주소 + 객체 키 값
      let imageFullUrl = `${REACT_APP_IMAGE_URL}` + `${response.data.imagePath}`
      // 미리보기 기능
      setPreview(imageFullUrl)
      setPreviewHandle(true)
    }
  }

  // 변경 버튼을 클릭하면, 현재 preview 이미자가 유저의 프로필 이미지로 변경된다 (Users DB에 해당 이미지 url를 저장한다)
  const handleProfileImgSave = async () => {
    try {
      // 변경하기 버튼을 클릭하면, 해당 이미지를 프로필 이미지로 변경
      const response = await axios.patch(
        `${REACT_APP_API_URL}/user/picture`,
        { image: preview },
        { withCredentials: true },
      );
      // 성공적으로 프로필 이미지가 변경되었다면, 다음을 실행한다
      if (response.data.data) {
        // 변경된 프로필 이미지로 유저 상태를 업데이트 한다
        dispatch(getUserInfo(response.data.data));
        // 프로필 변경 모달을 닫고, 마이페이지로 이동한다
        handleProfileEditBackground()
        navigate('/mypage')
      }
    } catch (err) {

    }
  }

  return (
    <div id='myProfileImageModal'>
      <div id='bg' onClick={() => {handleProfileEditBackground()}}/>
      <div id='modalBox'>
        <div id='modal'>
          <div id='titleWrapper'>
            <p id='title'>프로필 사진 변경</p>
          </div>
          <div id='imgBox'>
            <div id='imgWrapper'>
              { previewHandle 
                ? <img className='img' src={`${preview}`} alt='profileImage' />
                : <img className='img' src={`${userInfo.image}`} />
              }
            </div>
            <div id='cameraWrapper'>
              <img className='camera' src={camera} alt='camera' />
            </div>
            <div className='imgSelectionWrapper'>
              <input type='file' id='imgSelection' onChange={handleImageUpload} />
            </div>
          </div>
          <div id='modifyBtnWrapper'>
            <button className='modifyBtn' onClick={() => {handleProfileImgSave()}}>변경</button>
            <button className='cancleBtn' onClick={() => {handleProfileEditBackground()}}>변경 안함</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyProfileImageModal;
