import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';
import Select from 'react-select';
import Pagination from './Pagination';

let genres = [
  { value: 'all', label: 'All' },
  { value: 'pop', label: 'Pop' },
  { value: 'hip hop', label: 'Hip Hop' },
  { value: 'country', label: 'Country' },
  { value: 'r&b', label: 'R&B' },
  { value: 'indie', label: 'Indie' },
  // { value: 'trap', label: 'Trap' },
  // { value: 'soul', label: 'Soul ' },
  { value: 'alternative', label: 'Alternative' },
  // { value: 'rock', label: 'Rock' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'misc', label: 'Misc' },
];

function AllProducts() {
  const allProducts = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(25);

  function filterByGenre(option) {
    let filterArray = [];
    //using notNullGenres array to avoid null errors when calling methods on genres in the array
    let notNullGenres = allProducts.filter(
      (product) => product.artist.genre !== null
    );
    if (option.value !== 'all') {
      //case 1: if 'misc' was selected
      if (option.value === 'misc') {
        let miscArray = [];
        //getting all values where genre is null
        for (let i = 0; i < allProducts.length; i++) {
          if (allProducts[i].artist.genre === null) {
            miscArray.push(allProducts[i]);
          }
        }
        //getting all values where genre cannot be found in the genres array above
        for (let i = 0; i < notNullGenres.length; i++) {
          if (
            !genres.some((genre) =>
              notNullGenres[i].artist.genre.includes(genre.value.toLowerCase())
            )
          ) {
            miscArray.push(notNullGenres[i]);
          }
        }
        setFilteredProducts(miscArray);
        //if anything other than misc was selected
      } else {
        for (let i = 0; i < notNullGenres.length; i++) {
          if (
            notNullGenres[i].artist.genre
              .toLowerCase()
              .includes(option.value.toLowerCase())
          ) {
            filterArray.push(notNullGenres[i]);
          }
        }
        setFilteredProducts(filterArray);
      }
      //if 'all' was selected
    } else {
      setFilteredProducts(allProducts);
    }
    setPage(1);
  }

  function sortByPopularity(productArray) {
    let featuredProducts = [];
    for (let i = 0; i < productArray.length; i++) {
      featuredProducts.push(productArray[i]);
    }
    featuredProducts.sort((product1, product2) => {
      return product2.popularity - product1.popularity;
    });
    setFilteredProducts(featuredProducts);
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
        <Select
          options={genres}
          onChange={filterByGenre}
          placeholder="Select Genre"
          isSearchable
          className="genre-select"
          label="Filter By Genre"
        />
        <h1 className="list-title">Vinyls</h1>
        <div className="product-sort-buttons">
          <button
            type="button"
            className="btn btn-primary btn-sm"
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
          {/* <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => sortByPopularity(filteredProducts)}
          >
            Sort By Popularity
          </button> */}
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
