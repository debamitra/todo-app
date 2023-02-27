const express = require("express");
const path = require('path');
const app = express();

const pool = require("./elephantsql")

const cors = require("cors");

const session = require('express-session');
const bodyParser = require('body-parser');

//middleware
app.use(express.json());
app.use(cors());

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));


app.get(['/','/login', '/dashboard', '/register','/landing'], (req, res) => {
    //console.log("path esolve",path.resolve(__dirname, '../build', 'index.html'));                  
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });




//ROUTES

app.use("/auth",require("./routes/jwtAuth"))


app.use("/todoboard",require("./routes/todoBoard"))




const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log("server has started on port ",PORT);
});