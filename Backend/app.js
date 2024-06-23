const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors")
const mongoose = require("mongoose");
const TodoModel = require("./model/todoSchema");
const port = process.env.PORT || 4000;

app.use(cors()) // ALLOW CROSS_ORIGIN
app.use(express.json()) // ALLOW REQUEST BODY PARSER

const mongoDbUri = "mongodb+srv://arsalansohail1934:TFLYG9v1yoEpKcDg@cluster0.jjptwpd.mongodb.net/";

mongoose.connect(mongoDbUri)
    .then((res) => console.log("DB Connect Successfully"))
    .catch((err) => console.log("Db Error", err));

app.get("/api/fakeproducts", (request, response) => {
    response.json({
        message: "Succesfully get",
        status: true,
        products: [
            {
                name: "Keyboard"
            },
            {
                name: "Mouse"
            },
            {
                name: "Speaker"
            }
        ],
    });
});

app.post("/api/todo", (request, response) => {
    const body = request.body;
    console.log(body.todo, "body");
    console.log(typeof (body.todo), "body");

    if (!body.todo) {
        response.status(400).json({
            message: "REQUIRED FIELDS ARE MISSING",
            status: false
        });
        return
    }

    const objToSend = {
        todo: body.todo,
    };


    // ============== NO LONGER ACCEPTED ============== 

    // TodoModel.create(objToSend, (error, data) => {
    //     if (error) {
    //         response.json({
    //             message: `INERNAL SERVER ERROR: ${error}`,
    //             status: false
    //         });
    //     }
    //     else {
    //         response.json({
    //             message: "Successfully Create",
    //             status: true
    //         })
    //     }
    // })

    // ============== NEW METHOD ==============

    TodoModel.create(objToSend)
        .then(data => response.json({
            message: "Successfully Created",
            data,
            status: true
        }))
        .catch(err => response.json({
            message: "Internal server error: " + err,
            status: false
        }))

})

app.get("/api/todo", (request, response) => {
    TodoModel.find({})
        .then(data => response.json({
            message: "Successfully Get",
            data: data,
            status: true
        }))
        .catch(err => response.json({
            message: "Internal server error: " + err,
            status: false
        }))

})


app.listen(port, () => console.log(`server running on port ${port}`))

// MONGODB
// arsalansohail1934 TFLYG9v1yoEpKcDg