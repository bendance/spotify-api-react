import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyApiKeys from './spotify-api-keys.js';
import WebScrapper from './web-scrapper.js';
import express from 'express';
import cors from 'cors';

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

// credentials
var spotifyApi = new SpotifyWebApi({
    clientId: SpotifyApiKeys.clientID,
    clientSecret: SpotifyApiKeys.clientSecret,
    redirectUri: 'http://localhost:3000/'
})

const port = process.env.port || 8080;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// api responses
app.get('/login', (req, res) => {
    res.send(spotifyApi.createAuthorizeURL(scopes));
});

app.post('/callback', (req, res) => {
    const code = req.body.code;

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);

            console.log(
                `Successfully retrieved access token. Expires in ${expires_in} s.`
            );

            // send the access token
            res.send(true);

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];

                console.log('The access token has been refreshed!');
                console.log('access_token:', access_token);
                spotifyApi.setAccessToken(access_token);

            }, expires_in / 2 * 1000);
        })
        .catch(error => {
            console.error('Error getting tokens:', error);
            res.send(`Error getting tokens: ${error}`);
        })
});

app.post('/create-playlist', async (req, res) => {
    // scrape for top 100 songs in user selected genre
    const webScrapper = new WebScrapper(req.body.userFavoriteGenre);
    const topHundredSongs = await webScrapper.getTopOneHundred();

    let trackUris = [];

    for (let i = 0; i < topHundredSongs.length; i++)
    {
        console.log(`Adding track ${i + 1}...`)
        // get what the search function returns
        let searchResults = await spotifyApi.searchTracks(`${topHundredSongs[i][0]} ${topHundredSongs[i][1]}`, {limit: 5});
        // get the first thing that the search button returns and add it to the playlist you just created

        if (typeof searchResults.body.tracks.items[0] !== "undefined")
            trackUris.push(searchResults.body.tracks.items[0].uri);
        else
            console.log(`Was unable to add track ${i + 1}.`)
    }

    // create the playlist
    const newPlaylist = await spotifyApi.createPlaylist(req.body.playlistName, {description: req.body.playlistDescription, public: req.body.playlistPublic === 'true'});
    const newPlaylistID = newPlaylist.body.id;

    // Add tracks to Spotify playlist
    spotifyApi.addTracksToPlaylist(newPlaylistID, trackUris); 

    // Send response
    res.send(newPlaylist.body.external_urls.spotify);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});