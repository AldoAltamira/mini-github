import {createSelector} from 'reselect';

export const Selectors = createSelector(
  (state) => state,
  (userReducer) => userReducer,
);
