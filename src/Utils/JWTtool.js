require('dotenv').config()
const jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////////////////////////
// S> PUBLIC FUNCTIONS
function createToken(object, flag=false) {
    try{
        const envKey = flag ? `${flag}_JWT` : 'JWT'
        const token = jwt.sign(object, process.env[envKey])
        console.log("New token: " + token)
        return token
    } catch (e){
        console.error(e)
        return false;
    }
}

function readToken(token, flag=false) {
    try {
        const envKey = flag ? `${flag}_JWT` : 'JWT'
        const data = jwt.verify(token, process.env[envKey]);
        console.log(data)
        return data
    } catch(e){
        console.error(e)
        return false
    }
    
}

// E> PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// S> PRIVATE FUNCTIONS


// E> PRIVATE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////


module.exports = {
    createToken,
    readToken
}