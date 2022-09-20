import React from "react";
import { AllAlbums, AllPlaylists } from ".";
import Login from "../components/Auth/Login";

function App() {
  return (
    <div>
      <AllAlbums />
      <AllPlaylists />
      <Login />
    </div>
  );
}

export default App;
