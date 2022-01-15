import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
/* Store import */
import { RootState } from '../index';
import {
  setOrder,
  setTarget,
  setTargetZero,
  setTargetIdx,
  setAllConcerts,
} from '../store/MainSlice';

type Props = {
  getAllConcerts: () => void;
};
function JumbotronTabBar({ getAllConcerts }: Props) {
  const dispatch = useDispatch();

  const { order } = useSelector((state: RootState) => state.main);
  const { allConcerts } = useSelector((state: RootState) => state.main);

  return (
    <div id='tabBar'>
      <p
        id={order === 'hot' ? 'hot' : undefined}
        onClick={() => {
          dispatch(setOrder('hot'));
          getAllConcerts();
          console.log(order, allConcerts);
        }}
      >
        HOT
      </p>
      <p
        id={order === 'near' ? 'near' : undefined}
        onClick={() => {
          dispatch(setOrder('near'));
          getAllConcerts();
          console.log(order, allConcerts);
        }}
      >
        NEAR
      </p>
      <p
        id={order === 'new' ? 'new' : undefined}
        onClick={() => {
          dispatch(setOrder('new'));
          getAllConcerts();
          console.log(order, allConcerts);
        }}
      >
        NEW
      </p>
    </div>
  );
}

export default JumbotronTabBar;
