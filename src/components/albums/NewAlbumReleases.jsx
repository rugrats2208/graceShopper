import React from 'react';
import Album from './Album';

function NewAlbumReleases() {
  function getNewReleases() {
    //grab maybe 30 or so albums
    //compare dates, the 30 of them with the most recent release date will be returned
  }
  return (
    <div>
      <h1>New Releases</h1>
      {/* <div className="new-albums-list">
        {newReleases.albums.items.map((album) => (
          <Album key={album.id} data={album} />
        ))}
      </div> */}
    </div>
  );
}

export default NewAlbumReleases;
