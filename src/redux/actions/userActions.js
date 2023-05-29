import { toast } from 'react-toastify';
import { loginApi } from '../../services/UserService';

export const USER_LOGOUT = 'USER_LOGOUT';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const USER_REFRESH = 'USER_REFRESH';

export const handleLoginRedux = (email, password) => {
  return async (dispatch, geState) => {
    dispatch({ type: FETCH_USER_LOGIN });
    let res = await loginApi(email.trim(), password);
    if (res && res.token) {
      localStorage.setItem('email', email.trim());
      localStorage.setItem('token', res.token);
      dispatch({ type: FETCH_USER_SUCCESS, data: { email: email.trim(), token: res.token } });
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
      dispatch({ type: FETCH_USER_ERROR });
    }
  };
};
export const handleLogoutRedux = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT });
  };
};
export const handleRefresh = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_REFRESH });
  };
};
