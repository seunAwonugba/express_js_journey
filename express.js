//after installing express in your app
//import it

const express = require("express");
//note just like every other node modules that returns something, e.g events returns a class

//express returns a function, so it can be used in 2 ways
//Direct invoke
// 1. const express = require("express")
//indirect invoke
// 2. const express = require("express")
// const app = express()

//express function NOTE functions are also objects, so the object returns use returns different useful methods

const app = express();

//1. app.get()
//2. app.post()
//3. app.put()
//4. app.delete()
//5. app.all()
//6. app.use()
//7. app.listen()

// 1. app.get()

// const app = express();

app.get("/", (req, res) => {
    res.status(200);
    res.send("First express page");
});

app.get("/about", (req, res) => {
    res.status(200);
    res.send("First express about page");
});

//5 app.all
//app.all() method answers to all HTTP verbs, either get, post, put, push delete anything http verb

app.all("*", (req, res) => {
    res.status(404);
    res.send("Page does not exist");
});

app.listen(8000, () => {
    console.log(`Server is listening on port express.js`);
});

//unlike http module, which i had to request every file in the web app, with express with app.use(express.static("file_name")) i can have acces to every url or file saved in that folder 
