import axios from 'axios';

//action type
const SET_SINGLE_ALBUM = 'SET_SINGLE_ALBUM';

const setSingleAlbum = (album) => ({
  type: SET_ALBUMS,
  album,
});

// thunk for data
// export const getSingleAlbum = () => {
//   return async (dispatch) => {
//     const { data } = await axios.get();
//     dispatch(setSingleAlbum(data));
//   };
// };

const initialState = {};

//reducer
const singleAlbumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_ALBUM:
      return action.album;
    default:
      return state;
  }
};

export default singleAlbumsReducer;
