import axios from 'axios';
const TOKEN = 'token';

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
      return { ...state, id: action.auth.id, username: action.auth.username };
    default:
      return state;
  }
};

export default authReducer;
