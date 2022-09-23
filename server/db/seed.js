//Get our database and models used in seed
const { conn, User, Artist, Product, Track } = require('./');
//GET DATA FROM SPOTIFY API
const getAlbumData = require('./grabAlbums');
// GET USERS
const getUsers = require('./getUsers');

(async () => {
    try {
        //WITH FORCE TRUE ENABLED, THE DATABASE WILL DROP THE TABLE BEFORE CREATING A NEW ONE
        console.log('Started Seeding...');
        await conn.sync({ force: true });

        //LOADING USERS
        const users = await getUsers();
        await Promise.all(users.map(user => User.create(user)));

        //LOAD ALBUMS
        const [albums, artists] = await getAlbumData();
        await Promise.all(
            albums.map(async album => {
                //find artist to assign to product
                let art = await Artist.findOne({
                    where: { spotifyId: album.artists[0].id },
                });
                //if artist cant be found, create one
                if (!art) {
                    let spotifyArtist = artists.find(
                        art => art.id === album.artists[0].id
                    );
                    art = await Artist.create({
                        name: spotifyArtist.name,
                        spotifyId: spotifyArtist.id,
                        img: spotifyArtist.images[0].url,
                        genre: spotifyArtist.genres[0],
                    });
                }
                //create the product and give it the artist ID
                let prod = await Product.create({
                    name: album.name,
                    price: 999 + Math.ceil(album.popularity / 10) * 100,
                    qty: Math.floor(Math.random() * 16),
                    popularity: album.popularity,
                    img: album.images[0].url,
                    spotifyId: album.id,
                    totalTrack: album.total_tracks,
                    releaseDate: album.release_date,
                    label: album.label,
                    artistId: art.id,
                });
                //create the tracks and give it the product ID
                album.tracks.items.map(track => {
                    Track.create({
                        name: track.name,
                        spotifyId: track.id,
                        length: track.duration_ms,
                        explicit: track.explicit,
                        productId: prod.id,
                    });
                });
            })
        );
        console.log('Seeding successful!');
    } catch (err) {
        console.log(err);
    }
})();
