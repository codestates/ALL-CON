/* CSS import */
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import commentImage from '../../images/commentDots.png';
import notFound from '../../images/notFound.jpg';
import ConChinArticleOrderBox from './ConChinArticleOrderBox';
import ConChinArticlePagination from './ConChinArticlePagination';
/* Store import */
import { RootState } from '../../index';
import {
  setArticleTotalPage,
  setTargetArticle,
  setIsLoadingConChin,
} from '../../store/ConChinSlice';
import {
  setConChinPageAllComments,
  setConChinTotalNum,
  setConChinComment,
  setConChinPageNum,
  setConChinTotalComments,
} from '../../store/ConChinCommentSlice';
import { setTarget } from '../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function ConChinArticleBox() {
  const dispatch = useDispatch();
  const { target } = useSelector((state: RootState) => state.main);
  const {
    allArticles,
    targetArticle,
    articleOrder,

    isLoadingConChin,
  } = useSelector((state: RootState) => state.conChin);
  const { conChinPageNum, conChinPageAllComments, conChinComment } =
    useSelector((state: RootState) => state.conChinComments);

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

  /* useState => 지역상태 */
  const [conChinTarget, setConChinTarget] = useState<ConChinTarget>({});
  const [conChinAllArticles, setConChinAllArticles] = useState<any[]>([]);
  const [conChinTargetArticle, setConChinTargetArticle] =
    useState<ConChinTargetArticle>({});
  const [conChinIsLoadingConChin, setConChinIsLoadingConChin] = useState<{
    posting?: boolean;
    article?: boolean;
    articleComment?: boolean;
  }>({});

  /* 게시물에 관련된 콘서트 정보 조회 핸들러 */
  const getTargetArticlesConcert = async (id: number) => {
    try {
      /* 로딩 상태 세팅 posting */
      dispatch(
        setIsLoadingConChin({
          posting: false,
        }),
      );
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${id}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTarget(response.data.data.concertInfo));
        dispatch(
          setIsLoadingConChin({
            posting: true,
          }),
        );
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

  /* 게시글 조회 핸들러 */
  const getTargetArticles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=${articleOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setArticleTotalPage(response.data.data.totalPage));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 모든 댓글 가져오기 함수 */
  const getAllComments = async (id: number) => {
    try {
      /* response 변수에 서버 응답결과를 담는다 */
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${
          target.id
        }/article/${id}/comment?pageNum=${1}`,
        { withCredentials: true },
      );
      /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
      if (response.data) {
        /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */
        dispatch(setConChinTotalComments(response.data.data.totalComment));
        dispatch(setConChinPageAllComments([]));
        dispatch(setConChinTotalNum(response.data.data.totalPage));
        dispatch(
          setConChinPageAllComments(response.data.data.articleCommentInfo),
        );
        dispatch(setConChinPageNum(1));
      }
    } catch (err) {}
  };

  /* target 변경시 지역상태 conChinTarget 변경  */
  useEffect(() => {
    setConChinTarget(target);
  }, [target]);

  /* targetArticle 변경시 지역상태 conChinTargetArticle 변경, 댓글 조회  */
  useEffect(() => {
    setConChinTargetArticle(targetArticle);
    if (targetArticle.id !== undefined) getAllComments(targetArticle.id);
  }, [targetArticle]);

  /* allArticles 변경시 지역상태 conChinAllArticles 변경  */
  useEffect(() => {
    setConChinAllArticles(allArticles);
  }, [allArticles]);

  /* isLoadingConChin 변경시 지역상태 conChinIsLoadingConChin 변경  */
  useEffect(() => {
    if (isLoadingConChin !== undefined)
      setConChinIsLoadingConChin(isLoadingConChin);
  }, [isLoadingConChin]);

  return (
    <div id='conChinArticleBox'>
      <ConChinArticleOrderBox />
      {conChinAllArticles !== undefined && conChinAllArticles.length > 0 ? (
        <div
          id={
            Object.keys(conChinTarget).length === 0
              ? 'articleBox'
              : 'articleBoxChosen'
          }
        >
          {/*게시물 맵핑, 타겟이 없고 게시물만 있을 때 */}
          {Object.keys(conChinAllArticles).length > 0 &&
          Object.keys(conChinTarget).length === 0 ? (
            <div
              id={Object.keys(conChinTarget).length === 0 ? 'box' : 'boxChosen'}
            >
              {conChinAllArticles.map(article => {
                return (
                  <ul
                    className={
                      article.id === conChinTargetArticle.id
                        ? 'articleChosen'
                        : 'article'
                    }
                    key={article.id}
                    onClick={() => {
                      getTargetArticlesInfo(article.id);
                      getTargetArticlesConcert(article.concert_id);
                    }}
                  >
                    {article.activation === false ? (
                      <div
                        className={
                          article.id === conChinTargetArticle.id
                            ? 'endArticleChosen'
                            : 'endArticle'
                        }
                      >
                        <p className='endTitle'>종료된 게시물</p>
                      </div>
                    ) : null}

                    <img className='thumbNail' src={article.image}></img>
                    <div className='commentBox'>
                      <img className='icon' src={commentImage} />
                      <div className='count'>{article.total_comment}</div>
                    </div>
                    <div id='conChinmemberBoxWrapper'>
                      <div className='memberBox'>
                        <img className='icon' src={groupImage} />
                        <div className='count'>
                          {article.activation === true
                            ? article.member_count
                            : '-'}
                          /
                          {article.activation === true
                            ? article.total_member
                            : '-'}
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        article.id === conChinTargetArticle.id
                          ? 'titleChosen'
                          : 'title'
                      }
                      style={
                        article.activation === true
                          ? { backgroundColor: 'white' }
                          : { backgroundColor: '$gray2' }
                      }
                    >
                      <img className='icon' src={viewImage} />
                      <p className='count'>
                        {article.activation === true ? article.view : '종료'}
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
          ) : Object.keys(conChinTarget).length !== 0 &&
            conChinTarget !== undefined &&
            conChinTarget !== null &&
            Object.keys(conChinAllArticles).length > 0 ? (
            <div
              id={Object.keys(conChinTarget).length === 0 ? 'box' : 'boxChosen'}
            >
              {/*게시물 맵핑, 타겟이 있고 게시물도 있을 때 */}
              {conChinAllArticles.map(article => {
                return (
                  <ul
                    className={
                      article.id === conChinTargetArticle.id
                        ? 'articleChosen'
                        : 'article'
                    }
                    key={article.id}
                    onClick={() => {
                      getTargetArticles();
                      getTargetArticlesInfo(article.id);
                      getTargetArticlesConcert(article.concert_id);
                    }}
                  >
                    {article.activation === false ? (
                      <div
                        className={
                          article.id === conChinTargetArticle.id
                            ? 'endArticleChosen'
                            : 'endArticle'
                        }
                      >
                        <p className='endTitle'>종료된 게시물</p>
                      </div>
                    ) : null}
                    <img
                      className={
                        article.id === conChinTargetArticle.id
                          ? 'thumbNailChosen'
                          : 'thumbNail'
                      }
                      src={article.image}
                    ></img>
                    <div className='commentBox'>
                      <img className='icon' src={commentImage} />
                      <div className='count'>{article.total_comment}</div>
                    </div>
                    <div id='conChinmemberBoxWrapper'>
                      <div className='memberBox'>
                        <img className='icon' src={groupImage} />
                        <div className='count'>
                          {article.activation === true
                            ? article.member_count
                            : '-'}
                          /
                          {article.activation === true
                            ? article.total_member
                            : '-'}
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        article.id === conChinTargetArticle.id &&
                        article.activation === true
                          ? 'titleChosen'
                          : 'title'
                      }
                    >
                      <img className='icon' src={viewImage} />
                      <p className='count'>
                        {article.activation === true ? article.view : '종료'}
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
          Object.keys(conChinTarget).length === 0
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
