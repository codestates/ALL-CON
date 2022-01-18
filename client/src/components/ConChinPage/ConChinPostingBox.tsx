/* Store import */
import { RootState } from '../../index';
import { setTarget, setAllConcerts } from '../../store/MainSlice';
import {
  setAllArticles,
  setArticleTotalPage,
  setArticleCurPage,
  setArticleRendered,
  setTargetArticle,
} from '../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/* Component import */
import ConChinPostingOrderBox from './ConChinPositngOrderBox';

function ConChinPostingBox() {
  const dispatch = useDispatch();
  const { postingOrder } = useSelector((state: RootState) => state.conChin);
  const { target } = useSelector((state: RootState) => state.main);
  const { allConcerts } = useSelector((state: RootState) => state.main);
  const { articleOrder, allArticles, articleRendered, targetArticle } =
    useSelector((state: RootState) => state.conChin);

  /* 조건부 게시물 받아오기 */
  const getAllArticlesWithCondition = async () => {
    try {
      if (!articleRendered) {
        if (Object.keys(target).length > 0 && allArticles.length > 0) {
          /* 타겟에 종속된 게시물이 있을때, 해당 게시물들만 받아오기 */
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=${articleOrder}`,
            { withCredentials: true },
          );
          if (response.data) {
            dispatch(setAllArticles(response.data.data.articleInfo));
            dispatch(setArticleTotalPage(response.data.data.totalPage));
            dispatch(setArticleCurPage(1));
            dispatch(setArticleRendered(true));
            console.log(articleRendered);
            console.log(
              ' ConChinPostingBox=> 타겟에 종속된 게시물들을 가져옵니다.',
            );
            console.log('allArticles: ');
            console.log(allArticles);
          } else {
            console.log('ConChinPostingBox=> 없거나 실수로 못가져왔어요.');
          }
        }
      } else {
        console.log('true인데 누르셨네요?');
        if (
          Object.keys(target).length > 0 &&
          Object.keys(targetArticle).length === 0
        ) {
          // resetAllTarget();
        } else if (
          Object.keys(target).length > 0 &&
          Object.keys(targetArticle).length > 0
        ) {
          console.log('이제 reset안됩니다.');
        } else if (Object.keys(target).length > 0 && allArticles.length === 0) {
          console.log('들어오긴 함?');
          // resetAllTarget();
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setAllArticles([]));
      dispatch(setArticleTotalPage(0));
      console.log('ConChinPostingBox=> 게시물이 없네요.');
    }
  };

  /* 전체 게시물 받아오기(무조건) */
  // const getAllArticles = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
  //       { withCredentials: true },
  //     );
  //     if (response.data) {
  //       // dispatch(setTarget({}));
  //       dispatch(setAllArticles(response.data.data.articleInfo));
  //       dispatch(setArticleTotalPage(response.data.data.totalPage));
  //       dispatch(setArticleCurPage(1));
  //       console.log('ConChinPostingBox => 전체 콘서트를 가져왔습니다.');
  //     } else {
  //       console.log('없거나 실수로 못가져왔어요..');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     console.log('에러가 났나봐요.');
  //   }
  // };

  /* 조건부 게시물 받아오기 & 타겟 교체 */
  function changeTarget(concert: any[]) {
    dispatch(setTarget(concert));
    getAllArticlesWithCondition();
  }
  /* target,targetArticle 전체 초기화 핸들러 */
  const resetAllTarget = () => {
    dispatch(setTarget({}));
    dispatch(setTargetArticle({}));
    dispatch(setArticleRendered(false));
  };

  /* useEffect: 타겟이 변경될 때마다 게시물 렌더링 */
  useEffect(() => {
    getAllArticlesWithCondition();
  }, [target]);

  return (
    <li id='conChinPostingBox'>
      <h1 id={Object.keys(target).length === 0 ? 'curOrder' : 'curOrderChosen'}>
        {postingOrder === 'view'
          ? '조회수 순'
          : postingOrder === 'near'
          ? '임박예정 순'
          : postingOrder === 'new'
          ? '등록일 순'
          : null}
      </h1>
      <ConChinPostingOrderBox />
      <div
        id={
          Object.keys(target).length === 0
            ? 'postingBoxWrapper'
            : 'postingBoxWrapperChosen'
        }
      >
        {target !== undefined
          ? allConcerts.map(concert => {
              return (
                <ul
                  className={
                    target.id === concert.id
                      ? 'postingChosen'
                      : Object.keys(target).length === 0
                      ? 'posting'
                      : 'postingUnChosen'
                  }
                  key={concert.id}
                  onClick={() => {
                    changeTarget(concert);
                  }}
                >
                  <h1 className='title'>{concert.title}</h1>
                  <p className='date'>
                    {' '}
                    오픈일
                    <br /> {concert.post_date}
                  </p>
                  <p className='view'> 조회수 {concert.view}</p>
                  <p className='place'> {concert.place}</p>
                </ul>
              );
            })
          : null}
      </div>
    </li>
  );
}
export default ConChinPostingBox;
