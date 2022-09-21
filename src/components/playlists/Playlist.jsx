import React from 'react';
import { Link } from 'react-router-dom';

function Playlist(props) {
  const playlist = props.data;
  return (
    <li>
      <Link to="/singlePlaylist">
        <h5>{playlist.name}</h5>
      </Link>
      <Link to="/singlePlaylist">
        <img src={playlist.images[0].url} height="300" width="300" />
      </Link>
    </li>
  );
}

export default Playlist;
