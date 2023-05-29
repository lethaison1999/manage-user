import {
  FETCH_USER_ERROR,
  FETCH_USER_LOGIN,
  FETCH_USER_SUCCESS,
  USER_LOGOUT,
  USER_REFRESH,
} from '../actions/userActions';

const INITIAL_STATE = {
  userAccount: {
    email: '',
    auth: null,
    token: '',
  },
  isLoading: false,
  isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userAccount: {
          email: action.data.email,
          token: action.data.token,
          auth: true,
        },
        isLoading: false,
        isError: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        userAccount: {
          auth: false,
        },
        isLoading: false,
        isError: true,
      };
    case USER_LOGOUT:
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      return {
        ...state,
        userAccount: {
          email: '',
          token: '',
          auth: false,
        },
      };
    case USER_REFRESH:
      return {
        ...state,
        userAccount: {
          email: localStorage.getItem('email'),
          token: localStorage.getItem('token'),
          auth: true,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
