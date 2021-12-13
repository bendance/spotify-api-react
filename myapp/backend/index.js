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

app.post("/store-data", (req, res) => {
    // Create the playlist with the user's userID
    console.log(req.body.name);
    res.send("Creating new playlist for user.")
});

// Get the url to authenticate the user
app.get("/authenticate-user", (req, res) => {
    console.log("Authenticating user.");
    res.send(spotifyHandler.requestAuthorization());
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});