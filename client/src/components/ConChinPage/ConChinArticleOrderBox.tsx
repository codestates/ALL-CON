/* Config import */
import { REACT_APP_API_URL } from '../../config';
/* Store import */
import { RootState } from '../../index';
import { setArticleOrder, setAllArticles } from '../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function ConChinArticleOrderBox() {
  const dispatch = useDispatch();
  const { articleOrder, allArticles } = useSelector(
    (state: RootState) => state.conChin,
  );
  const { target } = useSelector((state: RootState) => state.main);

  const getAllArticles = async () => {
    try {
      /* 타겟에 종속된 게시물이 없을때, 게시물 없음 표시 */
      if (
        Object.keys(target).length === 0 &&
        Object.keys(allArticles).length === 0
      ) {
        dispatch(setAllArticles([]));
        console.log('미안해요 게시물이 없어요.');
      } else if (
        Object.keys(target).length === 0 &&
        Object.keys(allArticles).length !== 0
      ) {
        /* 타겟이 없지만 전체 표시중일 때 게시물 전체 정렬순에 맞게 정렬 */
        const response = await axios.get(
          `${REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
          { withCredentials: true },
        );
        if (response.data) {
          dispatch(setAllArticles(response.data.data.articleInfo));
        } else {
          console.log('없거나 실수로 못가져왔어요..');
        }
      } else {
        const response = await axios.get(
          `${REACT_APP_API_URL}/concert/article?order=${articleOrder}`,
          { withCredentials: true },
        );
        if (response.data) {
          dispatch(setAllArticles(response.data.data.articleInfo));
        } else {
          console.log('없거나 실수로 못가져왔어요..');
        }
      }
    } catch (err) {
      console.log(err);
      console.log('에러가 났나봐요.');
    }
  };

  /* 게시물 정렬순 교체 및 게시물 조회*/
  const setArticleOrderAndGetAllArticles = (hotOrView: string) => {
    dispatch(setArticleOrder(hotOrView));
    getAllArticles();
  };

  return (
    <div id='noLineOrderBox'>
      <p
        className='order'
        onClick={() => {
          setArticleOrderAndGetAllArticles('hot');
        }}
        style={
          articleOrder === 'hot'
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
