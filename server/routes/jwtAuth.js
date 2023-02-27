//const pool = require("../db");
const { google } = require('googleapis');
const pool = require("../connection")
const { OAuth2 } = google.auth;
const router = require("express").Router();

const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

// Set up OAuth2 credentials using service account
const key = require('./client_secret_key.json').web;

const oauth2Client = new OAuth2(
  key.client_id,
  key.client_secret,
  key.redirect_uris[0]
);
oauth2Client.credentials = {
  access_token: key.access_token,
  refresh_token: key.refresh_token
};



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
        encrypted_password = await bcrypt.hash("password", salt);

        //store user details in db
        let newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) values ($1, $2 ,$3) RETURNING *", 
            [name, email, passwor]);
        
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


// Define login route
router.get('/google/login', (req, res) => {
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    req.session.state = state;
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ],
      state
    });
    res.redirect(authUrl);
  });
  
  // Define callback route
  router.get('/google/callback', async (req, res) => {
    const { code, state } = req.query;
    if (state !== req.session.state) {
      res.status(401).send('Invalid state parameter');
      return;
    }
    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      const userInfo = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
      console.log(userInfo.data);
      //res.send('Logged in successfully');
      //return token
      let token = ""
      const {email,name} = userInfo.data
      try {
        // db call to check if user already exists
        const user = await pool.query("SELECT * from users WHERE user_email = $1", [email]);

        if (user.rows.length <= 0) {
            
           
        

        // else encrypt password using bcrypt
        // const salt = await bcrypt.genSalt(10);
        // encrypted_password = await bcrypt.hash(password, salt);

        //store user details in db
        let newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) values ($1, $2 ,$3) RETURNING *", 
            [name, email, "password"]);
        

        
        
        //generate token
        token = jwtGenerator(newUser.rows[0].user_id);
        }
        else{
            
        
        //generate token
        token = jwtGenerator(user.rows[0].user_id);

        }
        
      }
      catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")

      }
      console.log("here1")

      console.log(token)
    

      
      
      res.redirect("http://localhost:4000?jwt="+token);

    } catch (error) {
      console.error(error);
      res.status(400).send('Error while logging in');
    }
  });
  

  

module.exports = router;



