import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyApiKeys from './spotify-api-keys.js';
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

app.post('/create-playlist', (req, res) => {
    spotifyApi.createPlaylist('API Works', {description: 'A new playlist', public: false})
    res.send('Playlist has been created!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});