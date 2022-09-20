import React from 'react';
import { Link } from 'react-router-dom';

function Album(props) {
  let album = props.data;

  console.log(album.tracks);
  return (
    <div className="album">
      <Link to={'/singleAlbum'}>
        <img src={album.images[0].url}></img>
      </Link>
      <Link to={'/singleAlbum'}>
        <h1>{album.name}</h1>
      </Link>
      <Link to={'/singleAlbum'}>
        <h2>{album.artists.map((artist) => artist.name)}</h2>
      </Link>

      {/* <p>{album.tracks.items.map((track) => track.name)}</p> */}
    </div>
  );
}

export default Album;
