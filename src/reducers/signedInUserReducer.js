import axios from 'axios';

const SET_USER = 'SET_USER';
const EDIT_USER = 'EDIT_USER';

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const _editUser = (user) => ({
  type: EDIT_USER,
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
      dispatch(setUser(data));
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
      dispatch(_editUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {};

const signedInUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case EDIT_USER:
      return action.user;
    default:
      return state;
  }
};

export default signedInUserReducer;
