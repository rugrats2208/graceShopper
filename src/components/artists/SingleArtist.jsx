import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleArtist } from '../../reducers/artists/singleArtistReducer';

function SingleArtist() {
    const artist = useSelector(state => state.singleArtist);
    const params = useParams();
    const dispatch = useDispatch();

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
                    ? artist.products.map(product => (
                          <li
                              className="single-artist-products"
                              key={product.id}
                          >
                              <Link to={`/singleProduct/${product.id}`}>
                                  <h5>{product.name}</h5>
                              </Link>
                              <Link to={`/singleProduct/${product.id}`}>
                                  <img
                                      src={product.img}
                                      height="400"
                                      width="400"
                                  ></img>
                              </Link>
                              <br></br>
                              <p>Price: {displayPrice(product.price)}</p>
                              <br></br>
                              <button
                                  className="single-view-button btn btn-dark"
                                  type="button"
                              >
                                  Add to Cart
                              </button>{' '}
                              <Link to={'/'}>
                                  <button
                                      className="single-view-button btn btn-dark"
                                      type="button"
                                  >
                                      Back to Home
                                  </button>
                              </Link>
                          </li>
                      ))
                    : null}
            </ul>
        </div>
    );
}

export default SingleArtist;
