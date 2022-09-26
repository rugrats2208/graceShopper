import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

function AllProducts() {
  const allProducts = useSelector((state) => state.products);

  return (
    <div className="all-products">
      <h1 className="list-title">All Vinyls</h1>
      <div className="all-products-list">
        {allProducts.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
