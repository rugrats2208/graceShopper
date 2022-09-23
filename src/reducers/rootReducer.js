import { combineReducers } from 'redux';
import albumsReducer from './albums/albumsReducer';
import singleAlbumsReducer from './albums/singleAlbumReducer';
import singleArtistReducer from './artists/singleArtistReducer';
import authReducer from './Auth/authReducer';

export default combineReducers({
  albums: albumsReducer,
  singleAlbum: singleAlbumsReducer,
  singleArtist: singleArtistReducer,
  auth: authReducer,
});
