/* CSS import */
import shield from '../../images/shield.png';
import comment from '../../images/comment.png';
import noComment from '../../images/no_comment_img.png';
/* Store import */
import { RootState } from '../../index';
import { loginCheck } from '../../store/AuthSlice';
import {
  showAlertModal,
  insertAlertText,
  insertBtnText,
  showSuccessModal,
  showConChinProfileModal,
} from '../../store/ModalSlice';
import {
  setConChinPageAllComments,
  setConChinTotalNum,
  setConChinComment,
  setConChinTotalComments,
  setConChinPageNum,
} from '../../store/ConChinCommentSlice';
import {
  setTargetArticlesUserInfo,
  setAllArticles,
  setArticleCurPage,
  setArticleTotalPage,
  setTargetArticle,
} from '../../store/ConChinSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConChinArticleCommentBox() {
  const dispatch = useDispatch();
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { target } = useSelector((state: RootState) => state.main);
  const { targetArticle, articleOrder } = useSelector(
    (state: RootState) => state.conChin,
  );
  const {
    conChinPageNum,
    conChinPageAllComments,
    conChinComment,
    conChinTotalComments,
  } = useSelector((state: RootState) => state.conChinComments);

  /* 지역상태 interface */
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
  }

  /* useState => 지역상태 */
  const [conChinConChinPageAllComments, setConChinConChinPageAllComments] =
    useState<any[]>([]);
  const [conChinTargetArticle, setConChinTargetArticle] =
    useState<ConChinTargetArticle>({});
  const [conChinConChinTotalComments, setConChinConChinTotalComments] =
    useState<Number>(0);

  /* 댓글 작성 인풋 && 작성 버튼 클릭 여부 */
  const [inputComment, setInputComment] = useState<string>('');
  const [isClick, setIsClick] = useState<boolean>(false);
  /* byte 길이 & byte 초과 에러 */
  const [byteLength, setByteLength] = useState<number>(0);
  const [editByteLength, setEditByteLength] = useState<number>(0);
  const [byteError, setByteError] = useState<boolean>(false);
  const [editByteError, setEditByteError] = useState<boolean>(false);
  /* line 길이 & lien 초과 에러 */
  const [line, setLine] = useState<number>(0);
  const [lineError, setLineError] = useState<boolean>(false);
  /* 수정된 상태 & 특정 댓글 클릭 & 댓글 수정 모드 상태  */
  const [editMode, setEditMode] = useState<boolean>(false);
  const [clickId, setClickId] = useState<number>(0);
  const [editComment, setEditComment] = useState<string>('');

  /* 인풋 체인지 핸들러 */
  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    inputCheckByte(e.target.value); // byte 초과여부 체크
    inputCheckLine(e.target.value); // line 초과여부 체크

    if (!editMode && !byteError && !lineError) setInputComment(e.target.value);
    if (editMode && !editByteError && !lineError)
      setEditComment(e.target.value);
  };

  /* textarea 바이트 체크 함수 */
  const checkByte = (text: string): number => {
    const textLength = text.length; //입력한 문자수
    let totalByte = 0;

    // 반복문안에서 문자열 하나하나 유니코드로 전환하여 byte를 계산해준다.
    for (let i = 0; i < textLength; i++) {
      const char = text.charAt(i);
      const uniChar = char.charCodeAt(0).toString(16); //유니코드 형식으로 변환
      if (uniChar.length >= 4) {
        // 한글 : 2Byte
        totalByte += 2;
      } else {
        // 영문,숫자,특수문자 : 1Byte
        totalByte += 1;
      }
    }
    return totalByte;
  };

  /* textarea 바이트 초과 체크 함수 */
  const inputCheckByte = (text: string) => {
    const maxByte = 120; //최대 바이트
    const totalByte = checkByte(text);
    /* 댓글 최초 입력 */
    if (!editMode) {
      /* 현재 byte 길이를 상태로 저장 */
      setByteLength(totalByte);
      /* byte 길이에 따라 에러 상태 변경 */
      if (totalByte >= maxByte) setByteError(true);
      else setByteError(false);
    } else {
      /* 댓글 수정 입력 */
      setEditByteLength(totalByte);
      /* byte 길이에 따라 에러 상태 변경 */
      if (totalByte >= maxByte) {
        setEditByteError(true);
        setByteError(false);
      } else {
        setEditByteError(false);
        setByteError(false);
      }
    }
  };

  /* textarea 줄 초과 체크 함수 */
  const inputCheckLine = (text: string) => {
    const maxLine = 3; //최대 3줄
    const textLength = text.length; //입력한 문자수
    let inputLine = 0;
    // 반복문안에서 문자열 검사하여 줄바꿈 문자가 있는지 검사한다
    for (let i = 0; i < textLength; i++) {
      const char = text.charAt(i);
      const uniChar = char.charCodeAt(0).toString(16); //유니코드
      if (uniChar === 'a') {
        inputLine += 1;
      }
      /* 현재 Line을 상태로 저장 */
      setLine(inputLine);
    }
    /* line 상태에 따라 에러 상태 변경 */
    if (inputLine >= maxLine) {
      setLineError(true);
      dispatch(insertAlertText('3줄이상 입력은 불가능합니다! 🙂'));
      dispatch(showAlertModal(true));
      /* 현재 줄수를 1줄 줄이고, 마지막 문자를 삭제해준다. */
      setLine(2);
      if (!editMode) dispatch(setInputComment(text.slice(0, -1)));
      else dispatch(setEditComment(text.slice(0, -1)));
    } else {
      setLineError(false);
    }
  };

  /* byte, line, error 리셋 핸들러 */
  const resetState = () => {
    setEditMode(false); // 수정 모드 상태 초기화
    setByteLength(0); // 댓글 작성 인풋 Byte
    setEditByteLength(0); // 댓글 수정 인풋 Byte
    setByteError(false); // 댓글 작성 Byte 에러
    setEditByteError(false); // 댓글 수정 Byte 에러
    setLine(0); // 라인 수
    setLineError(false); // 라인 에러
  };

  /* 댓글 작성 핸들러 */
  const commentHandler = async () => {
    try {
      // 글 작성할 때 enter 개행문자로 치환
      const result: any = inputComment.replace(/(\n|\r\n)/g, '\n');
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${targetArticle.id}/comment`,
        { content: result },
        { withCredentials: true },
      );
      // Axios 결과 로그아웃 상태시 MainPage Redirect
      if (response.data.message === 'Unauthorized userInfo!')
        return dispatch(loginCheck(false));

      /* 서버의 응답결과에 유효한 값이 있다면 댓글 작성 성공 */
      if (response.data) {
        /* 클릭 상태 변경 후 알람창 생성 */
        setIsClick(true);
        resetState(); // byte, line, error 초기화
        dispatch(insertAlertText('댓글이 작성되었습니다! 🙂'));
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));
        getAllComments();
        dispatch(setConChinPageNum(0));
        dispatch(setConChinPageNum(1));
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
      // 글 작성할 때 enter 개행문자로 치환
      const result: any = editComment.replace(/(\n|\r\n)/g, '\n');
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${targetArticle.id}/comment/${conChinComment.id}`,
        { content: result },
        { withCredentials: true },
      );
      // Axios 결과 로그아웃 상태시 MainPage Redirect
      if (response.data.message === 'Unauthorized userInfo!')
        return dispatch(loginCheck(false));

      /* 서버의 응답결과에 유효한 값이 있다면 댓글 수정 성공 */
      if (response.data) {
        /* 클릭 상태 변경 후 알람창 생성 */
        setIsClick(true);
        setClickId(0);
        resetState(); // byte, line, error 초기화
        dispatch(insertAlertText('댓글이 수정되었습니다! 🙂'));
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));
        getAllComments();
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
  const commentDelHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    try {
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${targetArticle.id}/comment/${e.currentTarget.id}`,
        { withCredentials: true },
      );
      // Axios 결과 로그아웃 상태시 MainPage Redirect
      if (response.data.message === 'Unauthorized userInfo!')
        return dispatch(loginCheck(false));

      /* 서버의 응답결과에 유효한 값이 있다면 댓글 삭제 성공 */
      if (response.data) {
        /* 클릭 상태 변경 후 알람창 생성 */
        setIsClick(true);
        setClickId(0);
        resetState(); // byte, line, error 초기화
        dispatch(insertAlertText('댓글이 삭제되었습니다! 🙂'));
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));
        getAllComments();
        dispatch(setConChinPageNum(1));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        dispatch(insertAlertText('잘못된 요청입니다! 😖'));
        dispatch(showAlertModal(true));
      } else if (error.response?.status === 401) {
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
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${targetArticle.id}/comment?pageNum=${conChinPageNum}`,
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
      if (response.data) {
        console.log(response.data);
        /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */

        setIsClick(false);
        setInputComment('');
        dispatch(setConChinPageAllComments([]));
        dispatch(setConChinTotalNum(0));
        dispatch(setConChinTotalNum(response.data.data.totalPage));
        dispatch(
          setConChinPageAllComments(response.data.data.articleCommentInfo),
        );
        dispatch(setConChinTotalComments(response.data.data.totalComment));
      }
    } catch (err) {}
  };

  /* 유저정보 보기 핸들러 */
  const showUserProfile = (userRole: number) => {
    if (userRole === 2) {
      dispatch(showConChinProfileModal(true));
    } else if (userRole === 3) {
      dispatch(
        insertAlertText('콘친인증을 하지 않은 회원의 정보를 볼 수 없어요! 😖'),
      );
      dispatch(showAlertModal(true));
    }
  };

  /* 댓글 작성자 유저정보 조회 핸들러 */
  const getTargetArticlesUserInfo = async (el?: any) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/other/${el.user_id}`,
        { withCredentials: true },
      );
      if (response.data) {
        if (el.User.role === 2) {
          dispatch(setTargetArticlesUserInfo(response.data.data.userInfo));
          showUserProfile(el.User.role);
        } else if (el.User.role === 3) {
          showUserProfile(el.User.role);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // /* 타겟 게시물 받아오기 */
  // const getTargetArticles = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${targetArticle.id}`,
  //       { withCredentials: true },
  //     );
  //     if (response.data) {
  //       dispatch(setTargetArticle({}));
  //       dispatch(setTargetArticle(response.data.data.articleInfo));
  //       dispatch(
  //         setConChinTotalComments(response.data.data.articleInfo.total_comment),
  //       );
  //     } else {
  //       // console.log('ConChinPostingBox=> 없거나 실수로 못가져왔어요.');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getAllComments();
  // }, [conChinPageNum]);

  // useEffect(() => {
  //   getTargetArticles();
  // }, [isClick]);

  // useEffect(() => {
  //   getTargetArticles();
  // }, [isClick]);

  /* conChinPageAllComments 변경시 지역상태 conChinConChinPageAllComments 변경  */
  useEffect(() => {
    setConChinConChinPageAllComments(conChinPageAllComments);
  }, [conChinPageAllComments]);

  /* conChinTotalComments 변경시 지역상태 conChinConChinTotalComments 변경  */
  useEffect(() => {
    setConChinConChinTotalComments(conChinTotalComments);
  }, [conChinTotalComments]);

  return (
    <div id='commentBox'>
      {/* 댓글 작성 영역 */}
      <div className='writeBox'>
        <div className='nicknameBox'>
          <div className='nameWrapper'>
            {isLogin && userInfo.role !== 3 && (
              <img className='shield' src={shield} alt='인증 뱃지' />
            )}
            {isLogin && <p className='nickName'>{userInfo.username} 님</p>}
          </div>
          <p className={byteError ? 'byteError' : 'byte'}>
            {byteLength} / 120byte
          </p>
        </div>
        <div className='commentBodyBox'>
          <div className='imgWrapper'>
            {isLogin && (
              <img className='img' src={userInfo.image} alt='프로필 사진' />
            )}
          </div>
          <div className='bodyWrapper'>
            {isLogin ? (
              <textarea
                id='input'
                placeholder='댓글을 입력해주세요.'
                value={inputComment}
                onChange={inputChangeHandler}
                onClick={() => {
                  setClickId(0);
                  setEditMode(false);
                }}
              ></textarea>
            ) : (
              <div id='inputNotLogin'>댓글 작성은 로그인을 해주세요!</div>
            )}
            {isLogin ? (
              <div id='inputBtn' onClick={commentHandler}>
                작성하기
              </div>
            ) : (
              <div id='hiddenBtn'>작성하기</div>
            )}
          </div>
        </div>
      </div>

      <div id='conChinCountWrapper'>
        <div id='imgWrapper'>
          <img className='img' src={comment} alt='commentImg' />
        </div>
        <h1 className='count'>
          {conChinConChinTotalComments !== undefined
            ? conChinConChinTotalComments + ' 개의 댓글'
            : '0 개의 댓글'}
        </h1>
      </div>
      {/* 댓글 목록 map */}
      {conChinConChinPageAllComments.length > 0 ? (
        conChinConChinPageAllComments.map(el => (
          <div className='box'>
            <div className='dateBox'>
              <div className='nickNameAndDateWrapper'>
                {el.User.role !== 3 && (
                  <img className='shield' src={shield} alt='인증 뱃지' />
                )}
                <p className='nickNameAndDate'>
                  {el.User.username} |{' '}
                  {el.createdAt !== undefined && el.createdAt !== null
                    ? el.createdAt.substring(0, 10)
                    : null}
                </p>
              </div>
              <div className='optionWrapper'>
                {userInfo.id === el.user_id && el.id !== clickId && (
                  <div
                    className='optionBtn'
                    onClick={() => {
                      dispatch(setConChinComment(el));
                      setEditMode(true);
                      setClickId(el.id);
                      setByteLength(0);
                      setEditByteLength(checkByte(el.content));
                      setByteError(false);
                      setEditByteError(false);
                      setInputComment('');
                      setEditComment(el.content);
                    }}
                  >
                    수정하기
                  </div>
                )}
                {userInfo.id === el.user_id && el.id !== clickId && (
                  <div
                    id={String(el.id)}
                    className='optionBtn'
                    onClick={e => {
                      dispatch(setConChinComment(el));
                      setEditByteLength(checkByte(el.content));
                      commentDelHandler(e);
                    }}
                  >
                    삭제하기
                  </div>
                )}
                {el.id === clickId && (
                  <div className='optionBtn' onClick={commentEditHandler}>
                    수정
                  </div>
                )}
                {el.id === clickId && (
                  <div
                    className='optionBtn'
                    onClick={() => {
                      setEditMode(false);
                      setClickId(0);
                    }}
                  >
                    취소
                  </div>
                )}
              </div>
            </div>
            <div id='imgAndText'>
              <div
                className='imgWrapper'
                onClick={() => getTargetArticlesUserInfo(el)}
              >
                <img className='img' src={el.User.image} alt='프로필 사진' />
              </div>
              <div className='textWrapper'>
                {el.id === clickId ? (
                  <>
                    <textarea
                      id='text'
                      rows={3}
                      value={editComment}
                      onChange={inputChangeHandler}
                    />
                    <div className='byteWrapper'>
                      <p className={editByteError ? 'errorByteError' : 'byte'}>
                        {editByteLength} / 120byte
                      </p>
                    </div>
                  </>
                ) : (
                  <p id='text'>{el.content}</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className='emptyBox'>
            <div>댓글이 없습니다.</div>
            <img src={noComment} alt='noCommentImg' />
          </div>
        </>
      )}
    </div>
  );
}

export default ConChinArticleCommentBox;
