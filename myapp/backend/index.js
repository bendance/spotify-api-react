import express from 'express';
import cors from 'cors';
import spotifyHandler from './spotify-api.js';

const port = process.env.port || 8080;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/create-playlist", async (req, res) => {
    // Create the playlist with the user's userID
    let token = await spotifyHandler.getToken();
    console.log(token);

    spotifyHandler.createPlaylist(token, req.body.userID);
    res.send(`Creating new playlist for ${req.body.userID}.`)
});

// Get the url to authenticate the user
app.get("/authenticate-user", (req, res) => {
    console.log("Authenticating user.");
    res.send(spotifyHandler.requestAuthorization());
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});