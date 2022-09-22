import axios from 'axios';

//ACTION TYPE
const SET_ALBUMS = 'SET_ALBUMS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const DEL_PRODUCT = 'DEL_PRODUCT';

//ACTION CREATOR
const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
});

//THUNKS
export const getAlbums = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/shop');
    dispatch(setAlbums(data));
  };
};

export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/shop/albums`, form);
      dispatch({ type: ADD_PRODUCT, payload: data });
    }
    catch (error) {
      console.log(error)
    }
  }
}

export const delProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/shop/albums/${id}`);
      dispatch({ type: DEL_PRODUCT, payload: data.id });
    }
    catch (error) {
      console.log(error)
    }
  }
}


const initialState = [];

//reducer
const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return action.albums;
    case ADD_PRODUCT:
      return [...state, action.payload];
    case DEL_PRODUCT:
      return state.filter(product => product.id !== action.payload);
    default:
      return state;
  }
};

export default albumsReducer;
