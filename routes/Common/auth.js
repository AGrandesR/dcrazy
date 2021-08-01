const jwt = require("jsonwebtoken");
const {readToken} = require('../Utils/JWTtool')

module.exports = (req, res, next) => {
  try {
    if(typeof req.getType('Authorization') == undefined) return false
    
    const token = (req.headers.authorization.includes("Bearer")) ? req.headers.authorization.replace("Bearer ", "") : req.headers.authorization;
    console.log(token);
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    // console.log(req.userData);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentification Failed"
    });
  }
};