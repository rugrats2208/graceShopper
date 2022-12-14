//Get our database and models used in seed
const { conn, User, Artist, Product, Track, Order, LineItem } = require('./');
//GET DATA FROM SPOTIFY API
const getAlbumData = require('./grabAlbums');
// GET USERS
const getUsers = require('./getUsers');

//SYNC AND SEED THE DATABASE
//seed users->albums->orders. Give some albums to orders then give those orders to users
const seed = async () => {
    try {
        //WITH FORCE TRUE ENABLED, THE DATABASE WILL DROP THE TABLE BEFORE CREATING A NEW ONE
        console.log('Seeding started...');
        await conn.sync({ force: true });

        //LOADING USERS
        const usersData = await getUsers();
        const users = await Promise.all(
            usersData.map(user => User.create(user))
        );
        const admin = await User.create({ fName: "Grace", lName: "Shopper", username: 'admin', password: 'password', email: 'graceShopper@email.com', isAdmin: true })
        await Order.create({ userId: admin.id })

        //LOAD ALBUMS
        const [albums, artists] = await getAlbumData();
        const products = await Promise.all(
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
                    stock: Math.floor(Math.random() * 16),
                    popularity: album.popularity,
                    img: album.images[0].url,
                    spotifyId: album.id,
                    totalTrack: album.total_tracks,
                    releaseDate: album.release_date,
                    label: album.label,
                    artistId: art.id,
                });
                //create the tracks and give it the product ID
                album.tracks.items.map(async track => {
                    await Track.create({
                        name: track.name,
                        spotifyId: track.id,
                        length: track.duration_ms,
                        explicit: track.explicit,
                        preview: track.preview_url,
                        productId: prod.id,
                    });
                });
                return prod;
            })
        );

        //LOAD ORDERS
        for (let i = 0; i < 100; i++) {
            //every 4th order is active
            const order = await Order.create({ complete: !(i % 4 === 0) });

            //get available products
            const available = products.filter(prod =>
                order.complete ? prod : prod.stock
            );

            //give each order between 0 and 4 random albums
            for (let j = 0; j < Math.ceil(Math.random() * 4); j++) {
                //grab a random product, make a lineItem
                const curProd =
                    available[Math.floor(Math.random() * available.length)];

                // ensure only new lineItems are added in seed
                const isNew = (await order.getLineItems()).every(
                    item => item.productId !== curProd.id
                );
                if (isNew)
                    await curProd.createLineItem({
                        qty: Math.ceil(Math.random() * curProd.stock),
                        orderId: order.id,
                    });
            }

            //give 25 users 4 orders, rest an empty cart
            await users[Math.floor(i / 4)].addOrder(order);

            if (i >= 25) await (await Order.create()).setUser(users[i]);
        }

        console.log('Seeding successful!');
    } catch (err) {
        console.log(err);
    }
};

const runSeed = async () => {
    console.log('Start seeding...');
    try {
        await seed();
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    } finally {
        console.log('Closing db connection.');
        await conn.close();
        console.log('Db connection closed');
    }
};

if (module === require.main) {
    runSeed();
}

module.exports = seed;
