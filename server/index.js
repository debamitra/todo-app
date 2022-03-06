const express = require("express");
const app = express();

const pool = require("./elephantsql")

const cors = require("cors");


//middleware
app.use(express.json());
app.use(cors());




//ROUTES

app.use("/auth",require("./routes/jwtAuth"))

app.use("/todoboard",require("./routes/todoBoard"))






app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});