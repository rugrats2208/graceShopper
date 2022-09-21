import React from 'react';

let playlist = {
  id: 1,
  images: [
    {
      url: 'https://media.graphassets.com/WggvT12kThWJhx8e7Ukk',
    },
  ],
  name: 'Playlist1',
  owner: {
    type: 'user',
    display_name: 'Owner1',
  },
  tracks: {
    items: [
      { name: 'Song1' },
      { name: 'Song2' },
      { name: 'Song3' },
      { name: 'Song4' },
    ],
  },
};
function SinglePlaylist() {
  return (
    <div>
      <h1>{playlist.name}</h1>
      <img src={playlist.images[0].url} />
      <h3>Owner: {playlist.owner.display_name}</h3>
      <ul>
        Tracks:{' '}
        {playlist.tracks.items.map((song) => (
          <li>{song.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SinglePlaylist;
