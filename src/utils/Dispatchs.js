import {useMemo} from 'react';
import {useDispatch} from 'react-redux';

const DispatchEvents = () => {
  const dispatch = useDispatch();
  const actions = useMemo(
    () => ({
      login(item) {
        dispatch({type: 'LOG_IN', payload: item});
      },
      logout() {
        dispatch({type: 'LOG_OUT', payload: null});
      },
    }),
    [dispatch],
  );
  return actions;
};

export default DispatchEvents;
