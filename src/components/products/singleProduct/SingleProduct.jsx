import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../../reducers/products/singleProductReducer';

function SingleProduct() {
  const product = useSelector((state) => state.singleProduct);
  const artist = product.artist || {};
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProduct(params.id));
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
    <div className="single-product">
      <div className="single-product-image">
        <img src={product.img} height="500px" width="500px" />
      </div>
      <div className="single-product-info">
        <h1>{product.name}</h1>
        <Link to={`/singleArtist/${artist.id}`}>
          <h3>{artist.name}</h3>
        </Link>
        <h3>Label: {product.label}</h3>
        {artist.genre ? <p>Genre: {toTitleCase(artist.genre)}</p> : null}
        <p>Date Released: {product.releaseDate}</p>
        <p>Price: {displayPrice(product.price)}</p>
        <p>Tracks: {product.totalTrack}</p>
        <ol>
          {product.tracks &&
            product.tracks.map((track) => (
              <li key={track.id}>
                Name: {track.name} <br></br>Length:{' '}
                {convertTrackLength(track.length)} mins
              </li>
            ))}
        </ol>
        <button className="single-view-button btn btn-dark" type="button">
          Add to Cart
        </button>{' '}
        {/* <button className="single-view-button" type="button" class="btn btn-dark">
        Buy Now
      </button> */}
        <Link to={'/'}>
          <button className="single-view-button btn btn-dark" type="button">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SingleProduct;
