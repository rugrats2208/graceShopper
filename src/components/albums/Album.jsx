import React from 'react';
import { Link } from 'react-router-dom';

function Album(props) {
  let album = props.data;

  console.log(album);
  return (
    <div className="album" width="300px" height="300px">
      <Link to={'/singleAlbum'}>
        <img src={album.img}></img>
      </Link>
      <Link to={'/singleAlbum'}>
        <h1>{album.name}</h1>
      </Link>
      {/* <Link to={'/singleAlbum'}>
        <h2></h2>
      </Link> */}
    </div>
  );
}

export default Album;
