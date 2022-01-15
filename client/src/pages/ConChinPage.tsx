import react from 'react';
import ConChinPostingBox from '../components/ConChinPage/ConChinPostingBox';
import ConChinBox from '../components/ConChinPage/ConChinBox';
import ConChinArticleContentBox from '../components/ConChinPage/ConChinArticleContentBox';
import banner from '../images/banner.png';
import Footer from '../components/Footer';
/* Store import */
import { RootState } from '../index';
import { setTarget, setAllConcerts } from '../store/MainSlice';
import {
  setArticleOrder,
  setAllArticles,
  setArticleTotalPage,
  setTargetArticle,
} from '../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConChinPage() {
  const dispatch = useDispatch();
  const { target } = useSelector((state: RootState) => state.main);
  const { articleOrder, postingOrder, targetArticle } = useSelector(
    (state: RootState) => state.conChin,
  );

  /*전체 콘서트 받아오기 */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${postingOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setAllConcerts(response.data.data.concertInfo));
        resetTarget();
      }
    } catch (err) {
      console.log(err);
    }
  };
  /* 전체 게시물 받아오기 */
  const getAllArticles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
        { withCredentials: true },
      );
      if (response.data) {
        console.log('받아줌');
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
      } else {
        console.log('없거나 실수로 못가져왔어요..');
      }
    } catch (err) {
      console.log(err);
      console.log('에러가 났나봐요.');
    }
  };
  /* 타겟 초기화 핸들러 */
  const resetTarget = () => {
    dispatch(setTarget({}));
    dispatch(setTargetArticle({}));
  };

  useEffect(() => {
    getAllConcerts();
    getAllArticles();
  }, []);

  return (
    <div id='conChinContainer'>
      <div id='conChinExceptFooter'>
        <img id='jumbotron' src={banner} />
        <div
          id={
            Object.keys(target).length === 0
              ? 'postingWrapper'
              : 'postingWrapperChosen'
          }
        >
          {/* 콘서트 정보, target유무에따라 외부,내부 크기 변경 */}
          <ConChinPostingBox />
        </div>
        <div
          id={
            Object.keys(target).length === 0
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
          Object.keys(targetArticle).length === 0 &&
          Object.keys(target).length !== 0
            ? 'contentsWrapperArticleNotChosen'
            : Object.keys(targetArticle).length !== 0 &&
              Object.keys(target).length !== 0
            ? 'contentsWrapperChosen'
            : 'contentWrapper'
        }
      >
        {/* 게시물 내용, 없다가 생기므로 위치만 변경할 것. */}
        <ConChinArticleContentBox />
      </div>
      <div
        id={
          Object.keys(targetArticle).length === 0 &&
          Object.keys(target).length !== 0
            ? 'fullFooterArticleNotChosen'
            : Object.keys(targetArticle).length !== 0 &&
              Object.keys(target).length !== 0
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
}

export default ConChinPage;
