const express = require("express");
const router = express.Router();

// app.post("/login", (req, res) => {
router.post("/", (req, res) => {
    //remember req.body is an object, so uve got to destructure it to access the value in it, remember the value must tally with front end value <input type="text" id="nameId" name="usersName" />
    console.log(req.body);
    const { usersName } = req.body;
    //With the express url encoded middle ware, i can handle users response in the server
    //so lets say i want to handle when the form is empty
    if (usersName) {
        return res.status(200).send(`Welcome ${usersName}`);
    } else {
        return res.status(401).send(`Please provide credentials`);
    }
    // res.status(200).send("Login page");
});

module.exports = router;
