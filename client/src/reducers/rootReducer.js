export const ADD_USER_DATA = 'ADD_USER_DATA';

const initialState = {
  userInfo: {
    id: '',
    name: '',
    username: '',
    email: '',
    current_chat_id: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DATA:
      return action.userInfo;
    default:
      return state;
  }
};

export default reducer;