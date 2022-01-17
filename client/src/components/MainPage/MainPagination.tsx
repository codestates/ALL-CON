/* Store import */
import { RootState } from '../../index';
import { setPageNum } from '../../store/ConcertCommentSlice';
/* Library import */
import { useSelector, useDispatch } from 'react-redux';

function MainPagination() {
  const dispatch = useDispatch();
  const { pageNum, totalNum } = useSelector((state: RootState) => state.concertComments);

  /* totalNum 페이지 배열 선언 */
  const pageArr = Array.from({length: totalNum}, (v, i) => i+1);

  return (
    <div id='paginationWrapper'>
      <div id='pagination'>
        {/* 페이지 map */}
        {pageArr.map((num, idx)=>(
          <ul className={ num===pageNum ? 'pageChosen' : 'page' } onClick={() => dispatch(setPageNum(num))}>
            <p className='text' key={idx}>{num}</p>
          </ul>
        ))}
      </div>
    </div>
  );
}
export default MainPagination;
