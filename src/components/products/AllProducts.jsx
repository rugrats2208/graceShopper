import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';
import Select from 'react-select';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

let genres = [
  { value: 'all', label: 'All' },
  { value: 'pop', label: 'Pop' },
  { value: 'hip hop', label: 'Hip Hop' },
  { value: 'country', label: 'Country' },
  { value: 'r&b', label: 'R&B' },
  { value: 'indie', label: 'Indie' },
  { value: 'alternative', label: 'Alternative' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'misc', label: 'Misc' },
];

function AllProducts() {
  const allProducts = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(25);

  function filterByGenre(options) {
    setFilteredProducts([]);
    let filterArray = [];
    //nothing was selected, give back everything
    if (options.length === 0) {
      setFilteredProducts(allProducts);
    }
    for (let i = 0; i < allProducts.length; i++) {
      for (let j = 0; j < options.length; j++) {
        if (options[j].value === 'all') {
          setFilteredProducts(allProducts);
        }
        if (
          options[j].value !== 'misc' &&
          allProducts[i].artist.genre.includes(options[j].value) &&
          !filterArray.includes(allProducts[i])
        ) {
          filterArray.push(allProducts[i]);
          setFilteredProducts(filterArray);
        } else if (options[j].value === 'misc') {
          if (
            genres
              .filter((genre) => genre.value !== 'all')
              .every((genre) => {
                return !allProducts[i].artist.genre
                  .toLowerCase()
                  .includes(genre.value.toLowerCase());
              })
          ) {
            filterArray.push(allProducts[i]);
            setFilteredProducts(filterArray);
          }
        }
      }
    }
  }

  function sortByNewest(productArray) {
    let newestProducts = [];
    for (let i = 0; i < productArray.length; i++) {
      productArray[i].releaseDate = productArray[i].releaseDate.replaceAll(
        '-',
        ''
      );
      newestProducts.push(productArray[i]);
    }
    newestProducts.sort((product1, product2) => {
      return product2.releaseDate - product1.releaseDate;
    });
    for (let i = 0; i < newestProducts.length; i++) {
      let dateArr = [...newestProducts[i].releaseDate];
      dateArr.splice(4, 0, '-');
      dateArr.splice(7, 0, '-');
      newestProducts[i].releaseDate = dateArr.join('');
    }
    setFilteredProducts(newestProducts);
  }

  function sortAlphabetically(productArray) {
    let sortedArray = [];
    for (let i = 0; i < productArray.length; i++) {
      sortedArray.push(productArray[i]);
    }
    sortedArray.sort((product1, product2) =>
      product1.name.localeCompare(product2.name)
    );
    setFilteredProducts(sortedArray);
  }

  function sortByPrice(productArray) {
    let mostExpensiveProducts = [];
    for (let i = 0; i < productArray.length; i++) {
      mostExpensiveProducts.push(productArray[i]);
    }
    mostExpensiveProducts.sort((product1, product2) => {
      return product2.price - product1.price;
    });
    setFilteredProducts(mostExpensiveProducts);
  }

  //when rendering new components, the component would render from scroll position of previous component, this scrolls back to the top on a rerender
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  const finalIdx = page * productsPerPage;
  const firstIdx = finalIdx - productsPerPage;
  const currProduct = filteredProducts.slice(firstIdx, finalIdx);

  function paginate(pageNumber) {
    setPage(pageNumber);
  }

  function nextPage() {
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    setPage((prev) => prev - 1);
  }

  return (
    <div className="all-products">
      <div className="product-filter">
        <SearchBar placeholder="Enter vinyl name" albums={allProducts} />
        <h1 className="list-title"></h1>
        <div className="sort-filter">
          <div className="product-sort-buttons">
            <button
              type="button"
              className="btn btn-primary btn-s m"
              onClick={() => sortByPrice(filteredProducts)}
            >
              Sort By Price
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => sortAlphabetically(filteredProducts)}
            >
              Sort Alphabetically
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => sortByNewest(filteredProducts)}
            >
              Sort By Newest
            </button>
          </div>
          <Select
            options={genres}
            onChange={filterByGenre}
            placeholder="Select Genre"
            isSearchable
            className="genre-select"
            label="Filter By Genre"
            isMulti
          />
        </div>
      </div>
      <div className="all-products-list">
        {currProduct.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
}

export default AllProducts;
