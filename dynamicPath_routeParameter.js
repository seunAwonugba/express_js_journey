const express = require("express");
const app = express();
const students = require("./firstExpressData");

//its advisible to set up end points in this following format

//http://domain_name/api/version_number/:path i.e

//http://localhost:8000/api/v1/:userId

//so ideally my href should be /api/v1/studentList/studentId

app.get("/", (req, res) => {
    res.status(200);
    res.send(
        "<h1>Hello there, welcome</h1> <p>click <a href = '/studentList/1'>here</a> to see list of students</p>"
    );
});

const studentsList = students.map((elements) => {
    const { id, firstName, lastName } = elements;
    return { id, firstName, lastName };
});

// app.get("/studentList", (req, res) => {
//     res.status(200);
//     res.json(studentsList);
// });

// hard coded dynamic path
// const singleStudent = studentsList.find((element) => {
//     return element.id == 6;
// });

//dynamic path /:path_value
app.get("/studentList/:productId", (req, res) => {
    //req.params returns an object, so to get the product id from it, we simply destructure it
    const { productId } = req.params;

    const singleStudent = studentsList.find((element) => {
        return element.id == productId;
    });

    //if there is a student with id that does not exist return 404
    /**
     * if(value){}
     *
     * it return true if value is not
     * 1. null
     * 2. undefined
     * 3. NaN
     * 4. empty string
     * 5. 0
     * 6. or false
     */
    if (!singleStudent) {
        res.status(404);
        res.send("<h1>Student does not exist</h1>");
    }

    res.status(200);
    res.json(singleStudent);
});

app.get("/studentList/:productId/review/:classId", (req, res) => {
    console.log(req.params);
    res.status(200);
    res.send("Hello world practice");
});

app.all("*", (req, res) => {
    res.status(404);
    res.send("Resource not found");
});

app.listen(8000, () => {
    console.log(`server is listening on port 8000...`);
});
