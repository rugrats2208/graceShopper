import React from 'react';
import { Link } from 'react-router-dom';

function Album(props) {
  let album = props.data;
  const artist = album.artist || {};

  return (
    <div className="album">
      <Link to={`/singleAlbum/${album.id}`}>
        <h1>{album.name}</h1>
      </Link>
      <Link to={`/singleArtist/${artist.id}`}>
        <h3>{artist.name}</h3>
      </Link>
      <Link to={`/singleAlbum/${album.id}`}>
        <img src={album.img}></img>
      </Link>
      <br></br>
      <button>Add to Cart</button>
    </div>
  );
}

export default Album;
