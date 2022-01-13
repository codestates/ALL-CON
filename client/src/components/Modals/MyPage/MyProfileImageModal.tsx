/* Config import */
import { REACT_APP_API_URL } from '../../../config'
/* CSS import */
import profileImage from '../../../images/taeyang.png';
import camera from '../../../images/camera.png';
/* Store import */
import { logout } from '../../../store/AuthSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
  /* 지역상태 - useState */

  const [content, setContent] = useState<object>({})

  const [test, setTest] = useState<string>('')

  // 미리보기 이미지 상태
  const [preview, setPreview] = useState<string>('')

  /* useEffect */
  // 프로필 이미지가 선택되었을 때 (미리보기)
  useEffect(()  => {
      // handleImageUpload()
  }, [content])

  /* handler 함수 (기능별 정렬) */

  // 이미지 파일 선택 버튼
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if(e.target.files) {
        // setContent(e.target.files[0])
        // setContent({
        //   lastModified: e.target.files[0].lastModified,
        //   name: e.target.files[0].name,
        //   size: e.target.files[0].size,
        //   type: e.target.files[0].type
        // })
        handleImageUpload(e)
    }
  }

  // 변경 버튼을 클릭하면, 현재 preview 이미자가 유저의 프로필 이미지로 변경된다 (Users DB에 해당 이미지 url를 저장한다)
  const handleProfileImgSave = async () => {
    console.log('변경 버튼을 클릭했습니다!')
    alert('ALL-CON\n프로필 사진이 변경되었습니다! 😖') 
    // 유저 프로필 상태 변경 & mypage 페이지로 이동 
    // dispatch(logout());
    handleProfileEditBackground()
    navigate('/mypage')
  }

  // useEffect handle 함수 (async 못쓰기 때문에...)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if(e.target.files) {

      const formData = new FormData();
      formData.append('img', e.target.files[0], e.target.files[0].name);

      console.log('formData', formData)

      const response = await axios.post(`http://localhost:8080/upload`, {
        fieldname: 'img',
        originalname: 'smil.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: 'uploads/',
        filename: 'smil.png',
        path: 'uploads/smil.png',
        size: 54752
      }, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })

      console.log('response', response)
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
              <img className='img' src={profileImage} alt='profileImage' />
            </div>
            <div id='cameraWrapper'>
              <img className='camera' src={camera} alt='camera' />
            </div>
            <div id='imgSelectionWrapper'>
              <input type='file' id='imgSelection' onChange={onChange} />
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
