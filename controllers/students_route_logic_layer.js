//note these are all functions

//import students here
const students = require("../firstExpressData");

const getAllStudents = (req, res) => {
    res.status(200).json({
        success: true,
        // data: myStudents,
        data: students,
    });
};

const createStudent = (req, res) => {
    const { studentFirstName } = req.body;
    // console.log(studentFirstName);
    if (!studentFirstName) {
        return res.status(401).json({
            success: false,
            data: "Please provide a valid name",
        });
    } else {
        return res.status(201).json({
            success: true,
            data: studentFirstName,
        });
    }
};

const createStudentAndAddTOListOfStudents = (req, res) => {
    const { students_first_name } = req.body;

    if (!students_first_name) {
        return res.status(401).json({
            success: false,
            data: "Please input students first name",
        });
    } else {
        return res.status(201).json({
            success: true,
            data: [...students, students_first_name],
        });
    }
};

const updateStudent = (req, res) => {
    const { studentId } = req.params;
    const { studentFirstName } = req.body;
    // console.log(typeof Number(studentId));

    //To update a value
    // step 1. check if the id u want to update exist
    // const singleStudent = students.find((element) => element.id == studentId);

    //note find returns an element if the value matches
    const singleStudent = students.find((element) => {
        return element.id == studentId;
    });
    if (!singleStudent) {
        return res.status(404).json({
            success: false,
            data: `can not find student with this id: ${studentId}`,
        });
    } else {
        //note map return a new array entirely after performing it operation
        const updatedStudentsData = students.map((element) => {
            //so in trying to perform its operation, we first check, if my passed student id matches with any id in the array
            if (element.id == studentId) {
                // if it does, please return and change the first name, i.e set or assign the first name
                return (element.firstName = studentFirstName);
            }
            //this is the return statemment for the map function
            return students;

            //note i didnt use any else statement her simply because i have handled cases where the IDs dont match above
        });

        res.status(200).json({
            success: true,
            data: updatedStudentsData,
        });
    }
};

const deleteStudent = (req, res) => {
    const { studentId } = req.params;

    const singleStudent = students.find((element) => {
        return element.id == studentId;
    });

    if (!singleStudent) {
        return res.status(404).json({
            success: false,
            data: `Student with id: ${studentId} does not exist`,
        });
    } else {
        const filteredStudentsData = students.filter((element) => {
            return element.id != studentId;
        });

        return res.status(200).json({
            success: true,
            data: filteredStudentsData,
        });
    }
};

//using named exports, remember its an object, with key value pair, but since key and value name are the same we can have

module.exports = {
    getAllStudents,
    createStudent,
    createStudentAndAddTOListOfStudents,
    updateStudent,
    deleteStudent,
};

// instead of
// module.exports = {
//     getAllStudents: getAllStudents,
//     createStudent: createStudent,
//     createStudentAndAddTOListOfStudents: createStudentAndAddTOListOfStudents,
//     updateStudent: updateStudent,
//     deleteStudent: deleteStudent,
// };
