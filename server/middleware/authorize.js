const jwt = require("jsonwebtoken");


module.exports = function (req,res,next){
    const token = req.header("jwt_token");
    console.log(token)

    if(!token){
        return res.status(403).json({msg : "authorization denied"})
    }

    try {
        const verify = jwt.verify(token, "secret");
        req.user = verify.user;
        console.log(verify.user);
        next();
        
    } catch (error) {
        console.log(error.message);
        return res.status(403).json({msg : "Token is not valid "})
        
    }
    
}