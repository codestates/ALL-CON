/* CSS import */
import articleDefaultImage from '../../images/default_image.jpg';
import defaultImage from '../../images/user.png';
import groupImage from '../../images/group.png';
import ConChinArticleCommentBox from './ConChinArticleCommentBox';
import ConChinCommentPagination from './ConChinCommentPagination';
/* Store import */
import { RootState } from '../../index';
import {
  insertAlertText,
  showConChinProfileModal,
  showAlertModal,
  showConChinWritingModal,
} from '../../store/ModalSlice';
import { setTarget } from '../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAllArticles,
  setTargetArticle,
  setArticleCurPage,
  setArticleTotalPage,
  setArticleOrder,
} from '../../store/ConChinSlice';

function ConChinArticleContentBox() {
  const dispatch = useDispatch();
  const { articleOrder, targetArticle, targetArticlesUserInfo } = useSelector(
    (state: RootState) => state.conChin,
  );

  const { target } = useSelector((state: RootState) => state.main);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  /* 유저정보 보기 핸들러 */
  const showUserProfile = () => {
    console.log('실행됨?');
    dispatch(showConChinProfileModal(true));
  };

  /* 글 수정하기 핸들러 */
  const showMyConChinWritingModal = () => {
    if (userInfo.id === targetArticle.user_id) {
      console.log('ConChinArticleContentBox=> 글 수정하기 모달로 접근합니다.');
      dispatch(showConChinWritingModal(true));
    } else {
      console.log('ConChinArticleContentBox=> 당신이 작성한 글이 아닙니다.');
    }
  };

  /* 글 삭제하기 & 경고모달 핸들러 */
  const deleteMyArticle = () => {
    if (userInfo.id === targetArticle.user_id) {
      console.log('ConChinArticleContentBox=> target.id');
      console.log(target.id);
      console.log('ConChinArticleContentBox=> targetArticle.id');
      console.log(targetArticle.id);
      dispatch(insertAlertText('글을 삭제합니다. 😖'));
      dispatch(showAlertModal(true));
      deleteArticle();
      dispatch(setTargetArticle({}));
      dispatch(setArticleCurPage(1));
      getTargetArticles();
    } else {
      console.log('ConChinArticleContentBox=> 당신이 작성한 글이 아닙니다.');
    }
  };

  /* 글 삭제하기 핸들러 */
  const deleteArticle = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${targetArticle.id}`,
        { withCredentials: true },
      );
      getTargetArticles();
    } catch (err) {
      console.log(err);
    }
  };

  /* 알림 모달 */
  const showAlert = () => {
    dispatch(showAlertModal(true));
  };

  /* 전체 게시물 받아오기 */
  const getAllArticles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        // dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));

        dispatch(setArticleCurPage(1));
        dispatch(setTargetArticle({}));
      } else {
        console.log('없거나 실수로 못가져왔어요.');
      }
    } catch (err) {
      console.log(err);
      console.log('에러가 났나봐요.');
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
        console.log('ConChinPostingBox=> 없거나 실수로 못가져왔어요.');
      }
    } catch (err) {
      console.log(err);
      console.log('에러가 났나봐요.');
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

  return (
    <>
      {targetArticle !== undefined && Object.keys(targetArticle).length > 0 ? (
        <div id='conChinArticleContentBox' key={targetArticle.id}>
          <div id='titleBox'>
            <div className='title'>
              <h1 className='text'>{targetArticle.title}</h1>
            </div>
            <div id='profileBox'>
              <img
                className='img'
                src={
                  targetArticlesUserInfo.image
                    ? targetArticlesUserInfo.image
                    : defaultImage
                }
                onClick={
                  Object.keys(targetArticlesUserInfo).length === 0
                    ? showAlert
                    : showUserProfile
                }
              />
              <p className='nickName'>
                {targetArticlesUserInfo.username
                  ? targetArticlesUserInfo.username
                  : '탈퇴한 사용자'}
              </p>
            </div>
          </div>
          <div id='contentBox'>
            <div id='viewBox'>
              <p className='view'>
                등록일 : {handlePostedDate(targetArticle.createdAt)} | 조회수 :
                {targetArticle.view}
              </p>
            </div>
            <div id='modifyBox'>
              <p className='modifyBtn' onClick={showMyConChinWritingModal}>
                {userInfo.id === targetArticle.user_id ? '수정' : null}
              </p>
              <p className='deleteBtn' onClick={deleteMyArticle}>
                {userInfo.id === targetArticle.user_id ? '삭제' : null}
              </p>
              <div id='memberBoxWrapper'>
                <div className='memberBox'>
                  <img className='icon' src={groupImage} />
                  <div className='count'>
                    {targetArticle.member_count}/{targetArticle.total_member}
                  </div>
                </div>
              </div>
            </div>
            <div id='content'>
              <div id='imgWrapper'>
                <img
                  className='img'
                  src={
                    targetArticle.image
                      ? targetArticle.image
                      : articleDefaultImage
                  }
                />
              </div>
              <p className='text'>{targetArticle.content}</p>
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
