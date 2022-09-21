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
} from "./index";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<GuestMain />} />
        <Route path={"/signedInMain"} element={<SignedInMain />} />
        <Route path={"/allAlbums"} element={<AllAlbums />} />
        <Route path={"/singleAlbum"} element={<SingleAlbum />} />
        <Route path={"/featuredAlbums"} element={<FeaturedAlbums />} />
        <Route path={"/newAlbumReleases"} element={<NewAlbumReleases />} />
      </Routes>
    </div>
  );
}

export default App;
