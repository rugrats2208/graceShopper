import axios from 'axios';

const SET_SIGNED_IN_USER = 'SET_SIGNED_IN_USER';
const EDIT_SIGNED_IN_USER = 'EDIT_SIGNED_IN_USER';

const setLoggedInUser = (user) => ({
  type: SET_SIGNED_IN_USER,
  user,
});

const _editLoggedInUser = (user) => ({
  type: EDIT_SIGNED_IN_USER,
  user,
});

export const getLoggedInUser = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.get('/api/auth/loggedInInfo', {
        headers: {
          authorization: token,
        },
      });
      dispatch(setLoggedInUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const editLoggedInUser = (userForm) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.put('/api/auth/loggedInEdit', userForm, {
        headers: {
          authorization: token,
        },
      });
      dispatch(_editLoggedInUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {};

const signedInUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNED_IN_USER:
      return action.user;
    case EDIT_SIGNED_IN_USER:
      return action.user;
    default:
      return state;
  }
};

export default signedInUserReducer;
