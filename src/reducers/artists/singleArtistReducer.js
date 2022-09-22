import axios from 'axios';

//action type
const SET_SINGLE_ARTIST = 'SET_SINGLE_ARTIST';

const setSingleArtist = (artist) => ({
  type: SET_SINGLE_ARTIST,
  artist,
});

// thunk for data
export const getSingleArtist = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/shop/artist/${id}`);
    dispatch(setSingleArtist(data));
  };
};

const initialState = {};

//reducer
const singleArtistReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_ARTIST:
      return action.artist;
    default:
      return state;
  }
};

export default singleArtistReducer;
