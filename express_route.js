const express = require("express");
const students = require("./firstExpressData");
const app = express();

const port = 8000;
const host = "localhost";

// -> "/" this serves as the link path for our api
// -> a tag carries an href that returns the path u want to navigate to
// -> in this case the path i want to navigate to is /students
//i.e land on the home page, click on the <a> tag, add the path in href to the existing path
// then take me to the path
// Also that path specified in the href, must have an api path too, i.e a get request path

//get request to home page path
app.get("/", (req, res) => {
    res.status(200);
    res.send(
        //notice the href returns a path
        // "<h1>Welcome, view students below</h1> <a href ='/students'>Students</a>"

        //lets say i want to return list of students before returning student details
        "<h1>Welcone, view list of students below</h1><a href = '/studentsList'>List of students</a>   "
    );
});

//get request to href path
// app.get("/students", (req, res) => {
//     res.status(200);
//     res.json(students);
// });

// destructurig can be done this way o
const studentList = students.map((element) => {
    const { id, firstName, lastName } = {
        id: element.id,
        firstName: element.firstName,
        lastName: element.lastName,
    };
    return { id, firstName, lastName };
});

// or this way

// const studentList = students.map((elements) => {
//     const { id, firstName, lastName } = elements;
//     return { id, firstName, lastName };
// });

app.get("/studentsList", (req, res) => {
    res.status(200);
    res.send(studentList);
});

app.all("*", (req, res) => {
    res.status(404);
    res.send("Resource not found");
});

app.listen(port, host, () => {
    console.log(`Server is listening on port ${host}:${port}`);
});
