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
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function ConChinArticleContentBox() {
  const dispatch = useDispatch();
  const { targetArticle, targetArticlesUserInfo } = useSelector(
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
    } catch (err) {
      console.log(err);
    }
  };

  /* 탈퇴 유저 정보 보기 경고 메세지 핸들러 */
  const showAlert = () => {
    dispatch(insertAlertText('탈퇴한 사용자입니다. 😖'));
    dispatch(showAlertModal(true));
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
                등록일 : {targetArticle.createdAt} | 조회수 :
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
