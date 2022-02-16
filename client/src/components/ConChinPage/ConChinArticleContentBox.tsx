/* CSS import */
import articleDefaultImage from '../../images/default_image.jpg';
import defaultImage from '../../images/user.png';
import groupImage from '../../images/group.png';
import ConChinArticleCommentBox from './ConChinArticleCommentBox';
import ConChinCommentPagination from './ConChinCommentPagination';
/* Store import */
import { RootState } from '../../index';
import { loginCheck } from '../../store/AuthSlice';
import {
  insertAlertText,
  showConChinProfileModal,
  showAlertModal,
  showConChinWritingModal,
} from '../../store/ModalSlice';
import { setTarget } from '../../store/MainSlice';
import {
  setConChinPageAllComments,
  setConChinTotalNum,
  setConChinComment,
  setConChinTotalComments,
  setConChinPageNum,
} from '../../store/ConChinCommentSlice';
import {
  setAllArticles,
  setTargetArticle,
  setArticleCurPage,
  setArticleTotalPage,
  setArticleOrder,
  setTargetArticlesUserInfo,
} from '../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConChinArticleContentBox() {
  const dispatch = useDispatch();
  const { allArticles, articleOrder, targetArticle, targetArticlesUserInfo } =
    useSelector((state: RootState) => state.conChin);
  const { target } = useSelector((state: RootState) => state.main);
  const { userInfo } = useSelector((state: RootState) => state.auth);

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
  const [conChinTargetArticle, setConChinTargetArticle] =
    useState<ConChinTargetArticle>({});

  /* 유저정보 보기 핸들러 */
  const showUserProfile = () => {
    if (targetArticle.user_id !== undefined) {
      console.log('접근?');
      getTargetArticlesUserInfo(targetArticle.user_id);
      dispatch(showConChinProfileModal(true));
    }
  };

  /* 글 수정하기 핸들러 */
  const showMyConChinWritingModal = () => {
    if (userInfo.id === targetArticle.user_id) {
      dispatch(showConChinWritingModal(true));
    } else {
      // console.log('ConChinArticleContentBox=> 당신이 작성한 글이 아닙니다.');
    }
  };

  /* 글 삭제하기 & 경고모달 핸들러 */
  const deleteMyArticle = () => {
    if (userInfo.id === targetArticle.user_id) {
      dispatch(insertAlertText('글을 삭제합니다. 😖'));
      dispatch(showAlertModal(true));
      deleteArticle();
      dispatch(setArticleCurPage(1));
      getTargetArticles();
    } else {
      // console.log('ConChinArticleContentBox=> 당신이 작성한 글이 아닙니다.');
    }
  };

  /* 글 삭제하기 핸들러 */
  const deleteArticle = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${targetArticle.id}`,
        { withCredentials: true },
      );
      // Axios 결과 로그아웃 상태시 MainPage Redirect
      if (response.data.message === 'Unauthorized userInfo!')
        return dispatch(loginCheck(false));

      getTargetArticles();
    } catch (err) {
      console.log(err);
    }
  };

  /* 알림 모달 */
  const showAlert = () => {
    dispatch(showAlertModal(true));
  };

  /* 게시물 작성자 유저정보 조회 핸들러 => getTargetArticlesInfo 부분 수정하고 지워야함 */
  const getTargetArticlesUserInfo = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/other/${id}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTargetArticlesUserInfo(response.data.data.userInfo));
      }
    } catch (err) {
      console.log(err);
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
        dispatch(setAllArticles([]));
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
        dispatch(setTargetArticle({}));
        // dispatch(setArticleCurPage(1));
      } else {
        // console.log('ConChinPostingBox=> 없거나 실수로 못가져왔어요.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePostedDate = (postedDate?: Date): string => {
    const day = String(postedDate);
    const setDay =
      day.substr(0, 4) +
      '년 ' +
      day.substr(5, 2) +
      '월 ' +
      day.substr(8, 2) +
      '일 ' +
      day.substr(11, 2) +
      '시 ' +
      day.substr(14, 2) +
      '분 ';
    return setDay;
  };

  /* targetArticle 변경시 지역상태 conChinTargetArticle 변경  */
  useEffect(() => {
    setConChinTargetArticle(targetArticle);
  }, [targetArticle]);

  return (
    <>
      {conChinTargetArticle !== undefined &&
      Object.keys(conChinTargetArticle).length > 0 ? (
        <div id='conChinArticleContentBox' key={conChinTargetArticle.id}>
          <div id='titleBox'>
            <div className='title'>
              <h1 className='text'>{conChinTargetArticle.title}</h1>
            </div>
            <div id='profileBox'>
              <img
                className='img'
                src={
                  conChinTargetArticle.User
                    ? conChinTargetArticle.User.image
                    : defaultImage
                }
                onClick={
                  Object.keys(targetArticlesUserInfo).length === 0
                    ? showAlert
                    : showUserProfile
                }
              />
              <p className='nickName'>
                {conChinTargetArticle.User
                  ? conChinTargetArticle.User.username
                  : '탈퇴한 사용자'}
              </p>
            </div>
          </div>
          <div id='contentBox'>
            <div id='viewBox'>
              <p className='view'>
                등록일 : {handlePostedDate(conChinTargetArticle.createdAt)} |
                조회수 :
                {conChinTargetArticle.view !== undefined &&
                conChinTargetArticle.view >= 0
                  ? conChinTargetArticle.view
                  : ' 종료'}
              </p>
            </div>
            <div id='modifyBox'>
              <p className='modifyBtn' onClick={showMyConChinWritingModal}>
                {userInfo.id === conChinTargetArticle.user_id &&
                conChinTargetArticle.view !== undefined &&
                conChinTargetArticle.view >= 0
                  ? '수정'
                  : null}
              </p>
              <p className='deleteBtn' onClick={deleteMyArticle}>
                {userInfo.id === conChinTargetArticle.user_id ? '삭제' : null}
              </p>
              <div id='memberBoxWrapper'>
                <div className='memberBox'>
                  <img className='icon' src={groupImage} />
                  <div className='count'>
                    {conChinTargetArticle.view !== undefined &&
                    conChinTargetArticle.view >= 0
                      ? conChinTargetArticle.member_count
                      : '-'}
                    /
                    {conChinTargetArticle.view !== undefined &&
                    conChinTargetArticle.view >= 0
                      ? conChinTargetArticle.total_member
                      : '-'}
                  </div>
                </div>
              </div>
            </div>
            <div id='content'>
              <div id='imgWrapper'>
                <img
                  className='img'
                  src={
                    conChinTargetArticle.image
                      ? conChinTargetArticle.image
                      : articleDefaultImage
                  }
                />
              </div>
              <div className='textWrapper'>
                <p className='text'>{conChinTargetArticle.content}</p>
              </div>
            </div>
            <div id='commentWrapper'>
              <ConChinArticleCommentBox />
              <div id='paginationWrapper'>
                <ConChinCommentPagination />
              </div>
            </div>
          </div>
        </div>
      ) : (
        '게시글을 선택해주세요!'
      )}
    </>
  );
}

export default ConChinArticleContentBox;
