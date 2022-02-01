////////////////////////////////////////////////////////////////////////////////////////
const {readFileSync} = require('fs')
const { json } = require("express");
const {readToken} = require('../Utils/JWTtool')

// S> PUBLIC FUNCTIONS

function authorization(req) {
    if(typeof req.getType('Authorization') == undefined) return false
    const token = (req.headers.authorization.includes("Bearer")) ? req.headers.authorization.replace("Bearer ", "") : req.headers.authorization;
    const data = readToken(token,'LOGIN')
    checkUserData()
}
// E> PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// S> PRIVATE FUNCTIONS



// E> PRIVATE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////




//module.exports = jResponse
module.exports = authorization


/*
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
*/