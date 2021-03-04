const initialState = {
  currentUser: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {...state, currentUser: action.payload};
    case 'LOG_OUT':
      return {...state, currentUser: initialState.currentUser};
    default:
      return {...state}
  }
};

export default UserReducer;
