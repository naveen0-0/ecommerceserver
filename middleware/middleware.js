const jwt = require('jsonwebtoken');

const checkToken = (req,res,next) => {
    const shoplogintoken = req.headers.authorization
    if(shoplogintoken){
        jwt.verify(shoplogintoken,process.env.ACCESS_TOKEN,(err,decoded) => {
            if(err){
                return res.send({
                    msg:"Got an error decoded your auth token"
                })
            }
            req.user = decoded;
            next();
        })
    }else{
        res.send({
            msg:"You have to be logged in to perform this action"
        })
    }
}

module.exports = {
    checkToken
}