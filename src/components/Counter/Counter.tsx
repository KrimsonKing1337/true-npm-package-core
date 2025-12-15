import { useDispatch, useSelector } from 'store';

import { counterSelectors, counterActions } from 'store/counter'

import * as styles from './Counter.scss';

export const Counter = () => {
  const dispatch = useDispatch();

  const count = useSelector(counterSelectors.count);

  const minusClickHandler = () => {
    dispatch(counterActions.decrement());
  }

  const plusClickHandler = () => {
    dispatch(counterActions.increment());
  }

  return (
    <div className={styles.Wrapper}>
      <button onClick={minusClickHandler}>
        -
      </button>

      <div>
        {count}
      </div>

      <button onClick={plusClickHandler}>
        +
      </button>
    </div>
  );
};
