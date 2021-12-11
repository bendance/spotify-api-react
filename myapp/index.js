const express = require('express');
const app = express();
const port = process.env.port || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post("/post", (req, res) => {
    console.log(req);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});