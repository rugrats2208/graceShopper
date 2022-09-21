import React from 'react';
import Album from './Album';

let newReleases = {
  albums: {
    href: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20\n',
    items: [
      {
        album_type: 'album_type1',
        total_tracks: 8,
        id: 1,
        images: [
          {
            url: 'data:image/jpeg;base64,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',
          },
        ],
        name: 'Album1',
        release_date: '1995-07',
        type: 'album',
        artists: [
          {
            genres: ['pop', 'rock'],
            name: 'Artist1',
            id: 1,
            type: 'artist',
          },
        ],
        tracks: {
          total: 10,
          items: [{ name: 'track1' }],
        },
      },
      {
        album_type: 'album_type2',
        total_tracks: 8,
        id: 1,
        images: [
          {
            url: 'data:image/jpeg;base64,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',
          },
        ],
        name: 'Album2',
        release_date: '1987-01',
        type: 'album',
        artists: [
          {
            genres: ['pop', 'rock'],
            name: 'Artist2',
            id: 2,
            type: 'artist',
          },
        ],
        tracks: {
          total: 9,
          items: [{ name: 'track2' }],
        },
      },
      {
        album_type: 'album_type2',
        total_tracks: 8,
        id: 1,
        images: [
          {
            url: 'data:image/jpeg;base64,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',
          },
        ],
        name: 'Album3',
        release_date: '2005-05',
        type: 'album',
        artists: [
          {
            genres: ['pop', 'rock'],
            name: 'Artist3',
            id: 3,
            type: 'artist',
          },
        ],
        tracks: {
          total: 12,
          items: [{ name: 'track3' }],
        },
      },
    ],
    total: 4,
  },
};

function NewAlbumReleases() {
  return (
    <div>
      <h1>New Releases</h1>
      {newReleases.albums.items.map((album) => (
        <Album key={album.id} data={album} />
      ))}
    </div>
  );
}

export default NewAlbumReleases;
