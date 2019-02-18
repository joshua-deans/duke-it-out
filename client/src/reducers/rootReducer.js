export const ADD_USER_DATA = 'ADD_USER_DATA';

const initialState = {
  userInfo: {
    id: '',
    username: '',
    email: ''
  },
  isLoggedIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DATA:
      return action.data;
    default:
      return state;
  }
};

export default reducer;