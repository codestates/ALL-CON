/* CSS import */
import defaultImg from '../../../images/default_image.jpg';
/* Store import */
import { RootState } from '../../../index';
import { logout, getUserInfo } from '../../../store/AuthSlice';
import { showConChinWritingModal } from '../../../store/ModalSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function ConChinWritingModal() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* useSelector */
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { target } = useSelector((state: RootState) => state.main);
  /* 지역상태 - useState */
  // 미리보기 이미지 상태
  const [preview, setPreview] = useState<string>('');
  const [previewHandle, setPreviewHandle] = useState<boolean>(false);

  // 글제목
  const [title, setTitle] = useState<string>('');
  // 모집중인 콘친수
  const [numTotalConchin, setNumTotalConchin] = useState<string>('2');
  // 현재 모인 콘친 수
  const [numPresentConchin, setNumPresentConchin] = useState<string>('1');
  // 글내용
  const [content, setContent] = useState<string>('');

  /* useEffect */

  /* handler 함수 (기능별 정렬) */
  // useEffect handle 함수 (async 못쓰기 때문에...)
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.files) {
      // formData 빈 객체를 만들어준다
      const formData = new FormData();

      formData.append('img', e.target.files[0]);
      // 선택한 이미지를 서버와 s3 bucket에 업로드한다
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      // AWS 버킷 주소 + 객체 키 값
      let imageFullUrl = `${process.env.REACT_APP_IMAGE_URL}/${response.data.imagePath}`
      // 미리보기 기능
      setPreview(imageFullUrl);
      setPreviewHandle(true);
    }
  };

  // (input) 글 제목
  const handleArticleTitle = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setTitle(e.target.value);
  };

  // (input) 모집중인 콘친 수
  const handleTotalNumConchin = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setNumTotalConchin(e.target.value);
  };

  // (input) 현재 모인 콘친 수
  const handlePresentNumConchin = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setNumPresentConchin(e.target.value);
  };

  // (input) 게시글 내용
  const handleArticleContent = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setContent(e.target.value);
  };

  // 작성하기 버튼
  const handleWriteBtn = async () => {
    // [POST] 서버로 게시물 작성 요청, ex) concert/:concertid/article => concertid는 변수 처리해야됨!
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/concert/${target.id}}/article`,
      { 
        title: title,
        content: content,
        image: preview,
      },
      { withCredentials: true },
    );
    console.log(response.data);
    alert('글 작성 성공! 😖');
    navigate('/conchin');
    dispatch(showConChinWritingModal(false));
    // 주의: 글 작성 성공 알림 모달 필요함!

    // 콘친 페이지 이동

    // 게시글 작성 모달도 닫는다
  };

  return (
    <div id='conChinWritingContainer'>
      <div
        id='outerBackGround'
        onClick={() => {
          dispatch(showConChinWritingModal(false));
        }}
      ></div>
      <div id='backGround'>
        <div id='writingModal'>
          <div className='imgSelectionWrapper'>
            <input type='file' id='imgSelection' onChange={handleImageUpload} />
          </div>
          {/* id를 className으로 바꿔야한다! */}
          {previewHandle ? (
            <img
              className='img'
              src={`${preview}`}
              alt='profileImage'
              id='image'
            />
          ) : (
            <img className='img' src={defaultImg} id='image' />
          )}
          {/* 주의! 현재 선택된 콘서트의 제목을 store에서 가져와서 변수로 치환해줘야함 */}
          <div id='concert' className='box'>
            {target.title}
          </div>
          <input
            className='box'
            id='write'
            placeholder='글 제목을 입력해주세요'
            onChange={handleArticleTitle}
          ></input>
          <div id='peopleNum' className='box'>
            <input
              type='number'
              min='1'
              className='want'
              placeholder='모집중인 콘친 수'
              onChange={handleTotalNumConchin}
            ></input>
            <input
              type='number'
              min='2'
              className='want'
              placeholder='현재 모인 콘친 수'
              onChange={handlePresentNumConchin}
            ></input>
          </div>
          <input
            id='board'
            placeholder='글 내용을 입력해주세요'
            onChange={handleArticleContent}
          ></input>
          <div className='box' id='btnBox'>
            <button
              id='no1'
              onClick={() => {
                handleWriteBtn();
              }}
            >
              작성하기
            </button>
            <button
              id='no2'
              onClick={() => {
                dispatch(showConChinWritingModal(false));
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConChinWritingModal;
