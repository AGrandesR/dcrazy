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
function jsonResponse(req, res, code, data=false) {
    let jRes={};
    jRes.status = isEven(code) ? 'OK':'KO';
    jRes.code = code
    jRes.msg = readCode(code, req.query.lng)
    if(data) jRes.data = data
    res.json(jRes);
}
// E> PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// S> PRIVATE FUNCTIONS
function isEven(num) { return !(num % 2);}

function readCode(code, lng='eng') {
    try{
        let data = JSON.parse(readFileSync(`src/Resources/responseCodes/codes.${lng}.json`,'utf8'))
        msg = data[code]
        return msg
    } catch (e) {
        return 'MSGERROR'
    }
    
}
// E> PRIVATE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////




//module.exports = jResponse
module.exports = jsonResponse