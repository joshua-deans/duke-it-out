import fetchApi from 'fetch-api';

const initialState = {
  userInfo: {
    userId: '',
    name: '',
    username: '',
    email: '',
    current_chat_id: ''
  }
};

const reducer = (state = initialState, action) => {

  if (action.type === 'GET_USER') {
    return getUserByEmail();
  }

  return state;
};

export default reducer;