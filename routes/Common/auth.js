//const jwt = require("jsonwebtoken");
const {readToken} = require("../../src/Utils/JWTtool")

module.exports = (req, res, next) => {
  try {
    if(req.headers.authorization == undefined) throw 'Authorization is not created';
    
    const token = (req.headers.authorization.includes("Bearer")) ? req.headers.authorization.replace("Bearer ", "") : req.headers.authorization;
    console.log(token);
    const decoded = readToken(token, 'LOGIN');
    req.userData = decoded;
    // console.log(req.userData);
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({
      message: "Authentification Failed"
    });
  }
};