import axios from 'axios';
const TOKEN = 'token';
import { toast } from 'react-toastify';

//Toast defaults
const defaultToast = {
  position: 'top-center',
  autoClose: 600,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('api/auth/me', {
      headers: {
        authorization: token,
      },
    });
    window.localStorage.setItem('username', res.data.username);
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (method, username, password, email = null, fName = null, lName = null) =>
  async (dispatch) => {
    try {
      const res = await axios.post(`/api/auth/${method}`, {
        username,
        password,
        fName,
        lName,
        email,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      toast.error('error logging in', defaultToast);

      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem('username');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
const initialState = {
  username: window.localStorage.getItem('username'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
};

export default authReducer;
