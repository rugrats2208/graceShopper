import React, { useState, useEffect } from 'react';
import Album from './Album';
import { useSelector } from 'react-redux';

function NewAlbumReleases() {
  const albums = useSelector((state) => state.albums);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  function getNewReleases(albumArray) {
    //using a new array that will be to not manipulate the array being passed in (which will be the albums array(the global album state))
    let featuredAlbums = [];
    for (let i = 0; i < albumArray.length; i++) {
      //removing the dashes to make the release date numbers that can be compared
      albumArray[i].releaseDate = albumArray[i].releaseDate.replaceAll('-', '');
      featuredAlbums.push(albumArray[i]);
    }
    //sorting the array of albums from largest number release date to smallest
    featuredAlbums.sort((album1, album2) => {
      return album2.releaseDate - album1.releaseDate;
    });

    for (let i = 0; i < featuredAlbums.length; i++) {
      //turning each date string to an array to re-add the dashes
      let dateArr = [...featuredAlbums[i].releaseDate];
      dateArr.splice(4, 0, '-');
      dateArr.splice(7, 0, '-');
      featuredAlbums[i].releaseDate = dateArr.join('');
    }
    //getting the first 30 items (which are now the albums with the 30 largest numbers for releaseDate, aka the latest release dates)
    return featuredAlbums.slice(0, 30);
  }

  useEffect(() => {
    setFilteredAlbums(getNewReleases(albums));
  }, [albums]);

  return (
    <div>
      <h1>New Releases</h1>
      <div className="new-albums-list">
        {filteredAlbums.map((album) => (
          <Album key={album.id} data={album} />
        ))}
      </div>
    </div>
  );
}

export default NewAlbumReleases;
