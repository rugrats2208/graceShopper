import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({ placeholder, albums }) {
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [inputTerm, setInputTerm] = useState('');

  function handleChange(event) {
    const searchTerm = event.target.value;
    setInputTerm(searchTerm);
    const matchingAlbums = albums.filter((album) => {
      return album.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (searchTerm === '') {
      console.log('empty');
      setFilteredAlbums([]);
    } else {
      setFilteredAlbums(matchingAlbums);
    }
  }

  function clear() {
    setFilteredAlbums([]);
    setInputTerm('');
  }

  return (
    <div className="search">
      <h5>Search Vinyls</h5>
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={inputTerm}
          onChange={handleChange}
        />
        <div className="searchIcon">
          {inputTerm.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon className="clear-button" onClick={clear} />
          )}
        </div>
      </div>
      {filteredAlbums.length != 0 && (
        <div className="data">
          {filteredAlbums.map((album) => {
            return (
              <Link
                className="data-item"
                to={`/singleProduct/${album.id}`}
                key={album.id}
              >
                <p>{album.name}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default SearchBar;
