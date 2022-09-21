import React from 'react';
import FeaturedAlbums from '../albums/FeaturedAlbums';
import FeaturedPlaylists from '../playlists/FeaturedPlaylists';
import AllAlbums from '../albums/AllAlbums';

function GuestMain() {
  return (
    <div id="guest-main">
      <div className="featured-albums">
        <FeaturedAlbums />
      </div>
      <div className="featured-playlists">
        <FeaturedPlaylists />
      </div>
      <div className="all-albums">
        <AllAlbums />
      </div>
    </div>
  );
}

export default GuestMain;
