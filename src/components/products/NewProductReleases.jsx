import React, { useState, useEffect } from 'react';
import Product from './Product';
import { useSelector } from 'react-redux';

function NewProductReleases() {
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  function getNewReleases(productArray) {
    //using a new array that will be to not manipulate the array being passed in (which will be the albums array(the global album state))
    let featuredProducts = [];
    for (let i = 0; i < productArray.length; i++) {
      //removing the dashes to make the release date numbers that can be compared
      productArray[i].releaseDate = productArray[i].releaseDate.replaceAll(
        '-',
        ''
      );
      featuredProducts.push(productArray[i]);
    }
    //sorting the array of albums from largest number release date to smallest
    featuredProducts.sort((product1, product2) => {
      return product2.releaseDate - product1.releaseDate;
    });

    for (let i = 0; i < featuredProducts.length; i++) {
      //turning each date string to an array to re-add the dashes
      let dateArr = [...featuredProducts[i].releaseDate];
      dateArr.splice(4, 0, '-');
      dateArr.splice(7, 0, '-');
      featuredProducts[i].releaseDate = dateArr.join('');
    }
    //getting the first 30 items (which are now the albums with the 30 largest numbers for releaseDate, aka the latest release dates)
    return featuredProducts.slice(0, 30);
  }

  useEffect(() => {
    setFilteredProducts(getNewReleases(products));
  }, [products]);

  return (
    <div className="new-products">
      <h1 className="list-title">New Releases</h1>
      <div className="new-products-list">
        {filteredProducts.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default NewProductReleases;
