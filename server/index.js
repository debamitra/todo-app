const express = require("express");
const app = express();

const pool = require("./db")

const cors = require("cors");

app.use(express.json());
app.use(cors());

//get all todos
app.get("/todos", async(req,res) => {
    try {
        const result = await pool.query("SELECT * FROM todo ORDER BY completed_on DESC")
        res.json(result.rows);
        
    } catch (err) {
        console.error(err.message)
        
    }

});


//get one todo
app.get("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("SELECT * FROM todo WHERE todo_id= $1", [id]);
        res.json(result.rows[0]);

        
    } catch (err) {
        console.error(err.message)
        
    }

});


//create a new todo and insert it in database
app.post("/todos", async(req,res) => {
    try {
        const {message} = req.body;
        const result = await pool.query("INSERT INTO todo(message) values($1) RETURNING *",[message]);
        res.json(result.rows[0]);
       
    } catch (err) {
        console.error(err.message)
        
    }

});


//delete a todo
app.delete("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        res.json("todo was deleted!");
        
        
    } catch (err) {
        console.error(err.message);
        
    }

});

//update  a todo
app.put("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        console.log(req.body);
        const {message, status} = req.body;
        let completed_on = " ";
        if(status == true){
            completed_on = " ,completed_on=(extract(epoch from now() at time zone 'utc')) "
        }
        else{
            completed_on = " ,completed_on=null "
        }
        const result = await pool.query("UPDATE todo set message=$1, status=$3" + completed_on + "WHERE todo_id = $2",[message,id,status]);
        res.json("todo was updated successfully");
        
        
    } catch (err) {
        console.error(err.message);
        
    }

});




app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});