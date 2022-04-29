const express = require("express");
const app = express();
const port = 8000;
const host = "localhost";

//NOTE for seperation of concerns its advisable to have you middle ware function in another file, then you module.exports = myLoggerMiddleWare, then you require here

//steps to use a middle ware in express in 3 steps

//STEP : 2 Use the middle ware with app.use in the application level

// so as it is, middle ware will run before any express controller action/request either get,post,push,put any
//next look at step 3

// app.use(myLoggingMiddleWare);

//NOTE : to use multiple middleWare place them in an array
//app.use([myLoggingMiddleWare, authMiddleWare])
app.get("/", (req, res) => {
    res.status(200);
    res.send("Welcome to the home page");
});

app.get("/about", (req, res) => {
    res.status(200);
    res.send("Welcome to the about page");
});

app.get("/admin", authMiddleWare, (req, res) => {
    res.status(200);
    res.send("Welcome to the admin page");
});

app.all("*", (req, res) => {
    res.status(404);
    res.send("<p>Page not found</p>");
});

//Note middle ware take in 3 parameters , req, res, and next
//also in other to create a middle ware , i will have to create a middle ware function that takes in those 3 paramenter

//STEP : 1 create a middle ware function that take in 3 parameters
//now i have a middle ware function, just sitting down not doing anything, to put it to use, check step 2

// const myLoggingMiddleWare = (req, res, next) => {
//     console.log(`Logging middle ware`);
// };

//note never use an arrow function to declare your middle ware function
function myLoggingMiddleWare(req, res, next) {
    //Examples of what you want your middle ware to do
    //1. Log out something
    console.log(`Logging middle ware`);

    //it can also log request url and date
    console.log(`${new Date().toLocaleDateString()} : ${req.url}`);

    //STEP 3 The moment use use ur logger function, a proble occurs when you reload your app
    //The page runs forever, why, because you have not called next(),
    //NOTE: always call next in you middleware function, after all the actions u want to perform in the middle ware

    next();
}
app.listen(port, host, () => {
    console.log(`Server is listening on: http://${host}:${port}`);
});

//Advanced MiddleWare

//Some of the basic use of middle ware is
// 1. Authorisation
// 2. block foreign script(scripts sent to attack your server)

//lets look at authorisation middleware
//As earlier mentioned, making use of your middle ware at the application level means it runs before every other request,
//however in some cases you only need the middle ware in some request,
//for example, i need the authMiddleWare to run only when a user is trying to access the admin page,
//you simply call the authMidddleWare function only in the admin page get request, by adding it as a parameter in the admin page get request
function authMiddleWare(req, res, next) {
    //now for this admin middle ware, i need only users with admin acess to be able to access this url
    //NOTE: query parameters are strings not booleans
    //only when you access with http://localhost:8000/admin?admin=true, you access the admin page
    if (req.query.admin == "true") {
        return next();
    } else {
        return res.status(200).json({
            success: true,
            body: "You neeed admin access",
        });
    }
}
