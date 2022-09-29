import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleArtist } from '../../reducers/artists/singleArtistReducer';
import { addOrderItem } from '../../reducers/orders/ordersReducer';

function SingleArtist() {
  const artist = useSelector((state) => state.singleArtist);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getSingleArtist(params.id));
  }, [params.id]);

  function displayPrice(price) {
    price /= 100;
    price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return `$${price}`;
  }

  return (
    <div className="single-artist">
      <h1>{artist.name}</h1>
      <img src={artist.img} height="500" width="500"></img>
      <h3> Artist Products:</h3>
      <ul>
        {artist.products
          ? artist.products.map((product) => (
              <li className="single-artist-products" key={product.id}>
                <Link to={`/singleProduct/${product.id}`}>
                  <h4>{product.name}</h4>
                </Link>
                <Link to={`/singleProduct/${product.id}`}>
                  <img src={product.img} height="400" width="400"></img>
                </Link>
                <br></br>
                <h5>Price: {displayPrice(product.price)}</h5>
                <button
                  id="single-artist-cart"
                  className={`single-view-button btn btn-dark ${
                    product.stock ? '' : 'disabled'
                  }`}
                  type="button"
                  onClick={
                    product.stock
                      ? () => dispatch(addOrderItem(product.id))
                      : null
                  }
                >
                  {product.stock ? 'Add to Cart' : 'Not in stock'}
                </button>{' '}
              </li>
            ))
          : null}
      </ul>
      <div className="single-artist-buttons">
        <Link to={'/'}>
          <button className="single-view-button btn btn-dark" type="button">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SingleArtist;
