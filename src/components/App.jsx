import React from "react";
import { Route, Routes } from "react-router-dom";

//COMPONENTS
import {
  AllAlbums,
  SingleAlbum,
  FeaturedAlbums,
  GuestMain,
  SignedInMain,
<<<<<<< HEAD
  Navbar,
  Admin,
} from "./index";
=======
  NewAlbumReleases,
} from './index';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

import { Route, Routes } from 'react-router-dom';
>>>>>>> 224337571972d4d985e19e5a8af766b538270c92

function App() {
  return (
    <div>
<<<<<<< HEAD
      <Navbar />
      <Routes>
        <Route index element={<GuestMain />} />
        <Route path={"/signedInMain"} element={<SignedInMain />} />
        <Route path={"/allAlbums"} element={<AllAlbums />} />
        <Route path={"/featuredPlaylists"} element={<FeaturedPlaylists />} />
        <Route path={"/singleAlbum"} element={<SingleAlbum />} />
        <Route path={"/singlePlaylist"} element={<SinglePlaylist />} />
        <Route path={"/featuredAlbums"} element={<FeaturedAlbums />} />
        <Route path={"/admin"} element={<Admin />} />
=======
      <Login />
      <Signup />
      <Routes>
        <Route index element={<GuestMain />} />
        <Route path={'/signedInMain'} element={<SignedInMain />} />
        <Route path={'/allAlbums'} element={<AllAlbums />} />
        <Route path={'/singleAlbum'} element={<SingleAlbum />} />
        <Route path={'/featuredAlbums'} element={<FeaturedAlbums />} />
        <Route path={'/newAlbumReleases'} element={<NewAlbumReleases />} />
>>>>>>> 224337571972d4d985e19e5a8af766b538270c92
      </Routes>
    </div>
  );
}

export default App;
