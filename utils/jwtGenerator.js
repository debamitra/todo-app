const jwt = require("jsonwebtoken");




function jwtGenerator (user_id) {
    const payload = {
        user:{
            id : user_id
        }
    };

    return jwt.sign(payload, 'secret', { expiresIn: "1hr" });
}

module.exports = jwtGenerator;