const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });


const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const client_code = Buffer.from(
    `${spotify_client_id}:${spotify_client_secret}`
).toString('base64');

//returns access token
const getAuth = async () => {
    try {
        const token_url = 'https://accounts.spotify.com/api/token';
        const response = await axios.post(
            token_url,
            'grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${client_code}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }
};

//gets a list of 100 albums
const getAlbumList = async () => {
    //request token using getAuth() function
    const access_token = await getAuth();

    const albumIds = [];
    let url = 'https://api.spotify.com/v1/browse/new-releases?limit=50';
    try {
        //get first 50 albums
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        response.data.albums.items.forEach(album => albumIds.push(album.id));
        //get next 50 albums
        url += '&offset=1';
        const resOffset = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        resOffset.data.albums.items.forEach(album => albumIds.push(album.id));

        return albumIds;
    } catch (error) {
        console.log(error);
    }
};

//get the list of albums information
const getAlbumData = async () => {
    const access_token = await getAuth();
    const albumIds = await getAlbumList();

    let albums = [];
    try {
        //get actual albums 20 at a time
        for (let i = 0; i < 5; i++) {
            //get 20 ids at a time and put it on the url
            let url = `https://api.spotify.com/v1/albums?ids=${albumIds
                .slice(i * 20, 20 + i * 20)
                .join(',')}`;
            //request album data from server
            let response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //add the albums to an array
            albums = [...albums, ...response.data.albums];
        }
        return albums;
    } catch (error) {
        console.log(error);
    }
};

<<<<<<< HEAD
// (async () => {
//     console.log(await getAlbumData());
// })();

// const after = await getAlbumData();
// console.log(after);

// getAlbumData().then(albums => console.log(albums.length)); //use this to seed our database
=======
>>>>>>> 224337571972d4d985e19e5a8af766b538270c92
module.exports = getAlbumData;
