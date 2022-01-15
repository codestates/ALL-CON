/* Store import */
import { setAllArticles, setArticleTotalPage } from '../../store/ConChinSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../index';

function ConChinArticlePagination() {
  const { articleTotalPage } = useSelector((state: RootState) => state.conChin);
  let pageArr: number[] = [];
  for (let i = 1; i <= articleTotalPage; i++) {
    pageArr.push(i);
    console.log(pageArr);
  }
  return (
    <div id='pagination'>
      <ul className='page'>
        <p className='text'>1</p>
      </ul>
      <ul className='page'>
        <p className='text'>2</p>
      </ul>
      <ul className='page'>
        <p className='text'>3</p>
      </ul>
      <ul className='page'>
        <p className='text'>4</p>
      </ul>
      <ul className='page'>
        <p className='text'>5</p>
      </ul>
    </div>
  );
}

export default ConChinArticlePagination;
