const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors")
const mongoose = require("mongoose");
const TodoModel = require("./model/todoSchema");
const port = process.env.PORT || 4000;

app.use(cors()) // ALLOW CROSS_ORIGIN
app.use(express.json()) // ALLOW REQUEST BODY PARSER

const mongoDbUri = "";

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

app.delete("/api/todo/:id", (request, response) => {
    const { id } = request.params;

    // =================== DEPRICATED ===================

    // TodoModel.findByIdAndDelete(id, (error, data) => {
    //     if (error) {
    //         response.json({
    //             message: `INTERNAL SERVER ERROR ${error}`,
    //             status: false
    //         })
    //     } else {
    //         response.json({
    //             message: "Successfully Delete",
    //             status: true
    //         })
    //     }
    // })

    TodoModel.findByIdAndDelete(id)
        .then(data => response.json({
            message: "Successfully Delete",
            status: true
        }))
        .catch(err => response.json({
            message: "Internal server error: " + err,
            status: false
        }))
    console.log(id)
})

app.put("/api/todo", (request, response) => {
    const body = request.body;
    console.log(body, "Body");

    if (!body.todo) {
        response.json({
            message: "REQUIRED FIELDS ARE MISSING",
            status: false,
        });
    }

    const objToSend = {
        todo: body.todo
    };

    TodoModel.findByIdAndUpdate(body.id, objToSend)
        .then(data => response.json({
            message: "Successfully Edit",
            status: true,
            data
        }))
        .catch(err => response.json({
            message: "Internal server error: " + err,
            status: false
        }))

})

app.listen(port, () => console.log(`server running on port ${port}`))

// MONGODB
//