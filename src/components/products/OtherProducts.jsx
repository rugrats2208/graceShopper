import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import { Link } from "react-router-dom";

function OtherProducts() {
  const allProducts = useSelector((state) => state.products);

  function grabRandomProducts() {
    let shuffledArray = [];
    for (let i = 0; i < allProducts.length; i++) {
      shuffledArray.push(allProducts[i]);
    }
    shuffledArray = [...shuffledArray.sort(() => 0.5 - Math.random())];
    return shuffledArray.slice(0, 30);
  }

  return (
    <div className="other-products">
      <h1 className="list-title">Other Vinyls</h1>
      <div className="other-products-list">
        {grabRandomProducts().map((product) => (
          <Product key={product.id} data={product} />
        ))}
        <Link className="view-all-link" to="/allProducts">
          <h5>See All Vinyls</h5>
        </Link>
      </div>
    </div>
  );
}

export default OtherProducts;
