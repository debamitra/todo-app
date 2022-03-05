const pool = require("../db");

const router = require("express").Router();

const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");



router.post('/register', async (req, res) => {
    const { email, name, password } = req.body;
    console.log(req.body)

    try {
        // db call to check if user already exists
        const user = await pool.query("SELECT * from users WHERE user_email = $1", [email]);

        if (user.rows.length > 0) {
            //got a user, return with error code
            return res.status(401).json("User already exists.")
        }

        // else encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);
        encrypted_password = await bcrypt.hash(password, salt);

        //store user details in db
        let newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) values ($1, $2 ,$3) RETURNING *", 
            [name, email, encrypted_password]);
        
        //generate token
        token = jwtGenerator(newUser.rows[0].user_id);

        //return token as jsom in response
        return res.json({ token })


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")

    }



});


router.post("/login", async(req,res)=> {
    const {email,password} = req.body;
    console.log("/login")
    try {
        //check if user existsSELECT * FROM users WHERE user_email = $1
        const user = await pool.query("SELECT * from users WHERE user_email = $1",[email])

        if(user.rows.length == 0  ){
            return res.status(401).json("Invalid Credentials");

        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password )

        //check if encrypted password matches
        if(!validPassword){
            return res.status(401).json("Invalid Credentials");

        }

        //return token
        const token = jwtGenerator(user.rows[0].user_id);
        return res.json({ token });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error!")
        
    }

});


router.get('/verify', authorize ,(req,res)=> {
   try {
    res.json(true)
       
   } catch (error) {
       console.log(error.message);
       res.status(500).send("Server Error!")

       
   }

})

module.exports = router;



