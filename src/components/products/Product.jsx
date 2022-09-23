import React from 'react';
import { Link } from 'react-router-dom';

function Product(props) {
  let product = props.data;
  const artist = product.artist || {};

  return (
    <div className="product">
      <Link className="link" to={`/singleProduct/${product.id}`}>
        <h1>{product.name}</h1>
      </Link>
      <Link className="link" to={`/singleArtist/${artist.id}`}>
        <h3>{artist.name}</h3>
      </Link>
      <Link className="link" to={`/singleProduct/${product.id}`}>
        <img src={product.img} height="300px" width="300px"></img>
      </Link>
      <br></br>
      <button type="button" className="product-button btn btn-dark">
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
