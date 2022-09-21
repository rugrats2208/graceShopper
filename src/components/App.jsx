import React from 'react';
import {
  AllAlbums,
  FeaturedPlaylists,
  SingleAlbum,
  FeaturedAlbums,
  SinglePlaylist,
  GuestMain,
  SignedInMain,
} from './index';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<GuestMain />} />
        <Route path={'/signedInMain'} element={<SignedInMain />} />
        <Route path={'/allAlbums'} element={<AllAlbums />} />
        <Route path={'/featuredPlaylists'} element={<FeaturedPlaylists />} />
        <Route path={'/singleAlbum'} element={<SingleAlbum />} />
        <Route path={'/singlePlaylist'} element={<SinglePlaylist />} />
        <Route path={'/featuredAlbums'} element={<FeaturedAlbums />} />
      </Routes>
    </div>
  );
}

export default App;
