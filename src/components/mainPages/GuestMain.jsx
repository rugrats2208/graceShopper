import React from 'react';

import { FeaturedAlbums, NewAlbumReleases, AllAlbums } from '../';

function GuestMain() {
  return (
    <div id="guest-main">
      <div className="featured-albums-guest">
        <FeaturedAlbums />
      </div>
      <div className="new-releases-guest">
        <NewAlbumReleases />
      </div>
      <div className="all-albums-guest">
        <AllAlbums />
      </div>
    </div>
  );
}

export default GuestMain;
