import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleArtist } from '../../reducers/artists/singleArtistReducer';

function SingleAlbum() {
  const [artistAlbums, setArtistAlbum] = useState([]);
  const artist = useSelector((state) => state.singleArtist);
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('get artist');
    dispatch(getSingleArtist(params.id));
  }, []);
  useEffect(() => {
    console.log('set artist album');
    setArtistAlbum(artist.products);
  }, [artist]);

  console.log(artist);
  console.log(artistAlbums);
  return (
    <div className="single-artist">
      <h1>{artist.name}</h1>
      <ul>
        Artist Albums:
        {artistAlbums &&
          artistAlbums.map((product) => {
            <li key={product.id}>
              {product.name} {product.img}
            </li>;
          })}
      </ul>
    </div>
  );
}

export default SingleAlbum;
