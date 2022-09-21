import React from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
//COMPONENTS
import {
  AllAlbums,
  SingleAlbum,
  FeaturedAlbums,
  GuestMain,
  SignedInMain,
  Navbar,
  Admin,
} from "./index";

import { fetchAlbums } from "../reducers/albums/albumsReducer";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAlbums());
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<GuestMain />} />
        <Route path={"/signedInMain"} element={<SignedInMain />} />
        <Route path={"/allAlbums"} element={<AllAlbums />} />
        <Route path={"/singleAlbum"} element={<SingleAlbum />} />
        <Route path={"/featuredAlbums"} element={<FeaturedAlbums />} />
        <Route path={"/admin"} element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
