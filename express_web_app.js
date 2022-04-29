const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("./public"));

//note why didnt i add the HTML file inside the public folder? since its also a static file?
//There are 3ways i can render the html file
//either using the send file method as used below or dumping the html file as a static asset inside the public folder or server side rendering
//1st method
// app.get("/", (req, res) => {
//     res.status(200);
//     res.sendFile(path.resolve("front-end/index.html"));
// });

app.all("*", (req, res) => {
    res.status(404);
    res.send("Resource not found");
});

app.listen(8000, () => {
    console.log(`Server is listening on port 8000...`);
});
