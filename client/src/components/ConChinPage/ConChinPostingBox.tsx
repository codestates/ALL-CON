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

  /* useState => 지역상태 */
  const [conChinAllConcerts, setConChinAllConcerts] = useState<any[]>([]);
  const [conChinPostingOrder, setConChinPostingOrder] =
    useState<String>('view');
  const [conChinTarget, setConChinTarget] = useState<ConChinTarget>({});

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
          } else {
            // console.log('ConChinPostingBox=> 없거나 실수로 못가져왔어요.');
          }
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setAllArticles([]));
      dispatch(setArticleTotalPage(0));
      // console.log('ConChinPostingBox=> 게시물이 없네요.');
    }
  };

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

  /* allConcerts 변경시 지역상태 conChinAllConcerts 변경  */
  useEffect(() => {
    setConChinAllConcerts(allConcerts);
  }, [allConcerts]);

  /* postingOrder 변경시 지역상태 conChinPostingOrder 변경  */
  useEffect(() => {
    setConChinPostingOrder(postingOrder);
  }, [postingOrder]);

  /* 다른 곳에서 target 변경시 지역상태 conChinTarget 변경  */
  useEffect(() => {
    setConChinTarget(target);
  }, [target]);

  return (
    <li id='conChinPostingBox'>
      <h1
        id={
          Object.keys(conChinTarget).length === 0
            ? 'curOrder'
            : 'curOrderChosen'
        }
      >
        {conChinPostingOrder === 'view'
          ? '조회수 순'
          : conChinPostingOrder === 'near'
          ? '임박예정 순'
          : conChinPostingOrder === 'new'
          ? '등록일 순'
          : null}
      </h1>
      <ConChinPostingOrderBox />
      <div
        id={
          Object.keys(conChinTarget).length === 0
            ? 'postingBoxWrapper'
            : 'postingBoxWrapperChosen'
        }
      >
        {conChinTarget.activation === true ||
        Object.keys(conChinTarget).length === 0 ? (
          conChinAllConcerts.map(concert => {
            return (
              <ul
                className={
                  conChinTarget.id === concert.id
                    ? 'postingChosen'
                    : Object.keys(conChinTarget).length === 0
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
        ) : (
          <ul className='postingendChosen'>종료된 콘서트</ul>
        )}
      </div>
    </li>
  );
}
export default ConChinPostingBox;
