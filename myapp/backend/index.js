import fetch from "node-fetch";
import express from 'express';
import cors from 'cors';

const port = process.env.port || 8080;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/store-data", (req, res) => {
    let name = req.body.name;
    let OAuthToken = "BQD9r5ysYwGTTrqKx6N67udH7x7Qt1Jsm4TAgQ8GsEaXj5LgcwuRjxaONyjveVGrCm-T5UzvSHPbPTt3CBrG2GMhkWvTu7Vw69nAZa52B0I-Jxg35dxQ9gPUc52fnJmpgaswhD1nnZJzQFvyBE3L9_CkrCtYOntlcVw2-2oO8ENU79WaXTs";

    fetch(`https://api.spotify.com/v1/users/${name}/playlists`, {
        method: 'POST',
        body: {
            "name": "New Playlist",
            "description": "New playlist description",
            "public": false
        },
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OAuthToken}`
        }
    }).then(function(response) {
        console.log(response);
        return response.json();
    })

    res.send("Creating new playlist for user.")
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});