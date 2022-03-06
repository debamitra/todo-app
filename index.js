const express = require("express");
const path = require('path');
const app = express();

const pool = require("./elephantsql")

const cors = require("cors");


//middleware
app.use(express.json());
app.use(cors());


const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));


app.get(['/login', '/dashboard', '/register'], (req, res) => {
    //console.log("path esolve",path.resolve(__dirname, '../build', 'index.html'));                  
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });




//ROUTES

app.use("/auth",require("./routes/jwtAuth"))

app.use("/todoboard",require("./routes/todoBoard"))






app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});