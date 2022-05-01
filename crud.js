const express = require("express");
//let because i will make modifications to the data

//named export
// const myStudents = require("./firstExpressData");

// default import
let students = require("./firstExpressData");

// console.log(students);

const app = express();
const port = 8000;
const host = "localhost";

//with express.static, this is the default home page i.e app.get("/", (req,res) => {})
app.use(express.static("./crud-front-end"));

//post request
//like this i have a post request that matches the the form format, action and method, but as it is i dont have access to the  data user sends

//for me to access what the user sends in the backend i need a middle ware
//the kind of middleware i need is a url form encoded middle ware

// to use the url encoded MiddleWare for forms
//do
app.use(
    express.urlencoded({
        extended: false,
    })
);
//middleware that parses incomming incoming JSON request and it puts the data in req.body

const authRouter = require("./routes/auth");
app.use("/login", authRouter);

//so if incoming request is coming as an object, you need app.use(express.json())
//but if its coming as a string or an array, incase of form input you need app.use(express.urlencoded({extended: false,}));
app.use(express.json());

//all api routes with "/api/v1/students" moved to routes folder, but i will have to use it here
//first import it
const studentsRoute = require("./routes/students");
//next use it
app.use("/api/v1/students", studentsRoute);

// app.get("/api/v1/students", (req, res) => {
//     //remember the was u send error response, just that error has no data
//     //but for the one with data u return a value
//     res.status(200).json({
//         success: true,
//         // data: myStudents,
//         data: students,
//     });
// });

// app.post("/api/v1/students", (req, res) => {
//     //this value must tally with object key in postman
//     const { studentFirstName } = req.body;
//     console.log(studentFirstName);
//     if (!studentFirstName) {
//         return res.status(401).json({
//             success: false,
//             data: "Please provide a valid name",
//         });
//     } else {
//         return res.status(201).json({
//             success: true,
//             data: studentFirstName,
//         });
//     }
// });

// // making a post request by adding data to my imported students data
// app.post("/api/v1/students", (req, res) => {
//     const { students_first_name } = req.body;

//     if (!students_first_name) {
//         return res.status(401).json({
//             success: false,
//             data: "Please input students first name",
//         });
//     } else {
//         return res.status(201).json({
//             success: true,
//             data: [...students, students_first_name],
//         });
//     }
// });

// //PUT REQUEST
// //Note in put request, i'm only trying to modify a data or value in my responses, and best way to do that is to access such value using its ID
// app.put("/api/v1/students/:studentId", (req, res) => {
//     const { studentId } = req.params;
//     const { studentFirstName } = req.body;
//     // console.log(typeof Number(studentId));

//     //To update a value
//     // step 1. check if the id u want to update exist
//     // const singleStudent = students.find((element) => element.id == studentId);

//     //note find returns an element if the value matches
//     const singleStudent = students.find((element) => {
//         return element.id == studentId;
//     });
//     if (!singleStudent) {
//         return res.status(404).json({
//             success: false,
//             data: `can not find student with this id: ${studentId}`,
//         });
//     } else {
//         //note map return a new array entirely after performing it operation
//         const updatedStudentsData = students.map((element) => {
//             //so in trying to perform its operation, we first check, if my passed student id matches with any id in the array
//             if (element.id == studentId) {
//                 // if it does, please return and change the first name, i.e set or assign the first name
//                 return (element.firstName = studentFirstName);
//             }
//             //this is the return statemment for the map function
//             return students;

//             //note i didnt use any else statement her simply because i have handled cases where the IDs dont match above
//         });

//         res.status(200).json({
//             success: true,
//             data: updatedStudentsData,
//         });
//     }
// });

// //delete request
// app.delete("/api/v1/students/:studentId", (req, res) => {
//     const { studentId } = req.params;

//     const singleStudent = students.find((element) => {
//         return element.id == studentId;
//     });

//     if (!singleStudent) {
//         return res.status(404).json({
//             success: false,
//             data: `Student with id: ${studentId} does not exist`,
//         });
//     } else {
//         const filteredStudentsData = students.filter((element) => {
//             return element.id != studentId;
//         });

//         return res.status(200).json({
//             success: true,
//             data: filteredStudentsData,
//         });
//     }
// });

// app.post("/api/v1/postman", (req, res) => {
//     const { name } = req.body;
//     console.log(name);

//     res.status(201).send({
//         success: true,
//         data: [...students, name],
//     });
// });

//login has been moved to auth route
// app.post("/login", (req, res) => {
//     //remember req.body is an object, so uve got to destructure it to access the value in it, remember the value must tally with front end value <input type="text" id="nameId" name="usersName" />
//     console.log(req.body);
//     const { usersName } = req.body;
//     //With the express url encoded middle ware, i can handle users response in the server
//     //so lets say i want to handle when the form is empty
//     if (usersName) {
//         return res.status(200).send(`Welcome ${usersName}`);
//     } else {
//         return res.status(401).send(`Please provide credentials`);
//     }
//     // res.status(200).send("Login page");
// });

app.get("/about", (req, res) => {
    res.status(200).send("About page");
});

app.all("*", (req, res) => {
    res.status(400).send("Page not found");
});

app.listen(port, host, () => {
    console.log(`Server listening on port: http://${host}:${port}`);
});
