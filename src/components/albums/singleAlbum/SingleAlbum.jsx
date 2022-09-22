import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleAlbum } from '../../../reducers/albums/singleAlbumReducer';
import { getSingleArtist } from '../../../reducers/artists/singleArtistReducer';

function SingleAlbum() {
  const [albumRetrieved, setAlbumRetirieved] = useState(false);
  const album = useSelector((state) => state.singleAlbum);
  const artist = album.artist || {};
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleAlbum(params.id));
  }, []);

  console.log(artist);

  function displayPrice(price) {
    return `$${price / 100}0`;
  }

  function trackLength(length) {
    let trackLength = Math.round((100 * length) / 60000) / 100;
    let trackString = JSON.stringify(trackLength);
    return trackString.replace('.', ':');
  }
  return (
    <div>
      <div className="single-album">
        <img src={album.img}></img>
        <h1>{album.name}</h1>
        <Link to={`/singleArtist/${artist.id}`}>
          <h3>{artist.name}</h3>
        </Link>
        {/* <p>Genre(s): {singleAlbum.artists[0].genres.join(', ')}</p> */}
        <h3>Label: {album.label}</h3>
        <p>Date Released: {album.releaseDate}</p>
        <p>Price: {displayPrice(album.price)}</p>
        <p>Tracks: {album.totalTrack}</p>
        <ol>
          {album.tracks &&
            album.tracks.map((track) => (
              <li key={track.id}>
                Name: {track.name} <br></br>Length: {trackLength(track.length)}{' '}
                mins
              </li>
            ))}
        </ol>
        <button>Add to Cart</button> <button>Buy Now</button>
      </div>
    </div>
  );
}

export default SingleAlbum;
