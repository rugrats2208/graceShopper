import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAlbums } from "../reducers/albums/albumsReducer";

//COMPONENTS
import {
  AllAlbums,
  SingleAlbum,
  FeaturedAlbums,
  GuestMain,
  SignedInMain,
  NewAlbumReleases,
  Navigation,
  Admin,
  SingleArtist,
  Signup,
} from "./index";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAlbums());
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route index element={<GuestMain />} />
        <Route path={"/signedInMain"} element={<SignedInMain />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signedInMain"} element={<SignedInMain />} />
        <Route path={"/allAlbums"} element={<AllAlbums />} />
        <Route path={"/singleAlbum/:id"} element={<SingleAlbum />} />
        <Route path={"/singleArtist/:id"} element={<SingleArtist />} />
        <Route path={"/featuredAlbums"} element={<FeaturedAlbums />} />
        <Route path={"/newAlbumReleases"} element={<NewAlbumReleases />} />
        <Route path={"/admin"} element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
