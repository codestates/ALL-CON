/* CSS import */
import defaultImg from '../../../images/default_image.jpg';
/* Store import */
import { RootState } from '../../../index';
import { loginCheck } from '../../../store/AuthSlice';
import {
  showAlertModal,
  insertAlertText,
  insertBtnText,
  showSuccessModal,
  showConChinWritingModal,
} from '../../../store/ModalSlice';
import { setTarget } from '../../../store/MainSlice';
import {
  setAllArticles,
  setArticleTotalPage,
  setTargetArticle,
  setArticleCurPage,
} from '../../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function ConChinWritingModal() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  /* useSelector */
  const { target } = useSelector((state: RootState) => state.main);
  const { articleOrder, allArticles, targetArticle, targetArticlesUserInfo } =
    useSelector((state: RootState) => state.conChin);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  /* 지역상태 interface */

  interface ConChinTarget {
    id?: number;
    exclusive?: string;
    open_date?: Date;
    post_date?: string;
    image_concert?: string;
    title?: string;
    period?: string;
    place?: string;
    price?: string;
    running_time?: string;
    rating?: string;
    link?: string;
    view?: number;
    total_comment?: number;
    createdAt?: Date;
    updatedAt?: Date;
    activation?: boolean;
  }

  interface ConChinTargetArticle {
    concert_id?: number;
    content?: string;
    createdAt?: Date;
    id?: number;
    image?: string;
    member_count?: number;
    title?: string;
    total_comment?: number;
    total_member?: number;
    updatedAt?: Date;
    user_id?: number;
    view?: number;
    User?: {
      username?: string;
      image?: string;
    };
    activation?: boolean;
  }

  /* 지역상태 - useState */

  // target 변환
  const [conChinTarget, setConChinTarget] = useState<ConChinTarget>({});
  // targetArticle 변환
  const [conChinTargetArticle, setConChinTargetArticle] =
    useState<ConChinTargetArticle>({});

  // 미리보기 이미지 상태
  const [preview, setPreview] = useState<string>('');
  const [previewHandle, setPreviewHandle] = useState<boolean>(false);

  // 글제목
  const [title, setTitle] = useState<string>('');
  // 모집중인 콘친수
  const [numTotalConchin, setNumTotalConchin] = useState<string>('');
  // 현재 모인 콘친 수
  const [numPresentConchin, setNumPresentConchin] = useState<string>('');
  // 글내용
  const [content, setContent] = useState<string>('');

  /* useEffect */

  /* handler 함수 (기능별 정렬) */
  // useEffect handle 함수
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.files) {
      // formData 빈 객체를 만들어준다
      const formData = new FormData();

      formData.append('img', e.target.files[0]);
      // 선택한 이미지를 서버와 s3 bucket에 업로드한다
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      // AWS 버킷 주소 + 객체 키 값
      let imageFullUrl = `${process.env.REACT_APP_IMAGE_URL}/${response.data.imagePath}`;
      // 미리보기 기능
      setPreview(imageFullUrl);
      setPreviewHandle(true);
    }
  };

  // (input) 글 제목
  const handleArticleTitle = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (title.length < 21) {
      setTitle(e.target.value);
    } else {
      let exceptOneWord: string = '';
      for (let i = 0; i < title.length - 1; i++) exceptOneWord += title[i];
      setTitle(exceptOneWord);
      dispatch(insertAlertText('제목의 글자수는 20자를 넘을 수 없어요! 😖'));
      dispatch(showAlertModal(true));
    }
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
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): Promise<void> => {
    setContent(e.target.value);
  };

  // 작성하기 버튼
  const handleWriteBtn = async () => {
    // [POST] 서버로 게시물 작성 요청, ex) concert/:concertid/article => concertid는 변수 처리해야됨!
    if (title.length === 0 || title === undefined) {
      dispatch(insertAlertText('제목을 입력해 주세요! 😖'));
      dispatch(showAlertModal(true));
    } else if (title.length > 20) {
      let exceptOneWord: string = '';
      for (let i = 0; i < 20; i++) exceptOneWord += title[i];
      setTitle(exceptOneWord);
      dispatch(insertAlertText('제목의 글자수는 20자를 넘을 수 없어요! 😖'));
      dispatch(showAlertModal(true));
    } else if (Number(numPresentConchin) > Number(numTotalConchin)) {
      dispatch(
        insertAlertText('현재 모인 콘친 수가 모집 중인 콘친수보다 높아요! 😖'),
      );
      dispatch(showAlertModal(true));
      setNumPresentConchin('1');
      setNumTotalConchin('2');
    } else if (Number(numTotalConchin) <= 1) {
      dispatch(insertAlertText('모집인원은 2명이상이어야 해요! 😖'));
      dispatch(showAlertModal(true));
      setNumPresentConchin('1');
      setNumTotalConchin('2');
    } else if (Number(numPresentConchin) < 0 || Number(numTotalConchin) < 0) {
      dispatch(insertAlertText('콘친 수를 음수로 설정할 수 없어요! 😖'));
      dispatch(showAlertModal(true));
      setNumPresentConchin('1');
      setNumTotalConchin('2');
    } else if (Number(numPresentConchin) > 9 || Number(numTotalConchin) > 9) {
      dispatch(insertAlertText('모집인원은 9명을 넘을 수 없어요! 😖'));
      dispatch(showAlertModal(true));
      setNumPresentConchin('1');
      setNumTotalConchin('2');
    } else {
      if (content !== undefined) {
        // 글 작성할 때 enter 개행문자로 치환
        let result: any = content.replace(/(\n|\r\n)/g, '\n');

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/concert/${target.id}/article`,
          {
            title: title,
            content: result,
            image: preview,
            member_count: numPresentConchin,
            total_member: numTotalConchin,
          },
          { withCredentials: true },
        );
        // Axios 결과 로그아웃 상태시 MainPage Redirect
        if (response.data.message === 'Unauthorized userInfo!')
          return dispatch(loginCheck(false));

        dispatch(insertAlertText('글 작성에 성공했습니다! 🙂'));
        getTargetArticles();
        dispatch(insertBtnText('확인'));
        dispatch(showConChinWritingModal(false));
        dispatch(showSuccessModal(true));
      }
    }
  };

  // 수정하기 버튼
  const handleModifyBtn = async () => {
    // [POST] 서버로 게시물 작성 요청, ex) concert/:concertid/article => concertid는 변수 처리해야됨!
    if (title.length === 0 || title === undefined) {
      dispatch(insertAlertText('제목을 입력해 주세요! 😖'));
      dispatch(showAlertModal(true));
    } else if (title.length > 20) {
      let exceptOneWord: string = '';
      for (let i = 0; i < 20; i++) exceptOneWord += title[i];
      setTitle(exceptOneWord);
      dispatch(insertAlertText('제목의 글자수는 20자를 넘을 수 없어요! 😖'));
      dispatch(showAlertModal(true));
    } else if (Number(numPresentConchin) > Number(numTotalConchin)) {
      dispatch(
        insertAlertText('현재 모인 콘친 수가 모집 중인 콘친수보다 높아요! 😖'),
      );
      dispatch(showAlertModal(true));
      setNumPresentConchin('1');
      setNumTotalConchin('2');
    } else if (Number(numTotalConchin) <= 1) {
      dispatch(insertAlertText('모집인원은 2명이상이어야 해요! 😖'));
      dispatch(showAlertModal(true));
      setNumPresentConchin('1');
      setNumTotalConchin('2');
    } else if (Number(numPresentConchin) < 0 || Number(numTotalConchin) < 0) {
      dispatch(insertAlertText('콘친 수를 음수로 설정할 수 없어요! 😖'));
      dispatch(showAlertModal(true));
      setNumPresentConchin('1');
      setNumTotalConchin('2');
    } else if (Number(numPresentConchin) > 9 || Number(numTotalConchin) > 9) {
      dispatch(insertAlertText('모집인원은 9명을 넘을 수 없어요! 😖'));
      dispatch(showAlertModal(true));
      setNumPresentConchin('1');
      setNumTotalConchin('2');
    } else {
      if (content !== undefined) {
        // 글 작성할 때 enter 개행문자로 치환
        let result: any = content.replace(/(\n|\r\n)/g, '\n');
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${targetArticle.id}`,
          {
            title: title,
            content: result,
            image: preview,
            member_count: String(numPresentConchin),
            total_member: String(numTotalConchin),
          },
          { withCredentials: true },
        );
        // Axios 결과 로그아웃 상태시 MainPage Redirect
        if (response.data.message === 'Unauthorized userInfo!')
          return dispatch(loginCheck(false));

        dispatch(insertAlertText('글 수정에 성공했습니다! 🙂'));
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));
        dispatch(showConChinWritingModal(false));
        getTargetArticles();
        getTargetArticlesInfo();
      }
      // 주의: 글 수정 성공 알림 모달 필요함!
      // 게시글 수정 모달도 닫는다
    }
  };

  /* 타겟 게시물 받아오기 */
  const getTargetArticles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=${articleOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
        dispatch(setArticleCurPage(1));
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 게시물 정보 조회 핸들러 */
  const getTargetArticlesInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${targetArticle.id}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTargetArticle(response.data.data.articleInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (targetArticle.title !== undefined) {
      setTitle(targetArticle.title);
    }
    if (targetArticle.total_member !== undefined) {
      setNumTotalConchin(String(targetArticle.total_member));
    }
    if (targetArticle.total_member !== undefined) {
      setNumTotalConchin(String(targetArticle.total_member));
    }
    if (targetArticle.member_count !== undefined) {
      setNumPresentConchin(String(targetArticle.member_count));
    }
    if (targetArticle.content !== undefined) {
      setContent(targetArticle.content);
    }
  }, []);

  /* target 변경시 지역상태 conChinTarget 변경  */
  useEffect(() => {
    setConChinTarget(target);
  }, [target]);

  /* targetArticle 변경시 지역상태 conChinTargetArticle 변경  */
  useEffect(() => {
    setConChinTargetArticle(targetArticle);
  }, [targetArticle]);

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
            <label id='imgSelectionLabel' htmlFor='imgSelection'></label>
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
            <img
              className='img'
              src={
                conChinTargetArticle.image
                  ? conChinTargetArticle.image
                  : defaultImg
              }
              id='image'
            />
          )}
          {/* 주의! 현재 선택된 콘서트의 제목을 store에서 가져와서 변수로 치환해줘야함 */}
          <div id='concertWrapper'>
            <p id='concert'>{conChinTarget.title}</p>
          </div>
          <input
            className='box'
            type='text'
            id='write'
            onChange={handleArticleTitle}
            placeholder={
              conChinTargetArticle.title
                ? conChinTargetArticle.title
                : '제목을 입력해주세요.'
            }
            value={title}
          ></input>
          <div id='peopleNum' className='box'>
            <input
              type='number'
              min='1'
              max='9'
              className='want'
              placeholder={
                conChinTargetArticle.member_count
                  ? String(conChinTargetArticle.member_count)
                  : '현재 모인 콘친 수'
              }
              onChange={handlePresentNumConchin}
              value={numPresentConchin}
            ></input>
            <input
              type='number'
              min='2'
              max='9'
              className='want'
              placeholder={
                conChinTargetArticle.total_member
                  ? String(conChinTargetArticle.total_member)
                  : '모집중인 콘친 수'
              }
              onChange={handleTotalNumConchin}
              value={numTotalConchin}
            ></input>
          </div>
          <textarea
            id='board'
            placeholder={
              conChinTargetArticle.content
                ? conChinTargetArticle.content
                : '글 내용을 입력해주세요.'
            }
            onChange={handleArticleContent}
            value={content}
            wrap='soft'
          ></textarea>
          <div className='box' id='btnBox'>
            <button
              id='no1'
              onClick={() =>
                userInfo.id === conChinTargetArticle.user_id
                  ? handleModifyBtn()
                  : handleWriteBtn()
              }
            >
              {Object.keys(conChinTargetArticle).length > 0
                ? '수정하기'
                : '작성하기'}
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
