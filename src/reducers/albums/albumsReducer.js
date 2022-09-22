import axios from 'axios';

//ACTION TYPE
const SET_ALBUMS = 'SET_ALBUMS';
const DEL_PRODUCT = 'DEL_PRODUCT';

//ACTION CREATOR
const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
});

const _delProduct = (id) => ({ type: DEL_PRODUCT, id })

//THUNKS
export const getAlbums = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/shop');
    dispatch(setAlbums(data));
  };
};

export const delProduct = (id) => {
  return async (dispatch) => {
    const product = await axios.delete(`/api/shop/albums/${id}`);
    dispatch(_delProduct(id));
  }
}


const initialState = [];

//reducer
const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return action.albums;
    case DEL_PRODUCT:
      const products = state.filter(product => product.id !== action.id)
      return products;
    default:
      return state;
  }
};

export default albumsReducer;
