/* CSS import */
import goConchin from '../../images/goConChin.png';
/* Store import */
import { RootState } from '../../index';
import { setAllConcerts } from '../../store/MainSlice';
import {
  setTargetArticle,
  setArticleCurPage,
  setArticleRendered,
  setAllArticles,
  setArticleTotalPage,
  setPostingOrder,
  setArticleOrder,
} from '../../store/ConChinSlice';

/* Library import */
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MainFindConchin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { target } = useSelector((state: RootState) => state.main);
  /* 타겟 게시물 리셋 & 콘친페이지 이동 핸들러 */
  const goConChinWithNoTargetArticle = () => {
    getAllConcerts();
    getTargetArticles();
    dispatch(setPostingOrder('view'));
    dispatch(setArticleOrder('view'));
    navigate('/conchin');
  };

  /* 콘서트 페이지 전체 콘서트 받아오기(정렬순:view) */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=view`,
        { withCredentials: true },
      );
      if (response.data) {
        /* 서버 응답값이 있다면 & allConcerts 상태 변경 */
        dispatch(setAllConcerts(response.data.data.concertInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* target 게시물 받아오기 (정렬순:view) */
  const getTargetArticles = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=view`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTargetArticle({}));
        dispatch(setAllArticles(response.data.data.articleInfo));
        dispatch(setArticleTotalPage(response.data.data.totalPage));
        dispatch(setArticleCurPage(1));
        dispatch(setArticleRendered(true));
        console.log(response.data.data.articleInfo);
      } else {
      }
    } catch (err) {
      console.log(err);
      dispatch(setAllArticles([]));
      dispatch(setArticleTotalPage(0));
    }
  };

  return (
    <div id='mainGoConchin'>
      <b>
        음악 취향이 맞는 ' <u>콘친</u> '과 함께 콘서트를 즐겨요!
      </b>
      <img src={goConchin} id='goConchin' alt='콘친찾기 일러스트'></img>
      <button onClick={goConChinWithNoTargetArticle}>바로가기</button>
    </div>
  );
}

export default MainFindConchin;
