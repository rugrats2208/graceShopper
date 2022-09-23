import React, { useState, useEffect } from 'react';
import Product from './Product';
import { useSelector } from 'react-redux';
function FeaturedProducts() {
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  //getting 30 most expensive albums (to serve as featured for time being)
  function filterFeaturedProducts(productArray) {
    //using a new array that will be to not manipulate the array being passed in (which will be the albums array(the global album state))
    let featuredProducts = [];
    for (let i = 0; i < productArray.length; i++) {
      featuredProducts.push(productArray[i]);
    }
    featuredProducts.sort((product1, product2) => {
      return product2.artist.popularity - product1.artist.popularity;
    });

    return featuredProducts.slice(0, 30);
  }

  useEffect(() => {
    setFilteredProducts(filterFeaturedProducts(products));
  }, [products]);

  return (
    <div className="featured-products">
      <h1 className="list-title">Featured Products</h1>
      <div className="featured-products-list">
        {filteredProducts.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
