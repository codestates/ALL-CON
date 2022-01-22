/* Store import */
import { RootState } from '../../index';
import { setConChinPageNum } from '../../store/ConChinCommentSlice';
/* Library import */
import { useSelector, useDispatch } from 'react-redux';

function ConChinCommentPagination() {
  const dispatch = useDispatch();
  const { conChinPageNum, conChinTotalNum } = useSelector(
    (state: RootState) => state.conChinComments,
  );

  /* totalNum 페이지 배열 선언 */
  const pageArr = Array.from({ length: conChinTotalNum }, (v, i) => i + 1);

  return (
    <div id='pagination'>
      {/* 페이지 map */}
      {pageArr.map((num, idx) => (
        <ul
          className={num === conChinPageNum ? 'pageChosen' : 'page'}
          onClick={() => dispatch(setConChinPageNum(num))}
        >
          <p className='text' key={idx}>
            {num}
          </p>
        </ul>
      ))}
    </div>
  );
}
export default ConChinCommentPagination;
