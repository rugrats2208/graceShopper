import React from 'react';
<<<<<<< HEAD
import Login from './Auth/Login';
import Signup from './Auth/Signup';
=======
>>>>>>> main
import {
  AllAlbums,
  SingleAlbum,
  FeaturedAlbums,
  GuestMain,
  SignedInMain,
  NewAlbumReleases,
} from './index';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
<<<<<<< HEAD
      <Login />
      <Signup />
=======
>>>>>>> main
      <Routes>
        <Route index element={<GuestMain />} />
        <Route path={'/signedInMain'} element={<SignedInMain />} />
        <Route path={'/allAlbums'} element={<AllAlbums />} />
        <Route path={'/singleAlbum'} element={<SingleAlbum />} />
        <Route path={'/featuredAlbums'} element={<FeaturedAlbums />} />
        <Route path={'/newAlbumReleases'} element={<NewAlbumReleases />} />
      </Routes>
    </div>
  );
}

export default App;
