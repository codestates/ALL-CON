/* CSS import */
import goConchin from '../../images/goConChin.png';
/* Store import */
import {
  setTargetArticle,
  setArticleCurPage,
  setArticleRendered,
} from '../../store/ConChinSlice';
/* Library import */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MainFindConchin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* 타겟 게시물 리셋 & 콘친페이지 이동 핸들러 */
  const goConChinWithNoTargetArticle = () => {
    dispatch(setTargetArticle({}));
    dispatch(setArticleRendered(true));
    dispatch(setArticleCurPage(1));
    navigate('/conchin');
  };

  return (
    <div id='mainGoConchin'>
      <b>
        콘서트에 같이 갈 "<u>콘친</u>" 을 찾아볼까요?
      </b>
      <img src={goConchin} id='goConchin' alt='콘친찾기 일러스트'></img>
      <button onClick={goConChinWithNoTargetArticle}>바로가기</button>
    </div>
  );
}

export default MainFindConchin;
