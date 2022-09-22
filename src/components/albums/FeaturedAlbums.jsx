import React, { useState, useEffect } from 'react';
import Album from './Album';
import { useSelector } from 'react-redux';
function FeaturedAlbums() {
  const albums = useSelector((state) => state.albums);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  //getting 30 most expensive albums (to serve as featured for time being)
  function filterFeaturedAlbums(albumArray) {
    //using a new array that will be to not manipulate the array being passed in (which will be the albums array(the global album state))
    let featuredAlbums = [];
    for (let i = 0; i < albumArray.length; i++) {
      featuredAlbums.push(albumArray[i]);
    }
    featuredAlbums.sort((album1, album2) => {
      return album2.artist.popularity - album1.artist.popularity;
    });

    return featuredAlbums.slice(0, 30);
  }

  useEffect(() => {
    setFilteredAlbums(filterFeaturedAlbums(albums));
  }, [albums]);

  return (
    <div className="featured-albums">
      <h1>Featured Albums</h1>
      <div className="featured-albums-list">
        {filteredAlbums.map((album) => (
          <Album key={album.id} data={album} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedAlbums;
