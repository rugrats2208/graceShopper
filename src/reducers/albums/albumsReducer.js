import axios from 'axios';

//action type
const SET_ALBUMS = 'SET_ALBUMS';

const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
});

// thunk for data
// export const getAlbums = () => {
//   return async (dispatch) => {
//     const { data } = await axios.get();
//     dispatch(setAlbums(data));
//   };
// };


export const fetchAlbums = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/shop');
      dispatch({ type: 'FETCH_ALBUMS', payload: data })
    } catch (err) {
      dispatch({ type: 'FETCH_ALBUMS_FAILURE', error: err })
    }
  }
}

//const initialState = [];
const initialState = [];

//reducer
const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return action.albums;
    case 'FETCH_ALBUMS':
      return action.payload
    default:
      return state;
  }
};

export default albumsReducer;
