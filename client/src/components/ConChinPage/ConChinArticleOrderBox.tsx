/* Store import */
import { RootState } from '../../index';
import { setArticleOrder } from '../../store/ConChinSlice';
/* Library import */
import { useSelector, useDispatch } from 'react-redux';

function ConChinArticleOrderBox() {
  const dispatch = useDispatch();
  const { articleOrder } = useSelector((state: RootState) => state.conChin);

  return (
    <div id='noLineOrderBox'>
      <p
        className='order'
        onClick={() => {
          dispatch(setArticleOrder('hot'));
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
          dispatch(setArticleOrder('new'));
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
