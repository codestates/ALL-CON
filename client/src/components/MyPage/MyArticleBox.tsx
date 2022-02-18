/* Config import */
/* CSS import */
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import commentImage from '../../images/commentDots.png';
import noArticleImg from '../../images/no_article_img.png';
/* Store import */
import { setTarget } from '../../store/MainSlice';
import {
  setTargetArticle,
  setTargetArticlesUserInfo,
} from '../../store/ConChinSlice';
import { setConChinPageNum } from '../../store/ConChinCommentSlice';
import MyArticlePagination from './MyArticlePagination';
/* Library import */
import axios from 'axios';
import { RootState } from '../../index';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MyArticleBox() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* useSelector */
  const { articleInfo, myTotalArticle } = useSelector(
    (state: RootState) => state.my,
  );

  /* 지역상태 - useState */

  /* useEffect */

  /* handler 함수 (기능별 정렬) */
  // 마이페이지 - 나의 게시물 중 한 게시물을 선택하면, 다음이 실행된다
  const handleArticleSelected = async (
    id: number,
    concert_id: number,
    user_id: number,
  ) => {
    // 선택한 게시물에 해당하는 콘서트에 대한 정보를 불러온다
    const responseConcert = await axios.get(
      `${process.env.REACT_APP_API_URL}/concert/${concert_id}`,
      { withCredentials: true },
    );

    // 선택한 게시물에 대한 정보를 불러온다
    const responseArticle = await axios.get(
      `${process.env.REACT_APP_API_URL}/concert/${concert_id}/article/${id}`,
      { withCredentials: true },
    );

    // 선택한 게시물 작성자 유저정보를 불러온다
    const responseUser = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/other/${user_id}`,
      { withCredentials: true },
    );

    // 현재 선택한 콘서트 업데이트 (target)
    dispatch(setTarget(responseConcert.data.data.concertInfo));

    // 현재 선택한 유저정보 업데이트 (target)
    dispatch(setTargetArticlesUserInfo(responseUser.data.data.userInfo));

    // 현재 선택한 게시물 업데이트 (target)
    dispatch(setTargetArticle(responseArticle.data.data.articleInfo));
    dispatch(setConChinPageNum(1));
    navigate('/conchin');
  };

  return (
    <div id='myArticleBox'>
      <div id='titleWrapper'>
        <p className='title'>내가 쓴 게시물</p>
      </div>
      <h1 id='myArticleCount'>{myTotalArticle}개의 게시물</h1>
      <div id='articleWrapper'>
        <div id='articleBox'>
          <div id='box'>
            {Array.isArray(articleInfo)
              ? articleInfo.map((el: any) => {
                  return (
                    // 마이페이지, 내가 작성한 게시물에서 "특정 게시물"을 선택
                    <ul
                      className='article'
                      onClick={() =>
                        handleArticleSelected(el.id, el.concert_id, el.user_id)
                      }
                    >
                      {el.activation === false ? (
                        <div className='endArticle'>
                          <p className='endTitle'>종료된 게시물</p>
                        </div>
                      ) : null}
                      <img
                        className='thumbNail'
                        src={el.image}
                      ></img>
                      <div className='commentBox'>
                        <img className='icon' src={commentImage} />
                        <div className='count'>{el.total_comment}</div>
                      </div>
                      <div id='myMemberBoxWrapper'>
                        <div className='memberBox'>
                          <img
                            className='icon'
                            src={groupImage}
                            alt='groupImage'
                          />
                          <div className='count'>
                            {' '}
                            {el.activation === true ? el.member_count : '-'}/
                            {el.activation === true ? el.total_member : '-'}{' '}
                          </div>
                        </div>
                      </div>
                      <div className='title'>
                        <img className='icon' src={viewImage} alt='viewImage' />
                        <p className='count'>
                          {el.activation === true ? el.view : '종료'}
                        </p>
                        <p className='date'>{el.updatedAt.substring(0, 10)}</p>
                        <p className='text'>{el.title}</p>
                      </div>
                    </ul>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <div id='paginationWrapper'>
        <MyArticlePagination />
      </div>

      {/* 게시물이 없다면 display */}
      {myTotalArticle === 0 ? (
        <div id='noArticleImgWrapper'>
          <img id='noArticleImg' src={noArticleImg} />
          <p id='noArticleMessage'>작성한 게시물이 없습니다!</p>
        </div>
      ) : null}
    </div>
  );
}

export default MyArticleBox;
