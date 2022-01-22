/* CSS import */
import defaultImage from '../../images/default_image.jpg';
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import notFound from '../../images/notFound.jpg';
import ConChinArticleOrderBox from './ConChinArticleOrderBox';
import ConChinArticlePagination from './ConChinArticlePagination';
/* Store import */
import { RootState } from '../../index';
import {
  setArticleOrder,
  setAllArticles,
  setArticleTotalPage,
  setTargetArticle,
  setTargetArticlesUserInfo,
  setArticleRendered,
  setArticleCurPage,
} from '../../store/ConChinSlice';
import {
  setConChinPageAllComments,
  setConChinTotalNum,
  setConChinComment,
  setConChinPageNum,
} from '../../store/ConChinCommentSlice';
import { setTarget } from '../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function ConChinArticleBox() {
  const dispatch = useDispatch();
  const { target } = useSelector((state: RootState) => state.main);
  const { allArticles, targetArticle, articleOrder, articleCurPage } =
    useSelector((state: RootState) => state.conChin);
  const { conChinPageNum, conChinPageAllComments, conChinComment } =
    useSelector((state: RootState) => state.conChinComments);

  /* 게시물에 관련된 콘서트 정보 조회 핸들러 */
  const getTargetArticlesConcert = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${id}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTarget(response.data.data.concertInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 게시물 정보 조회 핸들러 */
  const getTargetArticlesInfo = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${id}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTargetArticle(response.data.data.articleInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 게시물 작성자 유저정보 조회 핸들러 */
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

  /* 게시글 조회 핸들러 */
  const getTargetArticles = async () => {
    try {
      /* 타겟에 종속된 게시물 정렬순표시 */
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=${articleOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
        dispatch(setArticleCurPage(articleCurPage));
        console.log(
          'ConChinArticleOrderBox=> 타겟에 종속된 게시물을 보여줍니다.',
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(setAllArticles([]));
      dispatch(setArticleTotalPage(0));
    }
  };

  /* 모든 댓글 가져오기 함수 */
  const getAllComments = async (id: number) => {
    window.scrollTo(0, 1750);

    try {
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${id}/comment?pageNum=${conChinPageNum}`,
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
      if (response.data) {
        /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */
        // setIsClick(false);
        // setInputComment('');
        console.log(id);
        dispatch(setConChinPageAllComments([]));
        dispatch(setConChinTotalNum(response.data.data.totalPage));
        dispatch(
          setConChinPageAllComments(response.data.data.articleCommentInfo),
        );
        dispatch(setConChinPageNum(1));
      }
    } catch (err) {}
  };

  /* useEffect: 정렬순으로 전체 콘서트, 게시물 받아오기  */
  useEffect(() => {
    getTargetArticles();
  }, [targetArticle]);

  return (
    <div id='conChinArticleBox'>
      <ConChinArticleOrderBox />
      {allArticles !== undefined && allArticles.length > 0 ? (
        <div
          id={
            Object.keys(target).length === 0 ? 'articleBox' : 'articleBoxChosen'
          }
        >
          {/*게시물 맵핑, 타겟이 없고 게시물만 있을 때 */}
          {Object.keys(allArticles).length > 0 &&
          Object.keys(target).length === 0 ? (
            <div id={Object.keys(target).length === 0 ? 'box' : 'boxChosen'}>
              {allArticles.map(article => {
                return (
                  <ul
                    className={
                      article.id === targetArticle.id
                        ? 'articleChosen'
                        : 'article'
                    }
                    key={article.id}
                    onClick={() => {
                      getTargetArticlesInfo(article.id);
                      getTargetArticlesConcert(article.concert_id);
                      getTargetArticlesUserInfo(article.user_id);
                      getAllComments(article);
                      dispatch(setConChinPageNum(1));
                    }}
                  >
                    <img
                      className='thumbNail'
                      src={
                        article.image !== null ? article.image : defaultImage
                      }
                    ></img>
                    <div id='conChinmemberBoxWrapper'>
                      <div className='memberBox'>
                        <img className='icon' src={groupImage} />
                        <div className='count'>
                          {article.view >= 0 ? article.member_count : '-'}/
                          {article.view >= 0 ? article.total_member : '-'}
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        article.id === targetArticle.id
                          ? 'titleChosen'
                          : 'title'
                      }
                    >
                      <img className='icon' src={viewImage} />
                      <p className='count'>
                        {article.view >= 0 ? article.view : '종료'}
                      </p>
                      <p className='date'>
                        {article.createdAt.substring(0, 10)}
                      </p>
                      <p className='text'>{article.title}</p>
                    </div>
                  </ul>
                );
              })}
            </div>
          ) : Object.keys(target).length !== 0 &&
            target !== undefined &&
            target !== null &&
            Object.keys(allArticles).length > 0 ? (
            <div id={Object.keys(target).length === 0 ? 'box' : 'boxChosen'}>
              {/*게시물 맵핑, 타겟이 있고 게시물도 있을 때 */}
              {allArticles.map(article => {
                return (
                  <ul
                    className={
                      article.id === targetArticle.id
                        ? 'articleChosen'
                        : 'article'
                    }
                    key={article.id}
                    onClick={() => {
                      getTargetArticlesInfo(article.id);
                      getTargetArticlesConcert(article.concert_id);
                      getTargetArticlesUserInfo(article.user_id);
                      getAllComments(article);
                    }}
                  >
                    <img
                      className={
                        article.id === targetArticle.id
                          ? 'thumbNailChosen'
                          : 'thumbNail'
                      }
                      src={
                        article.image !== null ? article.image : defaultImage
                      }
                    ></img>
                    <div id='conChinmemberBoxWrapper'>
                      <div className='memberBox'>
                        <img className='icon' src={groupImage} />
                        <div className='count'>
                          {article.view >= 0 ? article.member_count : '-'}/
                          {article.view >= 0 ? article.total_member : '-'}
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        article.id === targetArticle.id
                          ? 'titleChosen'
                          : 'title'
                      }
                    >
                      <img className='icon' src={viewImage} />
                      <p className='count'>
                        {article.view >= 0 ? article.view : '종료'}
                      </p>
                      <p className='date'>
                        {article.createdAt.substring(0, 10)}
                      </p>
                      <p className='text'>{article.title}</p>
                    </div>
                  </ul>
                );
              })}
            </div>
          ) : (
            '게시물이 없습니다. '
          )}
        </div>
      ) : (
        <div id='articleBoxChosen'>
          <div id='notFound'>
            <p className='text'>게시물이 없습니다.</p>
            <img className='img' src={notFound} alt='notFound' />
          </div>
        </div>
      )}
      {/*게시물 맵핑 */}
      <div
        id={
          Object.keys(target).length === 0
            ? 'paginationWrapper'
            : 'paginationWrapperChosen'
        }
      >
        <ConChinArticlePagination />
      </div>
    </div>
  );
}
export default ConChinArticleBox;
