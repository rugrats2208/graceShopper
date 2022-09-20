import React from 'react';
import { AllAlbums, AllPlaylists, SingleAlbum } from './index';
// import AllAlbums from './albums/AllAlbums';
// import SingleAlbum from './singleAlbum/SingleAlbum';
// import AllPlaylists from './playlists/AllPlaylists';
// import AllAlbums from './albums/AllAlbums';
// import SingleAlbum from './singleAlbum/SingleAlbum';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* <AllAlbums /> */}
      <Routes>
        <Route index element={<AllAlbums />} />
        <Route path={'/allPlaylists'} element={<AllPlaylists />} />
        <Route path={'/singleAlbum'} element={<SingleAlbum />} />
      </Routes>
    </div>
  );
}

export default App;
