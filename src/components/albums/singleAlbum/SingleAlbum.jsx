import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleAlbum } from '../../../reducers/albums/singleAlbumReducer';

function SingleAlbum() {
  const album = useSelector((state) => state.singleAlbum);
  const artist = album.artist || {};
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleAlbum(params.id));
  }, []);

  function displayPrice(price) {
    let priceDisplayed = `$${price / 100}`;
    JSON.stringify(priceDisplayed).length === 8
      ? (priceDisplayed = priceDisplayed)
      : (priceDisplayed = `${priceDisplayed}0`);
    return priceDisplayed;
  }

  function convertTrackLength(length) {
    //console.log(length);
    let trackLength = Math.round((100 * length) / 60000) / 100;
    let seconds = Math.round((trackLength % 1) * 60);
    let trackString = `${Math.floor(trackLength)}:${seconds}`;
    return trackString;
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  return (
    <div>
      <div className="single-album">
        <img src={album.img}></img>
        <h1>{album.name}</h1>
        <Link to={`/singleArtist/${artist.id}`}>
          <h3>{artist.name}</h3>
        </Link>
        <h3>Label: {album.label}</h3>
        {artist.genre ? <p>Genre: {toTitleCase(artist.genre)}</p> : null}
        <p>Date Released: {album.releaseDate}</p>
        <p>Price: {displayPrice(album.price)}</p>
        <p>Tracks: {album.totalTrack}</p>
        <ol>
          {album.tracks &&
            album.tracks.map((track) => (
              <li key={track.id}>
                Name: {track.name} <br></br>Length:{' '}
                {convertTrackLength(track.length)} mins
              </li>
            ))}
        </ol>
        <button>Add to Cart</button> <button>Buy Now</button>
        <Link to={'/'}>
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleAlbum;
