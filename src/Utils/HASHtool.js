//require('dotenv').config()
const bcrypt = require('bcrypt')
const crypto = require('crypto')

////////////////////////////////////////////////////////////////////////////////////////
// S> PUBLIC FUNCTIONS
function createHash(myPlaintextPassword, flag=false) {
    try{
        const envKey = flag ? `${flag}_SALT` : 'SALT'
        const rawHASH = bcrypt.hashSync(myPlaintextPassword, parseInt(process.env[envKey]));
        console.log(rawHASH)
        const hash = rawHASH.slice(rawHASH.lastIndexOf("$") + 1)
        console.log("New hash: " + hash)
        return hash
    } catch (e){
        console.error(e)
        return false;
    }
}
function createBasicHash(myPlaintextPassword) {
    try{
        return crypto.createHash("sha256").update(myPlaintextPassword).digest('hex')
    } catch(e) {
        console.error(e)
        return false
    }
    
}

function checkHash(myPlaintextPassword, myHashPassword, flag=false) {
    try {
        return bcrypt.compareSync(myPlaintextPassword, myHashPassword);
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
    createHash,
    createBasicHash,
    checkHash
}