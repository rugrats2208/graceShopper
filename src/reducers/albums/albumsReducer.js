import axios from 'axios';

//action type
const SET_ALBUMS = 'SET_ALBUMS';

const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
});

// thunk for data
export const getAlbums = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/shop');
    dispatch(setAlbums(data));
  };
};

//const initialState = [];
const initialState = [];

//reducer
const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return action.albums;
    default:
      return state;
  }
};

export default albumsReducer;
