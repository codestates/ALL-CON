/* CSS import */
import loadingImage from '../images/mainLoading.gif';
import banner from '../images/banner.png';
import ConChinPostingBox from '../components/ConChinPage/ConChinPostingBox';
import ConChinBox from '../components/ConChinPage/ConChinBox';
import ConChinArticleContentBox from '../components/ConChinPage/ConChinArticleContentBox';
import Footer from '../components/Footer';
/* Store import */
import { RootState } from '../index';
import { setTarget, setAllConcerts } from '../store/MainSlice';
import {
  setArticleOrder,
  setAllArticles,
  setArticleTotalPage,
  setTargetArticle,
  setArticleCurPage,
  setArticleRendered,
  setIsLoadingConChin,
  setIsLoadingArticle,
} from '../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConChinPage() {
  const dispatch = useDispatch();
  const { target, allConcerts, mainLoading } = useSelector(
    (state: RootState) => state.main,
  );
  const { articleOrder, postingOrder, targetArticle, allArticles } =
    useSelector((state: RootState) => state.conChin);

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
  const [conChinTargetArticle, setConChinTargetArticle] =
    useState<ConChinTargetArticle>({});

  /* 전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    /* 로딩 상태 세팅 posting */
    dispatch(
      setIsLoadingConChin({
        posting: false,
      }),
    );
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${postingOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setArticleCurPage(1));
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
  /* 조건부 게시물 받아오기 */
  const getAllArticlesWithCondition = async () => {
    try {
      if (target !== undefined && target !== null) {
        if (Object.keys(target).length === 0) {
          getAllArticles();
          dispatch(setArticleCurPage(1));
        } else if (Object.keys(target).length > 0 && allArticles.length > 0) {
          /* 타겟에 종속된 게시물이 있을때, 해당 게시물들만 받아오기 */
          dispatch(setIsLoadingArticle(false));
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=${articleOrder}`,
            { withCredentials: true },
          );
          if (response.data) {
            dispatch(setIsLoadingArticle(true));
            dispatch(setAllArticles(response.data.data.articleInfo));
            dispatch(setArticleTotalPage(response.data.data.totalPage));
          } else {
            console.log('ConChinPostingBox=> 없거나 실수로 못가져왔어요.');
          }
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setAllArticles([]));
      dispatch(setArticleTotalPage(0));
      console.log('ConChinPostingBox=> 게시물이 없네요.');
    }
  };

  /* 전체 게시물 받아오기 */
  const getAllArticles = async () => {
    try {
      dispatch(setIsLoadingArticle(false));
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setIsLoadingArticle(true));
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
        dispatch(setArticleCurPage(1));
      } else {
        console.log('없거나 실수로 못가져왔어요..');
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* useEffect => 맨 처음 렌더링, 타겟이 있는지 없는지 유무에 따라 렌더링한다. */
  useEffect(() => {
    getAllConcerts();
    getAllArticlesWithCondition();
  }, []);

  /* target 변경시 지역상태 conChinTarget 변경  */
  useEffect(() => {
    setConChinTarget(target);
  }, [target]);

  /* targetArticle 변경시 지역상태 conChinTargetArticle 변경  */
  useEffect(() => {
    setConChinTargetArticle(targetArticle);
  }, [targetArticle]);
  if (mainLoading === true)
    return (
      <div id='conChinContainer'>
        <div id='conChinExceptFooter'>
          <img id='jumbotron' src={banner} />
          <div
            id={
              Object.keys(conChinTarget).length === 0
                ? 'postingWrapper'
                : 'postingWrapperChosen'
            }
          >
            {/* 콘서트 정보, target유무에따라 외부,내부 크기 변경 */}
            <ConChinPostingBox />
          </div>
          <div
            id={
              Object.keys(conChinTarget).length === 0
                ? 'articleWrapper'
                : 'articleWrapperChosen'
            }
          >
            {/* 게시물 정보, targetArticle유무에따라 외부,내부 크기 변경, 가로 스크롤바 생성 */}
            <ConChinBox />
          </div>
        </div>
        <div
          id={
            Object.keys(conChinTargetArticle).length === 0 &&
            Object.keys(conChinTarget).length !== 0
              ? 'contentsWrapperArticleNotChosen'
              : Object.keys(conChinTargetArticle).length !== 0 &&
                Object.keys(conChinTarget).length !== 0
              ? 'contentsWrapperChosen'
              : 'contentWrapper'
          }
        >
          {/* 게시물 내용, 없다가 생기므로 위치만 변경할 것. */}
          <ConChinArticleContentBox />
        </div>
        <div
          id={
            Object.keys(conChinTargetArticle).length === 0 &&
            Object.keys(conChinTarget).length !== 0
              ? 'fullFooterArticleNotChosen'
              : Object.keys(conChinTargetArticle).length !== 0 &&
                Object.keys(conChinTarget).length !== 0
              ? 'fullFooterChosen'
              : 'fullFooter'
          }
        >
          <div id='footerWrapper'>
            {/* 푸터, targetArticle 유무에 따라 위치 변경 */}
            <Footer />
          </div>
        </div>
      </div>
    );
  else
    return (
      <div id='loadingContainer'>
        <img className='loadingImg' src={loadingImage} />
      </div>
    );
}

export default ConChinPage;
