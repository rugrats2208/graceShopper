import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MDBIcon } from 'mdb-react-ui-kit';
import { getSingleProduct } from '../../../reducers/products/singleProductReducer';
import { addOrderItem } from '../../../reducers/orders/ordersReducer';

function SingleProduct() {
  const product = useSelector((state) => state.singleProduct);
  const artist = product.artist || {};
  const params = useParams();
  const dispatch = useDispatch();
  const [playingId, setPlayingId] = useState(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getSingleProduct(params.id));
  }, [params.id]);

  function convertTrackLength(length) {
    let trackLength = Math.round((100 * length) / 60000) / 100;
    let seconds = Math.round((trackLength % 1) * 60);
    if (seconds < 10) seconds = `0${seconds}`;
    let trackString = `${Math.floor(trackLength)}:${seconds}`;

    return trackString;
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function displayPrice(price) {
    price /= 100;
    price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return `$${price}`;
  }

  function handleClickAudio(id) {
    //stop old track from playing
    const oldTrack = Array.from(document.getElementsByClassName('playing'))[0];
    if (oldTrack) {
      oldTrack.classList.toggle('playing');
      oldTrack.pause();
      oldTrack.currentTime = 0;
    }
    //if stop was clicked break out
    if (id === playingId) return setPlayingId(-1);
    //play a track
    setPlayingId(id);
    const nextTrack = document.getElementById(id);
    nextTrack.play();
    nextTrack.classList.toggle('playing');
  }

  return (
    <div className="single-product">
      <div className="single-product-image-info">
        <div className="single-product-image">
          <img src={product.img} height="250px" width="250px" />
        </div>
        <div className="single-product-info">
          <h4>Title: {product.name}</h4>
          <Link to={`/singleArtist/${artist.id}`}>
            <h4>Artist: {artist.name}</h4>
          </Link>
          <h4>Label: {product.label}</h4>
          {artist.genre ? (
            <h4>Genre: {toTitleCase(artist.genre)}</h4>
          ) : (
            <h4>Genre: N/A</h4>
          )}
          <h4>Date Released: {product.releaseDate}</h4>
        </div>
      </div>
      <div className="single-product-tracks">
        <h5>Tracks: {product.totalTrack}</h5>
        <ol>
          {product.tracks &&
            product.tracks.map((track) => (
              <li key={track.id} className="track">
                <div className="individual-track">
                  Name: {track.name} <br></br>Length:{' '}
                  {convertTrackLength(track.length)}{' '}
                  {track.length < 60000 ? 'secs' : 'mins'}
                </div>
                <div className="play-button">
                  {track.preview ? (
                    <>
                      <audio
                        preload="auto"
                        src={track.preview}
                        id={track.id}
                      ></audio>
                      {playingId !== track.id ? (
                        <MDBIcon
                          fas
                          icon="play-circle"
                          onClick={() => handleClickAudio(track.id)}
                          size="2x"
                        />
                      ) : (
                        <MDBIcon
                          fas
                          icon="stop-circle"
                          onClick={() => handleClickAudio(track.id)}
                          size="2x"
                        />
                      )}
                    </>
                  ) : (
                    ' Preview Not Available'
                  )}
                </div>
              </li>
            ))}
        </ol>
      </div>
      <h4>Price: {displayPrice(product.price)}</h4>
      <div className="single-product-buttons">
        <button
          className={`product-button single-view-button btn btn-dark ${
            product.stock ? '' : 'disabled'
          }`}
          type="button"
          onClick={
            product.stock ? () => dispatch(addOrderItem(product.id)) : null
          }
        >
          {product.stock ? 'Add to Cart' : 'Not in stock'}
        </button>
        <Link to={'/'}>
          <button
            className="product-button single-view-button btn btn-dark"
            type="button"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SingleProduct;
