const express = require('express');
const cors = require('cors');
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
    console.log(req.body);
    res.send(`Hi ${name}!`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});