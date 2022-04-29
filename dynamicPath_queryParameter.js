const express = require("express");
const students = require("./firstExpressData");
const app = express();
const port = 8000;
const host = "localhost";

app.get("/", (req, res) => {
    res.status(200);
    res.send(
        "<h1>Hello world!</h1>  <p>Click <a href= '/api/v1/searchList'>here</a> to see a list of our students</p>"
    );
});

const studentList = students.map((element) => {
    const { id, firstName, lastName } = {
        id: element.id,
        firstName: element.firstName,
        lastName: element.lastName,
    };

    return { id, firstName, lastName };
});

// app.get("/api/v1/:singleStudentId", (req, res) => {
//     const { singleStudentId } = req.params;

//     const getStudentById = studentList.find((element) => {
//         return element.id == singleStudentId;
//     });

//     if (!getStudentById) {
//         res.status(200);
//         res.send("Can not find a student with the specified ID");
//     }
//     res.status(200);
//     res.json(getStudentById);
// });

//for query

// app.get("/api/v1/query", (req, res) => {
//     /**
//      * What ever query i pass in the web page, log it out
//      */
//     res.status(200);
//     res.send("I feel so so excited, this is my first query api");
//     console.log(req.query);
//     console.log(`first query api`);
// });

app.get("/api/v1/searchList/query", (req, res) => {
    //search is user input(text) in the webpage

    const { search, limit } = req.query;
    //copy the student list inside another variable
    let searchList = [...studentList];

    console.log(req.query);

    //when u get the text u want to search, use the text to search your search list
    if (search) {
        searchList = searchList.filter((element) => {
            return (
                element.firstName.includes(search) ||
                element.lastName.includes(search)
            );
            // let searchResult =
            //     element.firstName.includes(search) ||
            //     element.lastName.includes(search);

            // if (search == searchResult) {
            //     return searchResult;
            // } else {
            //     return res
            //         .status(200)
            //         .send("No student match your search result");
            // }
        });
    }

    // if i pass limit, use the limit to query the end point, from 0 - the limit i pass
    if (limit) {
        searchList = searchList.slice(0, Number(limit));
    }

    //what if my search query does not match any of the data, instead of returning empty response, return, "No value match your search parameter"

    if (searchList.length < 1) {
        //you can either return a string or return a json value
        //return res.status(200).send("No student match your search value");

        //in a conditional statement, always return
        return res.status(200).send({
            success: true,
            data: [],
        });
    }
    res.status(200);
    res.json(searchList);
});

app.all("*", (req, res) => {
    res.status(404);
    res.send("Resource not found");
});

app.listen(port, host, () => {
    console.log(`Server is listening on port http://${host}:${port}`);
});
