////////////////////////////////////////////////////////////////////////////////////////
const {readFileSync} = require('fs')
const { json } = require("express");

// S> PUBLIC FUNCTIONS
function jResponse(code, lng='eng') {
    let jRes={};
    jRes.status = isEven(code) ? 'OK':'KO';
    jRes.code = code
    jRes.msg = readCode(code, lng)
    return jRes
}
// E> PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// S> PRIVATE FUNCTIONS
function isEven(num) { return !(num % 2);}

function readCode(code, lng) {
    try{
        let json = JSON.parse(readFileSync(`../Resources/c${lng}`))
        msg = json[code]
        return msg
    } catch (e) {
        return 'MSGERROR'
    }
    
}
// E> PRIVATE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////




module.exports = jResponse