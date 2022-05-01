//routes is used to group api address with the same name
const express = require("express");
const {
    getAllStudents,
    createStudent,
    createStudentAndAddTOListOfStudents,
    updateStudent,
    deleteStudent,
} = require("../controllers/students_route_logic_layer");
//instead of using app, we go with Route instance
const router = express.Router();

//inport students data here

//next go to crud and grab api end points grouped as students

//since i have linked my base api in the routes, as "/api/v1/students, the every base takes this pattern and changes to base"
//so instead of
// router.get("/api/v1/students", (req, res) => {
//i have
router.get("/", getAllStudents);

//same here
// router.post("/api/v1/students", (req, res) => {
router.post("/", createStudent);

// router.post("/api/v1/students", (req, res) => {
router.post("/", createStudentAndAddTOListOfStudents);

// router.put("/api/v1/students/:studentId", (req, res) => {
router.put("/:studentId", updateStudent);

// router.delete("/api/v1/students/:studentId", (req, res) => {
router.delete("/:studentId", deleteStudent);

//lastly export your router
module.exports = router;
