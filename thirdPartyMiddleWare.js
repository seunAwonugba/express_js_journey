const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8000;
const host = "localhost";

app.use(morgan("tiny"));

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the home page");
});

app.get("/about", (req, res) => {
    res.status(200).send("welcome to the about page");
});

app.all("*", (req, res) => {
    res.status(400);
    res.send("Page not found");
});

app.listen(port, host, () => {
    console.log(`Server listening on port http://${host}:${port}`);
});
