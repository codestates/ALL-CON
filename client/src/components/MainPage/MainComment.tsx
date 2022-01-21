/* CSS import */
import shield from '../../images/shield.png';
/* Store import */
import { RootState } from '../../index';
import {
  showAlertModal,
  insertAlertText,
  insertBtnText,
  showSuccessModal,
  showConChinProfileModal
} from '../../store/ModalSlice';
import {
  setPageAllComments,
  setTotalNum,
  setComment,
} from '../../store/ConcertCommentSlice';
import { setTargetArticlesUserInfo } from '../../store/ConChinSlice'
/* Library import */
import axios, { AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function MainComment() {
  const dispatch = useDispatch();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { targetIdx, target, order } = useSelector(
    (state: RootState) => state.main,
  );
  const { pageNum, pageAllComments, comment } = useSelector(
    (state: RootState) => state.concertComments,
  );
  /* 댓글 인풋 && 버튼 클릭 */
  const [inputComment, setInputComment] = useState<string>('');
  const [isClick, setIsClick] = useState<boolean>(false);
  /* 특정 댓글 수정 모드 && 수정할 댓글 원본 상태  */
  const [clickIdEditMode, setClickIdEditMode] = useState<number>(0);
  const [editComment, setEditComment] = useState<string>('');

  useEffect(() => {
    getAllComments();
  }, [targetIdx, isClick, pageNum, order]);
  
  /* 인풋 체인지 핸들러 */
  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (clickIdEditMode > 0) setEditComment(e.target.value);
    else setInputComment(e.target.value);
  };

  /* 댓글 작성 핸들러 */
  const commentHandler = async () => {
    try {
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/comment`,
        { content: inputComment },
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 있다면 댓글 작성 성공 */
      if (response.data) {
        /* 클릭 상태 변경 후 알람창 생성 */
        setIsClick(true);
        dispatch(insertAlertText('댓글이 작성되었습니다! 🙂'));
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400)
        dispatch(insertAlertText('빈칸을 모두 입력해주세요! 😖'));
      else if (error.response?.status === 401)
        dispatch(insertAlertText('댓글 작성 권한이 없습니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  /* 댓글 수정 핸들러 */
  const commentEditHandler = async () => {
    try {
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/comment/${comment.id}`,
        { content: editComment },
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 있다면 댓글 수정 성공 */
      if (response.data) {
        /* 클릭 상태 변경 후 알람창 생성 */
        setIsClick(true);
        setClickIdEditMode(0);
        dispatch(insertAlertText('댓글이 수정되었습니다! 🙂'));
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400)
        dispatch(insertAlertText('잘못된 요청입니다! 😖'));
      else if (error.response?.status === 401)
        dispatch(insertAlertText('댓글 수정 권한이 없습니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  /* 댓글 삭제 핸들러 */
  const commentDelHandler = async (e:React.MouseEvent<HTMLDivElement>) => {
    try {
      // setDelId(Number(e.currentTarget.id))
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/comment/${e.currentTarget.id}`,
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 있다면 댓글 삭제 성공 */
      if (response.data) {
        /* 클릭 상태 변경 후 알람창 생성 */
        getAllComments();
        dispatch(insertAlertText('댓글이 삭제되었습니다! 🙂'));
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400){
        dispatch(insertAlertText('잘못된 요청입니다! 😖'));
        dispatch(showAlertModal(true));
      } else if (error.response?.status === 401){
        dispatch(insertAlertText('댓글 삭제 권한이 없습니다! 😖'));
        dispatch(showAlertModal(true));
      }
    }
  };

  /* 모든 댓글 가져오기 함수 */
  const getAllComments = async () => {
    try {
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/comment?pageNum=${pageNum}`,
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
      if (response.data) {
        /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */
        setIsClick(false);
        setInputComment('');
        dispatch(setTotalNum(response.data.data.totalPage));
        dispatch(setPageAllComments(response.data.data.concertCommentInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 댓글 유저정보 조회 핸들러 */
  const getTargetCommentsUserInfo = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/other/${id}`,
        { withCredentials: true },
      );
      if (response.data.data) {
        console.log(response.data);
        dispatch(setTargetArticlesUserInfo(response.data.data.userInfo));
        dispatch(showConChinProfileModal(true));
      } else {
        dispatch(insertAlertText('콘친인증을 하지 않은 회원의 정보를 볼 수 없어요! 😖'));
        dispatch(showAlertModal(true));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* Date 객체 형변환 */
  const dayFormatter = (openDate?: Date): string => {
    if(openDate){
      const strOpenDate = String(openDate);

      const year = strOpenDate.substring(0,4);
      const month = strOpenDate.substring(5,7);
      const date = strOpenDate.substring(8,10);
      const hour = Number(strOpenDate.substring(11,13));
      const minute = strOpenDate.substring(14,16);

      return String(year+'-'+month+'-'+date+'-'+hour+' : '+minute);
    }
    return '';
  }

  return (
    <div id='commentBox'>
      {/* 로그인시 보일 댓글 작성 영역 */}
      {isLogin && (
        <div className='writeBox'>
          <div className='nicknameBox'>
            <p className='nickName'>
              {isLogin ? userInfo.username + ' 님' : '로그인이 필요합니다.'}
            </p>
          </div>
          <div className='commentBodyBox'>
            <div className='imgWrapper'>
              {isLogin && (
                <img className='img' src={userInfo.image} alt='프로필 사진' />
              )}
              {isLogin && userInfo.role !== 3 && (
                <img className='shield' src={shield} alt='인증 뱃지' />
              )}
            </div>
            <div className='bodyWrapper'>
              <textarea
                id='input'
                placeholder='댓글을 입력해주세요.'
                value={inputComment}
                onChange={inputChangeHandler}
              ></textarea>
              <div id='inputBtn' onClick={commentHandler}>
                작성하기
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 댓글 목록 map */}
      {pageAllComments.length!==0 && pageAllComments.map((el, idx) => (
        <div className='box' key={idx}>
          <div className='dateBox'>
            <p className='nickNameAndDate'>
              {el.User.username} | {dayFormatter(el.createdAt).substring(0, 10)}
            </p>
            <div className='optionWrapper'>
              {(userInfo.id === el.user_id) && (el.id !== clickIdEditMode) &&  (
                <div
                  id={String(el.id)}
                  className='optionBtn'
                  onClick={() => {
                    setClickIdEditMode(el.id);
                    setIsClick(true);
                    dispatch(setComment(el));
                    setEditComment(el.content);
                  }}
                >
                  수정하기
                </div>
              )}
              {(userInfo.id === el.user_id) && (el.id !== clickIdEditMode) && 
                <div
                  id={String(el.id)}
                  className='optionBtn'
                  onClick={(e) => {
                    commentDelHandler(e);
                  }}
                >
                  삭제하기
                </div>
              }
              {el.id === clickIdEditMode && (
                <div className='optionBtn' onClick={commentEditHandler}>
                  수정
                </div>
              )}
              {el.id === clickIdEditMode && (
                <div className='optionBtn' onClick={() => setClickIdEditMode(0)}>
                  취소
                </div>
              )}
            </div>
          </div>
          <div id='imgAndText'>
            <div className='imgWrapper' onClick={()=> getTargetCommentsUserInfo(el.user_id)}>
              <img className='img' src={el.User.image} alt='프로필 사진' />
              {el.User.role !== 3 && (
                <img className='shield' src={shield} alt='인증 뱃지' />
              )}
            </div>
            <div className='textWrapper'>
              {el.id === clickIdEditMode ? (
                <textarea
                  id='text'
                  value={editComment}
                  onChange={inputChangeHandler}
                />
              ) : (
                <p id='text'>{el.content}</p>
              )}
              
            </div>
          </div>
        </div>
      ))}
      {pageAllComments.length===0 && <div className='emptyBox'>댓글이 없습니다.</div>}
    </div>
  );
}

export default MainComment;