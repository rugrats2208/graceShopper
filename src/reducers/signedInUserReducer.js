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

export const getUser = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.get('/api/aut/logggedInEdit', {
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

export const editUser = (userForm) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.put('/api/aut/loggedInEdit', userForm, {
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
