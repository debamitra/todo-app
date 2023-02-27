const jwt = require("jsonwebtoken");




function jwtGenerator (user_id) {
    const payload = {
        user:{
            id : user_id
        }
    };

    const x = jwt.sign(payload, 'secret', { expiresIn: "1hr" });
    console.log(x)
    return x
}

module.exports = jwtGenerator;