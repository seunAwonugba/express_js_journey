const http = require("http");
const fs = require("fs");

const port = 8000;
const host = "localhost";

const homePage = fs.readFileSync("front-end/index.html");
const homeStyle = fs.readFileSync("front-end/style.css");
const homeScript = fs.readFileSync("front-end/script.js");
// async function functionReadFile(filePath) {
//     try {
//         const fileToRead = await fs.readFile(filePath);
//         console.log(fileToRead.toString());
//     } catch (error) {
//         console.log(`An error occured while reading file: ${error.message}`);
//     }
// }

const requestListener = (req, res) => {
    //i can also decide to use stream
    // const readStream = fs.createReadStream("front-end/index.html");
    // readStream.pipe(res);
    const url = req.url;
    // console.log(url);

    switch (url) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(homePage);
            res.end();
            break;

        case "/style.css":
            res.writeHead(200, { "Content-Type": "text/css" });
            res.write(homeStyle);
            res.end();
            break;

        case "/script.js":
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.write(homeScript);
            res.end();
            break;

        case "/about":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h2>My express about page");
            res.end();
            break;

        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write("<h2>An error occure: Resource not found");
            res.end();
            break;
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server listening on port: http://${host}:${port}`);
});
