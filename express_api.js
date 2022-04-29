const express = require("express");
const app = express();
const studentsData = require("./firstExpressData");

app.get("/", (req, res) => {
    res.status(200);
    res.json(studentsData);
});

app.all("*", (req, res) => {
    res.status(404);
    res.send("Resource not found");
});

app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});
