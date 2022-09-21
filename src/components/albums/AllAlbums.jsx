import React from 'react';
import { useSelector } from 'react-redux';
import Album from './Album';

function AllAlbums() {
  const allAlbums = useSelector((state) => state.albums);
  // console.log(allAlbums);
  return (
    <div className="all-albums">
      <h1>All Albums</h1>
      <div className="all-albums-list">
        {allAlbums.map((album) => (
          <Album key={album.id} data={album} />
        ))}
      </div>
    </div>
  );
}

export default AllAlbums;
