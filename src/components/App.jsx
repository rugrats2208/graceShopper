import React from 'react';
import { AllAlbums, AllPlaylists } from '.';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

function App() {
  return (
    <div>
      <AllAlbums />
      <AllPlaylists />
      <Login />
      <Signup />
    </div>
  );
}

export default App;
