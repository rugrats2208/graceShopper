import React from 'react';
import { Route, Routes } from 'react-router-dom';

//COMPONENTS
import {
  AllAlbums,
  SingleAlbum,
  FeaturedAlbums,
  GuestMain,
  SignedInMain,
  Navbar,
  Admin,
} from './index';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<GuestMain />} />
        <Route path={'/signedInMain'} element={<SignedInMain />} />
        <Route path={'/allAlbums'} element={<AllAlbums />} />
        <Route path={'/featuredPlaylists'} element={<FeaturedPlaylists />} />
        <Route path={'/singleAlbum'} element={<SingleAlbum />} />
        <Route path={'/singlePlaylist'} element={<SinglePlaylist />} />
        <Route path={'/featuredAlbums'} element={<FeaturedAlbums />} />
        <Route path={'/admin'} element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
