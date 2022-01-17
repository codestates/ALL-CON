/* CSS import */
import shield from '../../images/shield.png';
/* Store import */
import { RootState } from '../../index';
import {
  showAlertModal,
  insertAlertText,
  insertBtnText,
  showSuccessModal,
} from '../../store/ModalSlice';
import {
  setPageAllComments,
  setTotalNum,
  setComment,
} from '../../store/ConcertCommentSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function MainComment() {
  const dispatch = useDispatch();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { order, target, targetIdx } = useSelector(
    (state: RootState) => state.main,
  );
  const { pageNum, pageAllComments, comment } = useSelector(
    (state: RootState) => state.concertComments,
  );
  /* 댓글 인풋 && 버튼 클릭 */
  const [inputComment, setInputComment] = useState<string>('');
  const [isClick, setIsClick] = useState<boolean>(false);
  /* 특정 댓글 클릭 && 댓글 수정 모드 상태  */
  const [clickId, setClickId] = useState<number>(0);
  const [editComment, setEditComment] = useState<string>('');

  useEffect(() => {
    getAllComments();
  }, [target.id, isClick, pageNum]);

  /* 인풋 체인지 핸들러 */
  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (clickId > 0) setEditComment(e.target.value);
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
        setClickId(0);
        dispatch(insertAlertText('댓글이 수정되었습니다! 🙂'));
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400)
        dispatch(insertAlertText('잘못된 요청입니다! 😖'));
      else if (error.response?.status === 401)
        dispatch(insertAlertText('댓글 삭제 권한이 없습니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  /* 댓글 삭제 핸들러 */
  const commentDelHandler = async () => {
    console.log('삭제하려는 댓글 concert id: ', comment.id);
    try {
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/comment/${comment.id}`,
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 있다면 댓글 삭제 성공 */
      if (response.data) {
        /* 클릭 상태 변경 후 알람창 생성 */
        setIsClick(true);
        dispatch(insertAlertText('댓글이 삭제되었습니다! 🙂'));
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400)
        dispatch(insertAlertText('잘못된 요청입니다! 😖'));
      else if (error.response?.status === 401)
        dispatch(insertAlertText('댓글 삭제 권한이 없습니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
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
    } catch (err) {}
  };

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
      {pageAllComments.map(el => (
        <div className='box'>
          <div className='dateBox'>
            <p className='nickNameAndDate'>
              {el.User.username} | {el.createdAt.substring(0, 10)}
            </p>
            <div className='optionWrapper'>
              {userInfo.id === el.user_id && (
                <div
                  className='optionBtn'
                  onClick={() => {
                    setClickId(el.id);
                    dispatch(setComment(el));
                    setEditComment(el.content);
                  }}
                >
                  수정하기
                </div>
              )}
              {userInfo.id === el.user_id && (
                <div
                  className='optionBtn'
                  onClick={() => {
                    dispatch(setComment(el));
                    commentDelHandler();
                  }}
                >
                  삭제하기
                </div>
              )}
            </div>
          </div>
          <div id='imgAndText'>
            <div className='imgWrapper'>
              <img className='img' src={el.User.image} alt='프로필 사진' />
              {el.User.role !== 3 && (
                <img className='shield' src={shield} alt='인증 뱃지' />
              )}
            </div>
            <div className='textWrapper'>
              {el.id === clickId ? (
                <textarea
                  id='text'
                  value={editComment}
                  onChange={inputChangeHandler}
                />
              ) : (
                <p id='text'>{el.content}</p>
              )}
              {el.id === clickId && (
                <div className='textBtn' onClick={commentEditHandler}>
                  수정
                </div>
              )}
              {el.id === clickId && (
                <div className='textBtn' onClick={() => setClickId(0)}>
                  취소
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainComment;
