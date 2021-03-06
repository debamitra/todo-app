//const pool = require("../db")
const pool = require("../connection")


const router = require("express").Router();

const authorize = require("../middleware/authorize")




//get all todos
router.get("/todos", authorize,async(req,res) => {
    
    const user_id = req.user.id;
    console.log(user_id)
    try {
        const result = await pool.query("SELECT * FROM todo WHERE user_id = $1 ORDER BY completed_on DESC",[user_id])
        const users = await pool.query("SELECT user_name FROM users WHERE user_id = $1",[user_id])
        resp_object = {
            user_name : users.rows[0],
            todos : result.rows
        }
        res.json(resp_object);
        console.log(resp_object)

        
    } catch (err) {
        console.error(err.message)
        
    }

});


//get one todo
router.get("/todos/:id", authorize, async(req,res) => {
    const user_id = req.user.id;
    try {
        const {id} = req.params;
        const result = await pool.query("SELECT * FROM todo WHERE todo_id= $1 AND user_id= $2", [id,user_id]);
        res.json(result.rows[0]);

        
    } catch (err) {
        console.error(err.message)
        
    }

});


//create a new todo and insert it in database
router.post("/todos", authorize, async(req,res) => {
    try {
        const {message} = req.body;
        const result = await pool.query("INSERT INTO todo(message,user_id) values($1, $2) RETURNING *",[message, req.user.id]);
        res.json(result.rows[0]);
       
    } catch (err) {
        console.error(err.message)
        
    }

});


//delete a todo
router.delete("/todos/:id", authorize,async(req,res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        res.json("todo was deleted!");
        
        
    } catch (err) {
        console.error(err.message);
        
    }

});

//update  a todo
router.put("/todos/:id", authorize,async(req,res) => {
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


module.exports = router;


