/* Store import */
import { RootState } from '../../index';
import { setTarget } from '../../store/MainSlice';
import {
  setArticleOrder,
  setAllArticles,
  setArticleTotalPage,
  setTargetArticle,
} from '../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConChinArticleOrderBox() {
  const dispatch = useDispatch();
  const { articleOrder, allArticles } = useSelector(
    (state: RootState) => state.conChin,
  );
  const { target } = useSelector((state: RootState) => state.main);

  const getAllArticles = async () => {
    try {
      /* 타겟은 있지만 종속된 게시물이 없을때, 게시물 없음 표시 */
      if (
        Object.keys(target).length === 0 &&
        Object.keys(allArticles).length === 0
      ) {
        console.log('ConChinArticleOrderBox=> 게시물이 없어요.');
      } else if (
        Object.keys(target).length === 0 &&
        Object.keys(allArticles).length !== 0
      ) {
        /* 타겟이 없지만 전체 표시중일 때 게시물 전체 정렬순에 맞게 정렬 */
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
          { withCredentials: true },
        );
        if (response.data) {
          dispatch(setAllArticles(response.data.data.articleInfo));
          dispatch(setArticleTotalPage(response.data.data.totalPage));
          console.log(
            'ConChinArticleOrderBox=> 타겟이 없으니 정렬순으로 전체 표시합니다.',
          );
          console.log(allArticles);
        } else {
          console.log('ConChinArticleOrderBox=> 없거나 실수로 못가져왔어요.');
        }
      } else if (target === undefined || target === null) {
        dispatch(setTarget({}));
        dispatch(setTargetArticle({}));

        console.log(
          'ConChinArticleOrderBox=> target이 undefined거나 null이네요, 빈객체 처리할게요.',
        );
      } else {
        /* 타겟에 종속된 게시물 정렬순표시 */
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/${target.id}/article?order=${articleOrder}`,
          { withCredentials: true },
        );
        if (response.data) {
          dispatch(setAllArticles(response.data.data.articleInfo));
          dispatch(setArticleTotalPage(response.data.data.totalPage));
          console.log(
            'ConChinArticleOrderBox=> 타겟에 종속된 게시물을 보여줍니다.',
          );
          console.log('ConChinArticleOrderBox=> allArticles: ' + allArticles);
        }
      }
    } catch (err) {
      console.log(err);
      console.log('에러가 났나봐요. 게시물 없음 처리합니다.');
      dispatch(setAllArticles([]));
      dispatch(setArticleTotalPage(0));
    }
  };

  /* 게시물 정렬순 교체 및 게시물 조회*/
  const setArticleOrderAndGetAllArticles = (hotOrView: string) => {
    dispatch(setArticleOrder(hotOrView));
    console.log('ConChinArticleOrderBox=> 현재정렬은 ' + hotOrView);
    getAllArticles();
  };

  useEffect(() => {
    getAllArticles();
  }, [articleOrder]);

  return (
    <div id='noLineOrderBox'>
      <p
        className='order'
        onClick={() => {
          setArticleOrderAndGetAllArticles('view');
        }}
        style={
          articleOrder === 'view'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        조회수순
      </p>
      <p
        className='order'
        onClick={() => {
          setArticleOrderAndGetAllArticles('new');
        }}
        style={
          articleOrder === 'new'
            ? { backgroundColor: '#FFCE63', color: 'white' }
            : { backgroundColor: 'white', color: '#404040' }
        }
      >
        최신순
      </p>
    </div>
  );
}

export default ConChinArticleOrderBox;
