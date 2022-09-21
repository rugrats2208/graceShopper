import React from "react";
import { Route, Routes } from "react-router-dom";

//COMPONENTS
import {
  AllAlbums,
  SingleAlbum,
  FeaturedAlbums,
  GuestMain,
  SignedInMain,
  NewAlbumReleases,
  Admin,
} from "./index";

import Navbar from "./navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<GuestMain />} />
        <Route path={"/signedInMain"} element={<SignedInMain />} />
        <Route path={"/allAlbums"} element={<AllAlbums />} />
        <Route path={"/singleAlbum"} element={<SingleAlbum />} />
        <Route path={"/featuredAlbums"} element={<FeaturedAlbums />} />
        <Route path={"/newAlbumReleases"} element={<NewAlbumReleases />} />
        <Route path={"/admin"} element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
