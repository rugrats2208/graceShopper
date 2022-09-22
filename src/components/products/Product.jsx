import React from 'react';
import { Link } from 'react-router-dom';

function Product(props) {
  let product = props.data;
  const artist = product.artist || {};

  return (
    <div className="product">
      <Link to={`/singleProduct/${product.id}`}>
        <h1>{product.name}</h1>
      </Link>
      <Link to={`/singleArtist/${artist.id}`}>
        <h3>{artist.name}</h3>
      </Link>
      <Link to={`/singleProduct/${product.id}`}>
        <img src={product.img}></img>
      </Link>
      <br></br>
      <button>Add to Cart</button>
    </div>
  );
}

export default Product;
