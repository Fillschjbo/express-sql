import express from "express";
import cors from "cors";
const app = express();

import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

let count =0;

app.use((req, res, next) => {
    count++;
    console.log(count)
    next();
})
app.get("/users", async (req, res) => {
    const [result, fields] = await connection.query("SELECT * FROM user")
    res.json({
        result,
    })
})

app.get("/user/:id", async (req, res) => {
    const id = Number(req.params.id);
        if(!isNaN(id)) {
            try {
                const [result, fields] = await connection.execute (
                    "SELECT * FROM user Where id=?",
                    [id]
                );
                if(result.length){
                    res.json(result)
                }else {
                    res.status(400).send("user not found")
                }
            } catch (e){
                res.status(500).send("something went wrong")
            }
        }else {
            res.status(400).send("not a valid number")
        }
})

// app.post("/post", async (req, res) => {
//     console.log(req.body)
//     const {id, title, content} = req.body;
//
//     const [result] = await connection.query(`
//     INSERT INTO post(title, content, user_id)
//     VALUES('${title}','${content}', ${id});
//     `)
//
//     res.json(req.body)
// })

app.get("/post", (req, res) => {

})

app.get("/test", async(req, res) => {
    const sort = req.query.sort || "id";
    const sortOrder = req.query.sortOrder || "ASC";
    const [result, fields] = await connection.query(" SELECT * FROM test ORDER BY " + sort + " " + sortOrder)
    res.json(result)
})

app.get("/test/:id", async(req,res) => {
    const id = Number(req.params.id);
    if(!isNaN(id)) {
        try {
            const [result, fields] = await connection.execute (
                "SELECT * FROM test Where id=?",
                [id]
            );
            if(result.length){
                res.json(result)
            }else {
                res.status(400).send("test not found")
            }
        } catch (e){
            res.status(500).send("something went wrong")
        }
    }else {
        res.status(400).send("not a valid number")
    }
})

app.post("/test", async(req, res) => {
    console.log(req.body)
    const {content} = req.body;

    const [result] = await connection.query(`
    INSERT INTO test(content)
    VALUES('${content}');
    `)

    res.json(req.body)
})



app.listen(port, () => {
    console.log("server started on port: ", port)
})
