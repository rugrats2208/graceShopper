const conn = require('./conn');

//GET DATA FROM SPOTIFY API
const getAlbumData = require('./grabAlbums');
// GET USERS
const getUsers = require('./getUsers');

//MODELS
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Track = require('./models/Track');
const Artist = require('./models/Artist');
const Tag = require('./models/Tag');
const LineItem = require('./models/LineItem'); //line item is the product and the amount of that product to buy

//ASSOCIATIONS
User.hasMany(Order);
Tag.hasMany(Product);
LineItem.belongsTo(Product);
Order.belongsTo(User);
Order.hasMany(LineItem);
Product.hasMany(Track);
Track.belongsTo(Product);
Product.belongsTo(Artist);
Artist.hasMany(Product);

const syncAndSeed = async () => {
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
                        popularity: spotifyArtist.popularity,
                    });
                }
                //create the product and give it the artist ID
                let prod = await Product.create({
                    name: album.name,
                    price: 999 + Math.ceil(album.popularity / 10) * 100,
                    qty: Math.floor(Math.random() * 16),
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
        console.error(err);
    }
};

module.exports = {
    conn,
    User,
    Tag,
    Order,
    Product,
    Track,
    Artist,
    syncAndSeed,
};
