const studentsData = [
    {
        id: 1,
        firstName: "seun",
        lastName: "awonugba",
        age: 27,
        gender: "Male",
        department: "Electrical/Electronics",
    },
    {
        id: 2,
        firstName: "temidayo",
        lastName: "akinyele",
        age: 29,
        gender: "Female",
        department: "Accounting",
    },
    {
        id: 3,
        firstName: "gbowunmi",
        lastName: "oluwagbotemi",
        age: 26,
        gender: "Male",
        department: "Actural science",
    },
    {
        id: 4,
        firstName: "yewande",
        lastName: "awonugba",
        age: 25,
        gender: "Female",
        department: "Adult education",
    },
    {
        id: 5,
        firstName: "yetunde",
        lastName: "alimi",
        age: 35,
        gender: "Female",
        department: "Sociology",
    },
    {
        id: 6,
        firstName: "gbowunmi",
        lastName: "makinde",
        age: 27,
        gender: "male",
        department: "insurance",
    },
];

//note we have 2 types of export
// 1. named export
// module.exports = { myStudents: studentsData };
// 2. default export module.export = studentsData
module.exports = studentsData;
