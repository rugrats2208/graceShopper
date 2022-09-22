import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleArtist } from '../../reducers/artists/singleArtistReducer';

function SingleArtist() {
  const [artistAlbums, setArtistAlbum] = useState([]);
  const artist = useSelector((state) => state.singleArtist);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleArtist(params.id));
  }, []);

  function displayPrice(price) {
    let priceDisplayed = `$${price / 100}`;
    console.log(JSON.stringify(priceDisplayed));
    console.log(JSON.stringify(priceDisplayed).length);
    JSON.stringify(priceDisplayed).length === 8
      ? (priceDisplayed = priceDisplayed)
      : (priceDisplayed = `${priceDisplayed}0`);
    return priceDisplayed;
  }

  console.log(artist);
  return (
    <div className="single-artist">
      <h1>{artist.name}</h1>
      <img src={artist.img}></img>
      <h3> Artist Albums:</h3>
      <ul>
        {artist.products
          ? artist.products.map((product) => (
              <li key={product.id}>
                <Link to={`/singleAlbum/${product.id}`}>
                  <h5>{product.name}</h5>
                </Link>
                <Link to={`/singleAlbum/${product.id}`}>
                  <img src={product.img} height="400" width="400"></img>
                </Link>
                <br></br>
                <p>Price: {displayPrice(product.price)}</p>
                <br></br>
                <button>Add to Cart</button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default SingleArtist;
