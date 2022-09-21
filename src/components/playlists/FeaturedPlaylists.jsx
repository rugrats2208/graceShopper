import React from 'react';
import Playlist from './Playlist';

let playlistData = {
  albums: {
    items: [
      {
        name: 'Featured Playlist1',
        id: 1,
        images: [{ url: 'https://media.graphassets.com/WggvT12kThWJhx8e7Ukk' }],
      },
      {
        name: 'Featured Playlist2',
        id: 2,
        images: [{ url: 'https://media.graphassets.com/WggvT12kThWJhx8e7Ukk' }],
      },
      {
        name: 'Featured Playlist3',
        id: 3,
        images: [{ url: 'https://media.graphassets.com/WggvT12kThWJhx8e7Ukk' }],
      },
      {
        name: 'Featured Playlist4',
        id: 4,
        images: [{ url: 'https://media.graphassets.com/WggvT12kThWJhx8e7Ukk' }],
      },
    ],
    total: 4,
  },
  message: 'string',
};

function FeaturedPlaylists() {
  return (
    <div>
      <h1>Featured Playlists</h1>
      <ul>
        {playlistData.albums.items.map((playlist) => (
          <Playlist key={playlist.id} data={playlist} />
        ))}
      </ul>
    </div>
  );
}

export default FeaturedPlaylists;
