import React from 'react';
import Album from './Album';

function FeaturedAlbums() {
  function filterFeaturedAlbums() {
    //check price of albums
    //get the 30 most expensive and return
  }
  return (
    <div className="featured-albums">
      <h1>Featured Albums</h1>
      <div className="featured-albums-list">
        {featuredAlbums.map((album) => (
          <Album key={album.id} data={album} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedAlbums;
